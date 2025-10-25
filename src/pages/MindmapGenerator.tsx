import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Trash2, Network } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWithLangChain } from "@/utils/langchainUtils";
import { AIResultDisplay } from "@/components/ai/AIResultDisplay";
import { PDFExportDialog } from "@/components/ai/PDFExportDialog";
import { generatePDF } from "@/utils/pdfUtils";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, orderBy } from "firebase/firestore";

interface MindmapHistoryItem {
  id: string;
  prompt: string;
  result: string;
  timestamp: number;
}

const MindmapGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfFilename, setPdfFilename] = useState("");
  const [history, setHistory] = useState<MindmapHistoryItem[]>([]);
  const { toast } = useToast();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadHistory();
  }, [currentUser]);

  const loadHistory = async () => {
    if (!currentUser) return;

    try {
      const q = query(
        collection(db, "mindmaps"),
        where("userId", "==", currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      const historyData: MindmapHistoryItem[] = [];
      querySnapshot.forEach((doc) => {
        historyData.push({ id: doc.id, ...doc.data() } as MindmapHistoryItem);
      });
      setHistory(historyData);
    } catch (error) {
      console.error("Error loading history:", error);
    }
  };

  const generateMindmap = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide a topic for the mindmap.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const enhancedPrompt = `Create a detailed mindmap structure for: ${prompt}. Format it as a hierarchical tree with main topic, subtopics, and key points. Use clear indentation and structure.`;
      const generatedContent = await generateWithLangChain("content", enhancedPrompt);
      setResult(generatedContent);
      setPdfFilename(`mindmap_${new Date().toISOString().slice(0, 10)}`);

      if (currentUser) {
        await addDoc(collection(db, "mindmaps"), {
          userId: currentUser.uid,
          prompt: prompt,
          result: generatedContent,
          timestamp: Date.now(),
        });
        await loadHistory();
      }

      toast({
        title: "Mindmap generated",
        description: "Your mindmap has been created successfully!",
      });
    } catch (error) {
      console.error("Error generating mindmap:", error);
      toast({
        title: "Error generating mindmap",
        description: `${error instanceof Error ? error.message : "There was an error. Please try again."}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      await deleteDoc(doc(db, "mindmaps", id));
      await loadHistory();
      toast({
        title: "Deleted",
        description: "Mindmap removed from history.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete mindmap.",
        variant: "destructive",
      });
    }
  };

  const loadHistoryItem = (item: MindmapHistoryItem) => {
    setPrompt(item.prompt);
    setResult(item.result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to clipboard",
      description: "The mindmap has been copied to your clipboard.",
    });
  };

  const openPdfDialog = () => {
    setShowPdfDialog(true);
  };

  const downloadAsPdf = async () => {
    try {
      const filename = pdfFilename.trim() || `mindmap_${new Date().toISOString().slice(0, 10)}`;
      await generatePDF(result, "Mindmap Generator", filename);
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
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-2">
          <Network className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Mindmap Generator</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          Create visual mindmaps to organize and structure your ideas. Your mindmap history is automatically saved.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Enter a topic for your mindmap (e.g., 'Machine Learning Concepts', 'Project Planning Steps')"
                className="min-h-[150px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button
                onClick={generateMindmap}
                disabled={isLoading || !prompt.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Mindmap...
                  </>
                ) : (
                  <>
                    <Network className="mr-2 h-4 w-4" />
                    Generate Mindmap
                  </>
                )}
              </Button>
            </div>

            <AIResultDisplay
              result={result}
              isLoading={isLoading}
              onCopy={copyToClipboard}
              onExportPDF={openPdfDialog}
            />
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mindmap History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No history yet. Generate your first mindmap!</p>
                ) : (
                  history.map((item) => (
                    <Card key={item.id} className="cursor-pointer hover:bg-accent transition-colors">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1" onClick={() => loadHistoryItem(item)}>
                            <p className="text-sm font-medium line-clamp-2">{item.prompt}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(item.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHistoryItem(item.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <PDFExportDialog
          open={showPdfDialog}
          onOpenChange={setShowPdfDialog}
          filename={pdfFilename}
          onFilenameChange={setPdfFilename}
          onDownload={downloadAsPdf}
        />
      </div>
    </ProtectedRoute>
  );
};

export default MindmapGenerator;
