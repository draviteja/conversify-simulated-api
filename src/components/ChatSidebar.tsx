import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Conversation } from "@/types/chat";
import { PlusCircle, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  className?: string;
}

export function ChatSidebar({
  conversations,
  selectedChatId,
  onSelectChat,
  onNewChat,
  className
}: ChatSidebarProps) {
  return (
    <div className={cn("w-64 border-r bg-sidebar", className)}>
      <div className="p-4">
        <Button
          variant="secondary"
          className="w-full justify-start gap-2"
          onClick={onNewChat}
        >
          <PlusCircle className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-2 p-2">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 text-left",
                selectedChatId === conversation.id && "bg-accent"
              )}
              onClick={() => onSelectChat(conversation.id)}
            >
              <MessageSquare className="h-4 w-4" />
              <div className="flex-1 truncate">
                <div className="truncate">{conversation.title}</div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}