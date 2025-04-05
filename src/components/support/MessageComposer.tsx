
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Send,
  Paperclip,
  Smile,
  Tag,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MessageComposerProps {
  recipient?: {
    id: string;
    name: string;
    avatar?: string;
    type: 'customer' | 'shop' | 'agent';
  };
  onSend?: (message: string, attachments: File[]) => void;
  onCancel?: () => void;
  placeholder?: string;
  showRecipient?: boolean;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  recipient,
  onSend,
  onCancel,
  placeholder = "Type your message...",
  showRecipient = true
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  
  const handleSend = () => {
    if (!message.trim() && attachments.length === 0) return;
    
    setSending(true);
    setTimeout(() => {
      if (onSend) {
        onSend(message, attachments);
      }
      setMessage('');
      setAttachments([]);
      setSending(false);
    }, 500);
  };
  
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const getRecipientBadgeColor = () => {
    switch (recipient?.type) {
      case 'customer':
        return 'bg-blue-100 text-blue-500';
      case 'shop':
        return 'bg-amber-100 text-amber-500';
      case 'agent':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };
  
  return (
    <div className="border rounded-lg p-4 space-y-4">
      {showRecipient && recipient && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">To:</p>
            <div className="flex items-center gap-2 border rounded-full px-2 py-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={recipient.avatar} alt={recipient.name} />
                <AvatarFallback className={getRecipientBadgeColor()}>
                  {recipient.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{recipient.name}</span>
              <Badge variant="outline" className="text-xs ml-1">
                {recipient.type === 'customer' ? 'Customer' : 
                 recipient.type === 'shop' ? 'Shop' : 'Agent'}
              </Badge>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full ml-1" onClick={onCancel}>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Clock className="h-4 w-4" />
                  Normal
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <h4 className="font-medium">Message Priority</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Normal</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm">Important</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Urgent</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Tag className="h-4 w-4" />
                  Templates
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-2">
                  <h4 className="font-medium">Quick Templates</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <div className="p-2 hover:bg-muted rounded-md cursor-pointer" onClick={() => setMessage("Thank you for contacting our support team. I'm reviewing your request and will get back to you shortly.")}>
                      <p className="font-medium text-sm">Initial Response</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">Thank you for contacting our support team...</p>
                    </div>
                    <div className="p-2 hover:bg-muted rounded-md cursor-pointer" onClick={() => setMessage("I've checked your order details and can confirm that your order is currently being processed. It should be shipped within the next 24 hours.")}>
                      <p className="font-medium text-sm">Order Status Update</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">I've checked your order details and can confirm...</p>
                    </div>
                    <div className="p-2 hover:bg-muted rounded-md cursor-pointer" onClick={() => setMessage("Your refund for order #ORD-XXXXX has been processed. It should appear in your account within 3-5 business days.")}>
                      <p className="font-medium text-sm">Refund Confirmation</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">Your refund for order #ORD-XXXXX has been processed...</p>
                    </div>
                    <div className="p-2 hover:bg-muted rounded-md cursor-pointer" onClick={() => setMessage("I apologize for the inconvenience this has caused. I'm escalating this issue to our specialized team who will prioritize resolving this for you.")}>
                      <p className="font-medium text-sm">Escalation Notice</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">I apologize for the inconvenience this has caused...</p>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
      
      <Textarea 
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-[120px] resize-y"
      />
      
      {attachments.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Attachments</p>
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate max-w-[150px]">{file.name}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => removeAttachment(index)}>
                  <XCircle className="h-3 w-3 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <Paperclip className="h-4 w-4" />
              <span className="text-sm">Attach</span>
            </div>
            <Input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              multiple
              onChange={handleAttachmentChange}
            />
          </label>
          
          <div className="h-4 w-px bg-border mx-1"></div>
          
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Smile className="h-4 w-4 text-muted-foreground" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Support Guidelines</h4>
                <p className="text-sm text-muted-foreground">When communicating with customers, remember to:</p>
                <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                  <li>Maintain a professional and courteous tone</li>
                  <li>Address their specific concerns directly</li>
                  <li>Provide clear next steps or resolution timelines</li>
                  <li>Thank them for their patience and understanding</li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center gap-2">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          
          <Button 
            onClick={handleSend} 
            disabled={sending || (!message.trim() && attachments.length === 0)}
            className="gap-1"
          >
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
