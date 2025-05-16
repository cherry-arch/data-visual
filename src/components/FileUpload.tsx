import React, { useState, useRef } from "react";
import { Upload, FileType, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";

type UploadedData = {
  columns: string[];
  rows: Record<string, any>[];
  fileName: string;
  fileType: "csv" | "excel" | "pdf" | null;
};

interface FileUploadProps {
  onDataLoaded: (data: UploadedData) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const handleFile = async (file: File) => {
    setLoading(true);
    setError(null);
    
    const fileType = file.name.split('.').pop()?.toLowerCase();
    
    try {
      if (fileType === 'csv') {
        Papa.parse(file, {
          header: true,
          complete: (results) => {
            const columns = results.meta.fields || [];
            onDataLoaded({
              columns,
              rows: results.data as Record<string, any>[],
              fileName: file.name,
              fileType: 'csv'
            });
            toast({
              title: "Success",
              description: `Successfully loaded ${file.name}`,
            });
            setLoading(false);
          },
          error: (error) => {
            setError(`Error parsing CSV: ${error.message}`);
            setLoading(false);
          }
        });
      } else if (fileType === 'xlsx' || fileType === 'xls') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            const columns = json.length > 0 ? Object.keys(json[0]) : [];
            
            onDataLoaded({
              columns,
              rows: json as Record<string, any>[],
              fileName: file.name,
              fileType: 'excel'
            });
            toast({
              title: "Success",
              description: `Successfully loaded ${file.name}`,
            });
          } catch (err) {
            setError(`Error parsing Excel file: ${err instanceof Error ? err.message : String(err)}`);
          } finally {
            setLoading(false);
          }
        };
        reader.readAsArrayBuffer(file);
      } else if (fileType === 'pdf') {
        // For demo purposes only - in a real app we'd need a PDF parsing library
        setError("PDF parsing is currently not implemented in this demo. Please use CSV or Excel files.");
        setLoading(false);
      } else {
        setError(`Unsupported file type: ${fileType}. Please upload CSV, Excel, or PDF files.`);
        setLoading(false);
      }
    } catch (err) {
      setError(`Error processing file: ${err instanceof Error ? err.message : String(err)}`);
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseClick = () => {
    // Programmatically click the hidden file input
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full mb-8 animate-fade-in transition-all duration-300">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-12 text-center transition-all duration-500",
          isDragging 
            ? "border-primary bg-primary/10 scale-105 shadow-lg" 
            : "border-border hover:border-primary/50 hover:bg-muted/50 hover:shadow-md",
          ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className={cn(
            "p-4 rounded-full transition-all duration-500",
            isDragging 
              ? "bg-primary/20 scale-110 rotate-12" 
              : "bg-primary/10 hover:scale-105 hover:bg-primary/15"
          )}>
            <Upload className={cn(
              "h-10 w-10 text-primary transition-transform duration-300",
              isDragging ? "animate-bounce" : "hover:translate-y-[-4px]"
            )} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-medium">Drag and drop your file here</h3>
            <p className="text-sm text-muted-foreground">
              Support for CSV, Excel, and PDF files
            </p>
          </div>
          <div className="mt-2">
            <Button 
              onClick={handleBrowseClick}
              variant="outline" 
              className="relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md group"
            >
              <span className="relative z-10 transition-transform group-hover:translate-x-1">Browse Files</span>
              <span className="absolute inset-0 w-0 bg-primary/10 transition-all duration-300 group-hover:w-full"></span>
              <input
                ref={fileInputRef}
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".csv,.xlsx,.xls,.pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </div>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mt-4 animate-fade-in">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {loading && (
        <div className="w-full flex justify-center mt-4">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-primary/20 h-12 w-12 animate-spin"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-primary/20 rounded w-3/4 animate-shimmer"></div>
              <div className="space-y-2">
                <div className="h-4 bg-primary/20 rounded animate-shimmer" style={{animationDelay: '200ms'}}></div>
                <div className="h-4 bg-primary/20 rounded w-5/6 animate-shimmer" style={{animationDelay: '400ms'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
