
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, File } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxSize?: number;
  accept?: Record<string, string[]>;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFilesSelected, 
  maxSize,
  accept 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      onFilesSelected(filesArray);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files);
      onFilesSelected(filesArray);
    }
  };
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  let acceptAttribute = undefined;
  if (accept) {
    acceptAttribute = Object.entries(accept)
      .map(([type, extensions]) => extensions.join(','))
      .join(',');
  }
  
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={acceptAttribute}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium">Upload your study materials</h3>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supported formats: PDF, Word, Text, Images
          </p>
        </div>
        
        <Button type="button" onClick={handleButtonClick}>
          Select Files
        </Button>
      </div>
    </div>
  );
};
