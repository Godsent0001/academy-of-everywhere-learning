
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, FileImage, FileVideo, Trash2, CheckCircle } from 'lucide-react';

interface FileItemProps {
  file: {
    id: string;
    name: string;
    size: number;
    type: string;
    uploadDate: string;
    status: 'uploaded' | 'processing' | 'processed';
  };
  onDelete: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({ file, onDelete }) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const getFileIcon = () => {
    if (file.type.includes('image')) {
      return <FileImage className="h-5 w-5 text-blue-500" />;
    } else if (file.type.includes('video')) {
      return <FileVideo className="h-5 w-5 text-red-500" />;
    } else {
      return <FileText className="h-5 w-5 text-green-500" />;
    }
  };
  
  return (
    <Card className="p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div>{getFileIcon()}</div>
        <div>
          <p className="font-medium text-sm">{file.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {file.status === 'processed' && (
          <div className="flex items-center text-green-600 text-sm mr-2">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>Processed</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
