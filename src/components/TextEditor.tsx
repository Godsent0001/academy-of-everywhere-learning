
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, FileVideo } from 'lucide-react';
import { FileUploader } from '@/components/FileUploader';
import { toast } from '@/hooks/use-toast';
import { processMediaFile } from '@/utils/mediaUtils';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Write your content here...", 
  className = "", 
  id 
}) => {
  const [showMediaTools, setShowMediaTools] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mediaList, setMediaList] = useState<{id: string, type: string, url: string, name: string}[]>([]);
  
  const insertFormat = (format: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let insertion = '';
    
    switch (format) {
      case 'bold':
        insertion = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        insertion = `*${selectedText || 'italic text'}*`;
        break;
      case 'list':
        insertion = `\n- ${selectedText || 'list item'}\n- `;
        break;
      case 'align-left':
        insertion = `<div style="text-align: left;">${selectedText || 'left aligned text'}</div>`;
        break;
      case 'align-center':
        insertion = `<div style="text-align: center;">${selectedText || 'centered text'}</div>`;
        break;
      case 'align-right':
        insertion = `<div style="text-align: right;">${selectedText || 'right aligned text'}</div>`;
        break;
      default:
        return;
    }
    
    const newContent = value.substring(0, start) + insertion + value.substring(end);
    onChange(newContent);
    
    // Set cursor position after formatting
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos = start + insertion.length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const handleContentMediaUpload = async (files: File[]) => {
    if (files.length > 0 && textareaRef.current) {
      const file = files[0];
      const fileType = file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'document';
      
      try {
        // Show loading toast
        toast({
          title: "Processing Media",
          description: "Optimizing your media file for best performance...",
        });
        
        // Process and optimize the media file
        const { file: processedFile, dimensions, thumbnailUrl } = await processMediaFile(file);
        
        // Create object URL for the processed file
        const mediaUrl = URL.createObjectURL(processedFile);
        const mediaId = Math.random().toString(36).substring(2, 9);
        
        // Add to media list
        const newMedia = {
          id: mediaId,
          type: fileType,
          url: mediaUrl,
          name: file.name
        };
        
        setMediaList(prev => [...prev, newMedia]);
        
        // Insert media HTML at cursor position
        const textarea = textareaRef.current;
        const cursorPosition = textarea.selectionStart;
        
        let mediaHtml = '';
        if (fileType === 'image') {
          mediaHtml = `\n<img src="${mediaUrl}" alt="${file.name}" class="content-image" data-id="${mediaId}" />\n`;
        } else if (fileType === 'video') {
          mediaHtml = `\n<video src="${mediaUrl}" controls class="content-video" data-id="${mediaId}">Your browser does not support video playback.</video>\n`;
        } else {
          mediaHtml = `\n<a href="${mediaUrl}" download="${file.name}" class="content-document" data-id="${mediaId}">${file.name}</a>\n`;
        }
        
        const newContent = 
          value.substring(0, cursorPosition) + 
          mediaHtml +
          value.substring(cursorPosition);
        
        onChange(newContent);
        
        toast({
          title: "Media Added",
          description: `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} has been optimized and inserted into your content.`,
        });
        
        // Position cursor after the inserted media
        setTimeout(() => {
          if (textareaRef.current) {
            const newPosition = cursorPosition + mediaHtml.length;
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(newPosition, newPosition);
          }
        }, 100);
      } catch (error) {
        console.error("Error processing media:", error);
        toast({
          title: "Error Processing Media",
          description: "There was a problem processing your file. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-1 mb-2 p-1 border rounded-md bg-background">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => insertFormat('bold')}
          className="h-8 w-8"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => insertFormat('italic')}
          className="h-8 w-8"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => insertFormat('list')}
          className="h-8 w-8"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => insertFormat('align-left')}
          className="h-8 w-8"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => insertFormat('align-center')}
          className="h-8 w-8"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => insertFormat('align-right')}
          className="h-8 w-8"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="h-8 border-l mx-1"></div>
        <FileUploader
          onFilesSelected={handleContentMediaUpload}
          maxSize={52428800} // 50MB
          accept={{
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
          }}
          maxFiles={1}
          className="w-auto"
        >
          <Button 
            type="button" 
            size="sm" 
            variant="ghost"
            className="flex items-center h-8"
            title="Add Image"
          >
            <ImageIcon className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Image</span>
          </Button>
        </FileUploader>
        <FileUploader
          onFilesSelected={handleContentMediaUpload}
          maxSize={104857600} // 100MB
          accept={{
            'video/mp4': ['.mp4'],
          }}
          maxFiles={1}
          className="w-auto"
        >
          <Button 
            type="button" 
            size="sm" 
            variant="ghost"
            className="flex items-center h-8"
            title="Add Video"
          >
            <FileVideo className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Video</span>
          </Button>
        </FileUploader>
      </div>
      
      <Textarea
        id={id}
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`min-h-[200px] ${className}`}
      />
      
      <style jsx>{`
        .content-image, .content-video {
          max-width: 100%;
          border-radius: 0.375rem;
          margin: 1rem 0;
        }
        
        .content-video {
          max-height: 400px;
        }
        
        .content-document {
          display: inline-block;
          padding: 0.5rem 1rem;
          margin: 0.5rem 0;
          background-color: #f1f5f9;
          border-radius: 0.375rem;
          color: #1e293b;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};
