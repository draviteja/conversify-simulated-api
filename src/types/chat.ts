export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
}

export interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
}