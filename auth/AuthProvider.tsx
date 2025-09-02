import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserRecord = {
  email: string;
  password: string;
  confirmed: boolean;
  pendingConfirmCode?: string; // "123456"
  pendingResetCode?: string;   // "999999"
};

type AuthContextType = {
  loading: boolean;
  isSignedIn: boolean;
  email?: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (email: string, code: string, newPassword: string) => Promise<void>;
};

const USERS_KEY = '@users_db';
const TOKEN_KEY = '@auth_token';
const EMAIL_KEY = '@auth_email';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --------- Helpers to read/write the mock "DB" ----------
async function loadUsers(): Promise<Record<string, UserRecord>> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : {};
}
async function saveUsers(db: Record<string, UserRecord>) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(db));
}
function normalizeEmail(email: string) {
  return (email || '').trim().toLowerCase();
}
// --------------------------------------------------------

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      const savedEmail = await AsyncStorage.getItem(EMAIL_KEY);
      if (token) setIsSignedIn(true);
      if (savedEmail) setEmail(savedEmail);
      setLoading(false);
    })();
  }, []);

  // --------- Mocked auth flows with basic validation ----------
  const signIn = async (rawEmail: string, password: string) => {
    const e = normalizeEmail(rawEmail);
    if (!e || !password) throw new Error('Please enter email and password.');
    const db = await loadUsers();
    const user = db[e];
    if (!user) throw new Error('No account found for this email.');
    if (!user.confirmed) throw new Error('Please confirm your email before signing in.');
    if (user.password !== password) throw new Error('Incorrect password.');

    await AsyncStorage.setItem(TOKEN_KEY, 'mock-token');
    await AsyncStorage.setItem(EMAIL_KEY, e);
    setEmail(e);
    setIsSignedIn(true);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(EMAIL_KEY);
    setIsSignedIn(false);
    setEmail(undefined);
  };

  const signUp = async (rawEmail: string, password: string) => {
    const e = normalizeEmail(rawEmail);
    if (!e || !password) throw new Error('Please enter email and password.');
    if (password.length < 8) throw new Error('Password must be at least 8 characters.');

    const db = await loadUsers();
    if (db[e]) throw new Error('An account with this email already exists.');

    // Create user with pending confirmation
    db[e] = {
      email: e,
      password,
      confirmed: false,
      pendingConfirmCode: '123456', // demo code
    };
    await saveUsers(db);
    // In real app: send email with code
  };

  const confirmSignUp = async (rawEmail: string, code: string) => {
    const e = normalizeEmail(rawEmail);
    const db = await loadUsers();
    const user = db[e];
    if (!user) throw new Error('No account found.');
    if (user.confirmed) return; // already confirmed is fine

    if (!code || code !== (user.pendingConfirmCode ?? '')) {
      throw new Error('Invalid confirmation code. Use 123456 for demo.');
    }

    user.confirmed = true;
    delete user.pendingConfirmCode;
    db[e] = user;
    await saveUsers(db);
  };

  const requestPasswordReset = async (rawEmail: string) => {
    const e = normalizeEmail(rawEmail);
    if (!e) throw new Error('Please enter your email.');
    const db = await loadUsers();
    const user = db[e];
    if (!user) throw new Error('No account found for this email.');

    user.pendingResetCode = '999999'; // demo reset code
    db[e] = user;
    await saveUsers(db);
    // In real app: email/SMS the reset code
  };

  const confirmPasswordReset = async (rawEmail: string, code: string, newPassword: string) => {
    const e = normalizeEmail(rawEmail);
    const db = await loadUsers();
    const user = db[e];
    if (!user) throw new Error('No account found.');
    if (!code || code !== (user.pendingResetCode ?? '')) {
      throw new Error('Invalid reset code. Use 999999 for demo.');
    }
    if (!newPassword || newPassword.length < 8) {
      throw new Error('New password must be at least 8 characters.');
    }

    user.password = newPassword;
    delete user.pendingResetCode;
    db[e] = user;
    await saveUsers(db);
  };

  const value = useMemo(
    () => ({
      loading,
      isSignedIn,
      email,
      signIn,
      signOut,
      signUp,
      confirmSignUp,
      requestPasswordReset,
      confirmPasswordReset,
    }),
    [loading, isSignedIn, email]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
