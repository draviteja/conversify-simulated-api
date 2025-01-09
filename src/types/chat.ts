export interface Conversation {
  id: string;
  conversationId: string;
  title: string;
  lastMessage: string;
  updatedAt: string;
}

export interface Message {
  messageId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
}