import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatWindow } from "@/components/ChatWindow";
import { getConversations, getChatHistory, sendMessage } from "@/lib/api";
import type { Conversation, Message } from "@/types/chat";

export default function Index() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load conversations on mount
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setIsLoading(true);
        const data = await getConversations();
        setConversations(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load conversations",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadConversations();
  }, [toast]);

  // Load chat history when selecting a chat
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!selectedChatId) {
        setMessages([]);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getChatHistory(selectedChatId);
        setMessages(data.messages);
      } catch (error) {

        toast({
          title: "Error",
          description: "Failed to load chat history",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadChatHistory();
  }, [selectedChatId, toast]);

  const handleNewChat = () => {
    setSelectedChatId(null);
    setMessages([]);
  };

  const handleSendMessage = async (content: string) => {
    try {
      if (!selectedChatId) {
        console.log("conversationdId is not exist so creating new conversation");
        const createConversationResponse = await fetch('http://localhost:8080/api/chat/conversations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: content })
        });

        if (!createConversationResponse.ok) {
          throw new Error('Failed to create conversation');
        }

        const createConversationData = await createConversationResponse.json();
        console.log("conversationd created with id: ", createConversationData.conversationId);
        const newConversation = await sendMessage(createConversationData.conversationId, content);
        console.log("new message created in chat :" + newConversation.chatId);
        setSelectedChatId(createConversationData.conversationId);
        const updatedConversations = await getConversations();
        setConversations(updatedConversations);
      }

      setIsLoading(true);
      const { chatId, message } = await sendMessage(selectedChatId, content);

      // Update messages
      setMessages(prev => [...prev,
      { messageId: Date.now().toString(), content, role: 'user', timestamp: new Date().toISOString() },
        message
      ]);
      console.log("aaaaaa");
      // If this is a new chat, update the selected chat ID and refresh conversations
      if (!selectedChatId) {
        // console.log("aaaaaa");
        // setSelectedChatId(chatId);
        // const updatedConversations = await getConversations();
        // setConversations(updatedConversations);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <ChatSidebar
        conversations={conversations}
        selectedChatId={selectedChatId}
        onSelectChat={setSelectedChatId}
        onNewChat={handleNewChat}
      />
      <ChatWindow
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        className="flex-1"
      />
    </div>
  );
}