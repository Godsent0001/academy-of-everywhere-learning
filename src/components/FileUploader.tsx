import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, FileImage } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  maxSize?: number;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  children?: React.ReactNode;
  className?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFilesSelected, 
  maxSize,
  accept,
  maxFiles,
  children,
  className
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let filesArray = Array.from(e.target.files);
      
      // Limit number of files if maxFiles is specified
      if (maxFiles && filesArray.length > maxFiles) {
        filesArray = filesArray.slice(0, maxFiles);
      }
      
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
      let filesArray = Array.from(e.dataTransfer.files);
      
      // Limit number of files if maxFiles is specified
      if (maxFiles && filesArray.length > maxFiles) {
        filesArray = filesArray.slice(0, maxFiles);
      }
      
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
  
  // If children is provided, render a custom UI
  if (children) {
    return (
      <div 
        className={className}
        onClick={handleButtonClick}
      >
        <input
          type="file"
          multiple={maxFiles !== 1}
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={acceptAttribute}
        />
        {children}
      </div>
    );
  }
  
  // Otherwise render the default UI
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
      } ${className || ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple={maxFiles !== 1}
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
            Drag and drop {maxFiles === 1 ? 'a file' : 'files'} here, or click to select {maxFiles === 1 ? 'a file' : 'files'}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Supported formats: PDF, Word, Text, Images
            {maxFiles && <span> (Max {maxFiles} {maxFiles === 1 ? 'file' : 'files'})</span>}
          </p>
        </div>
        
        <Button type="button" onClick={handleButtonClick}>
          Select {maxFiles === 1 ? 'File' : 'Files'}
        </Button>
      </div>
    </div>
  );
};
