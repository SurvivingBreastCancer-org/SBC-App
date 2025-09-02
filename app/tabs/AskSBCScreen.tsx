import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

export default function AskSBCScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Hi 👋 I am SBC AI. Ask me anything!' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // TODO: call API here, for now add a dummy bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: 'bot', text: "I'm thinking… 🤔" },
      ]);
    }, 800);

    setInput('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.bubble,
        item.sender === 'user' ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text
        style={[
          styles.bubbleText,
          { color: item.sender === 'user' ? '#fff' : Colors.heading },
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <LinearGradient colors={[Colors.bgSignIn[0], Colors.bgSignIn[1], Colors.bgSignIn[2]]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
        />

        {/* Input area */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask something…"
            placeholderTextColor={Colors.placeholder}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: Colors.claret,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    fontSize: 15,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
    color: Colors.heading,
  },
  sendBtn: {
    backgroundColor: Colors.claret,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
