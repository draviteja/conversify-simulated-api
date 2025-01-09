import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageInput } from "./MessageInput";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  className?: string;
}

export function ChatWindow({
  messages,
  onSendMessage,
  isLoading,
  className
}: ChatWindowProps) {
  return (
    <div className={cn("flex flex-col h-screen", className)}>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col max-w-[80%] space-y-2 p-4 rounded-lg",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
              <div
                className={cn(
                  "text-xs",
                  message.role === "user"
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-center p-4">
              <div className="animate-pulse">Loading...</div>
            </div>
          )}
        </div>
      </ScrollArea>
      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
}