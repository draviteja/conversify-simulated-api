import { Conversation, ChatHistory, Message } from '@/types/chat';

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    conversationId: '1',
    title: 'React Performance Tips',
    lastMessage: 'Here are some tips for optimizing React applications...',
    updatedAt: '2024-03-10T10:00:00Z'
  },
  {
    id: '2',
    conversationId: '2',
    title: 'TypeScript Best Practices',
    lastMessage: 'When working with TypeScript, it\'s important to...',
    updatedAt: '2024-03-09T15:30:00Z'
  }
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      messageId: '1',
      content: 'What are some tips for optimizing React applications?',
      role: 'user',
      timestamp: '2024-03-10T10:00:00Z'
    },
    {
      messageId: '2',
      content: 'Here are some tips for optimizing React applications:\n1. Use React.memo for component memoization\n2. Implement lazy loading\n3. Optimize dependencies',
      role: 'assistant',
      timestamp: '2024-03-10T10:00:05Z'
    }
  ],
  '2': [
    {
      messageId: '3',
      content: 'What are some TypeScript best practices?',
      role: 'user',
      timestamp: '2024-03-09T15:30:00Z'
    },
    {
      messageId: '4',
      content: 'When working with TypeScript, it\'s important to:\n1. Use strict mode\n2. Define proper interfaces\n3. Leverage type inference',
      role: 'assistant',
      timestamp: '2024-03-09T15:30:05Z'
    }
  ]
};

// Mock API functions
export const getConversations = async (): Promise<Conversation[]> => {
  // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

  const response = await fetch('http://localhost:8080/api/chat/conversations');
  if (!response.ok) {
    throw new Error('Failed to fetch conversations');
  }
  const data = await response.json();
  return data as Conversation[];
};

export const getChatHistory = async (chatId: string): Promise<ChatHistory> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const response = await fetch(`http://localhost:8080/api/chat/conversations/${chatId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch chat history');
  }
  const data = await response.json();

  console.log(data);
  // const messages = mockMessages[chatId] || [];
  // const conversation = mockConversations.find(c => c.id === chatId);
  
  // if (!conversation) {
  //   throw new Error('Chat not found');
  // }

  return {
    id: data['conversationId'],
    title: data['title'],
    messages: data['conversationMessages']
  };
};

export const sendMessage = async (chatId: string | null, message: string): Promise<{ chatId: string; message: Message }> => {
  
  const response = await fetch(`http://localhost:8080/api/chat/conversations/${chatId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "content": message })
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  const data = await response.json();
  
  
  // const newChatId = chatId || `new-${Date.now()}`;
  // const newMessage: Message = {
  //   id: `msg-${Date.now()}`,
  //   content: message,
  //   role: 'user',
  //   timestamp: new Date().toISOString()
  // };

  // const response: Message = {
  //   id: `msg-${Date.now() + 1}`,
  //   content: `This is a mock response to: "${message}"`,
  //   role: 'assistant',
  //   timestamp: new Date().toISOString()
  // };

  // if (!mockMessages[newChatId]) {
  //   mockMessages[newChatId] = [];
  // }
  
  // mockMessages[newChatId].push(newMessage, response);

  // if (!chatId) {
  //   mockConversations.unshift({
  //     id: newChatId,
  //     title: message.slice(0, 30) + '...',
  //     lastMessage: response.content,
  //     timestamp: response.timestamp
  //   });
  // }
  return { chatId: data['conversationId'], message: data };
};