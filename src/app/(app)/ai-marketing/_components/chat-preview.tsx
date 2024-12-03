import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  content: string;
  timestamp: string;
}

interface ChatPreviewProps {
  message: Message;
  customerName?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function ChatPreview({
  message,
  customerName = "Customer",
  ref,
}: ChatPreviewProps) {
  return (
    <Card id="chat-preview" ref={ref} className="mx-auto my-8 w-full max-w-2xl">
      <CardHeader className="mb-4 text-lg font-semibold">
        Message Preview
      </CardHeader>
      <CardContent className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary">
            {customerName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="mb-1 text-sm font-medium">{customerName}</div>

            <Button
              title="Copy"
              variant={"ghost"}
              size={"icon"}
              className="size-8 rounded-full"
              onClick={async () => {
                await navigator.clipboard.writeText(message.content);
                toast("Message copied to clipboard!");
              }}
            >
              <Copy className="size-6" />
            </Button>
          </div>
          <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-2.5 text-sm">
            {message.content}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {message.timestamp}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
