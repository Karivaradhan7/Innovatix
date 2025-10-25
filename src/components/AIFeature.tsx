
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateWithLangChain } from "@/utils/langchainUtils";
import { generatePDF } from "@/utils/pdfUtils";
import { PromptInput } from "@/components/ai/PromptInput";
import { AIResultDisplay } from "@/components/ai/AIResultDisplay";
import { PDFExportDialog } from "@/components/ai/PDFExportDialog";

interface AIFeatureProps {
  title: string;
  description: string;
  placeholder: string;
  feature: "content" | "quiz" | "materials" | "notes" | "flashcards" | "assistant";
  showFileUpload?: boolean;
  showQuantitySelector?: boolean;
}

export function AIFeature({ title, description, placeholder, feature, showFileUpload = false, showQuantitySelector = false }: AIFeatureProps) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfFilename, setPdfFilename] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [quantity, setQuantity] = useState(4);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    try {
      const text = await file.text();
      const filePrompt = `Based on this document content, ${prompt || 'generate relevant content'}:\n\n${text.slice(0, 3000)}`;
      setPrompt(filePrompt);
      toast({
        title: "File uploaded",
        description: `${file.name} has been processed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error reading file",
        description: "Could not read the uploaded file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide some input for the AI to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      let enhancedPrompt = prompt;
      if (showQuantitySelector && quantity) {
        enhancedPrompt = `Generate exactly ${quantity} questions. ${prompt}`;
      }

      const generatedContent = await generateWithLangChain(feature, enhancedPrompt);
      setResult(generatedContent);

      setPdfFilename(`${feature}_${new Date().toISOString().slice(0, 10)}`);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Error generating content",
        description: `${error instanceof Error ? error.message : "There was an error generating content. Please try again."}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to your clipboard.",
    });
  };

  const openPdfDialog = () => {
    setShowPdfDialog(true);
  };

  const downloadAsPdf = async () => {
    try {
      const filename = pdfFilename.trim() || `${feature}_${new Date().toISOString().slice(0, 10)}`;
      
      await generatePDF(result, title, filename);
      
      setShowPdfDialog(false);
      
      toast({
        title: "PDF downloaded",
        description: `${filename}.pdf has been downloaded successfully.`,
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Error downloading PDF",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PromptInput
          prompt={prompt}
          onPromptChange={setPrompt}
          placeholder={placeholder}
          isLoading={isLoading}
          onGenerate={generateContent}
          showFileUpload={showFileUpload}
          onFileUpload={handleFileUpload}
          showQuantitySelector={showQuantitySelector}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
        
        <AIResultDisplay
          result={result}
          isLoading={isLoading}
          onCopy={copyToClipboard}
          onExportPDF={openPdfDialog}
        />
      </div>
      
      <PDFExportDialog
        open={showPdfDialog}
        onOpenChange={setShowPdfDialog}
        filename={pdfFilename}
        onFilenameChange={setPdfFilename}
        onDownload={downloadAsPdf}
      />
    </div>
  );
}
