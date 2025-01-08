import { Conversation, ChatHistory, Message } from '@/types/chat';

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'React Performance Tips',
    lastMessage: 'Here are some tips for optimizing React applications...',
    timestamp: '2024-03-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'TypeScript Best Practices',
    lastMessage: 'When working with TypeScript, it\'s important to...',
    timestamp: '2024-03-09T15:30:00Z'
  }
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      content: 'What are some tips for optimizing React applications?',
      role: 'user',
      timestamp: '2024-03-10T10:00:00Z'
    },
    {
      id: '2',
      content: 'Here are some tips for optimizing React applications:\n1. Use React.memo for component memoization\n2. Implement lazy loading\n3. Optimize dependencies',
      role: 'assistant',
      timestamp: '2024-03-10T10:00:05Z'
    }
  ],
  '2': [
    {
      id: '3',
      content: 'What are some TypeScript best practices?',
      role: 'user',
      timestamp: '2024-03-09T15:30:00Z'
    },
    {
      id: '4',
      content: 'When working with TypeScript, it\'s important to:\n1. Use strict mode\n2. Define proper interfaces\n3. Leverage type inference',
      role: 'assistant',
      timestamp: '2024-03-09T15:30:05Z'
    }
  ]
};

// Mock API functions
export const getConversations = async (): Promise<Conversation[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return mockConversations;
};

export const getChatHistory = async (chatId: string): Promise<ChatHistory> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const messages = mockMessages[chatId] || [];
  const conversation = mockConversations.find(c => c.id === chatId);
  
  if (!conversation) {
    throw new Error('Chat not found');
  }

  return {
    id: chatId,
    title: conversation.title,
    messages
  };
};

export const sendMessage = async (chatId: string | null, message: string): Promise<{ chatId: string; message: Message }> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const newChatId = chatId || `new-${Date.now()}`;
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    content: message,
    role: 'user',
    timestamp: new Date().toISOString()
  };

  const response: Message = {
    id: `msg-${Date.now() + 1}`,
    content: `This is a mock response to: "${message}"`,
    role: 'assistant',
    timestamp: new Date().toISOString()
  };

  if (!mockMessages[newChatId]) {
    mockMessages[newChatId] = [];
  }
  
  mockMessages[newChatId].push(newMessage, response);

  if (!chatId) {
    mockConversations.unshift({
      id: newChatId,
      title: message.slice(0, 30) + '...',
      lastMessage: response.content,
      timestamp: response.timestamp
    });
  }

  return { chatId: newChatId, message: response };
};