
import React from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  placeholder: string;
  isLoading: boolean;
  onGenerate: () => void;
  showFileUpload?: boolean;
  onFileUpload?: (file: File) => void;
  showQuantitySelector?: boolean;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

export function PromptInput({
  prompt,
  onPromptChange,
  placeholder,
  isLoading,
  onGenerate,
  showFileUpload = false,
  onFileUpload,
  showQuantitySelector = false,
  quantity = 4,
  onQuantityChange,
}: PromptInputProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      {showFileUpload && (
        <div className="space-y-2">
          <Label htmlFor="file-upload">Upload PDF or Text File (Optional)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.txt,.doc,.docx"
              onChange={handleFileChange}
              className="flex-1"
            />
            <Upload className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}

      {showQuantitySelector && (
        <div className="space-y-2">
          <Label htmlFor="quantity">Number of Questions</Label>
          <div className="flex gap-2">
            {[2, 4, 6, 8, 10].map((num) => (
              <Button
                key={num}
                type="button"
                variant={quantity === num ? "default" : "outline"}
                size="sm"
                onClick={() => onQuantityChange?.(num)}
                disabled={isLoading}
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      )}

      <Textarea
        placeholder={placeholder}
        className="min-h-[200px]"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
      />
      <Button
        onClick={onGenerate}
        disabled={isLoading || !prompt.trim()}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate"
        )}
      </Button>
    </div>
  );
}
