
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  Heading, 
  Image as ImageIcon,
  Video,
  FileText,
  Link as LinkIcon
} from 'lucide-react';

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  onAddQuestion?: (question: {
    question: string;
    type: string;
    options?: string[];
    answer?: string;
  }) => void;
  placeholder?: string;
  minHeight?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '',
  onChange,
  onAddQuestion,
  placeholder = 'Start writing...',
  minHeight = '200px'
}) => {
  const [value, setValue] = useState(initialValue);
  const [activeTab, setActiveTab] = useState<string>('write');
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');
  const [linkText, setLinkText] = useState<string>('');
  const [questionText, setQuestionText] = useState<string>('');
  const [questionType, setQuestionType] = useState<string>('multiple-choice');
  const [options, setOptions] = useState<string[]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleToolbarAction = (action: string) => {
    let newText = value;
    const textarea = document.querySelector('textarea');
    const selectionStart = textarea?.selectionStart ?? 0;
    const selectionEnd = textarea?.selectionEnd ?? 0;
    const selectedText = value.substring(selectionStart, selectionEnd);
    
    switch (action) {
      case 'bold':
        newText = value.substring(0, selectionStart) + `**${selectedText}**` + value.substring(selectionEnd);
        break;
      case 'italic':
        newText = value.substring(0, selectionStart) + `*${selectedText}*` + value.substring(selectionEnd);
        break;
      case 'underline':
        newText = value.substring(0, selectionStart) + `<u>${selectedText}</u>` + value.substring(selectionEnd);
        break;
      case 'heading':
        newText = value.substring(0, selectionStart) + `\n## ${selectedText}\n` + value.substring(selectionEnd);
        break;
      case 'list':
        newText = value.substring(0, selectionStart) + `\n- ${selectedText.split('\n').join('\n- ')}` + value.substring(selectionEnd);
        break;
      default:
        break;
    }
    
    handleChange(newText);
  };

  const handleAddImage = () => {
    if (imageUrl) {
      const imageMarkdown = `\n![Image](${imageUrl})\n`;
      handleChange(value + imageMarkdown);
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  const handleAddVideo = () => {
    if (videoUrl) {
      // Extract YouTube video ID if it's a YouTube URL
      let videoId = videoUrl;
      if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        const match = videoUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (match && match[1]) {
          videoId = match[1];
        }
      }
      
      const videoEmbed = `\n<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n`;
      handleChange(value + videoEmbed);
      setVideoUrl('');
      setShowVideoInput(false);
    }
  };

  const handleAddLink = () => {
    if (linkUrl && linkText) {
      const linkMarkdown = `[${linkText}](${linkUrl})`;
      handleChange(value + linkMarkdown);
      setLinkUrl('');
      setLinkText('');
      setShowLinkInput(false);
    }
  };

  const handlePreview = () => {
    // Simple markdown to HTML conversion for preview
    let html = value
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded" />');
    
    setPreviewHtml(html);
    setActiveTab('preview');
  };

  const handleAddQuestionClick = () => {
    if (!questionText) return;
    
    if (onAddQuestion) {
      if (questionType === 'multiple-choice') {
        const filteredOptions = options.filter(option => option.trim() !== '');
        onAddQuestion({
          question: questionText,
          type: questionType,
          options: filteredOptions,
          answer: correctAnswer
        });
      } else {
        onAddQuestion({
          question: questionText,
          type: questionType
        });
      }
      
      // Reset form
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
      
      // Append to the markdown
      const questionMarkdown = `\n\n**Question:** ${questionText}\n`;
      handleChange(value + questionMarkdown);
    }
  };

  const handleOptionChange = (index: number, newValue: string) => {
    const newOptions = [...options];
    newOptions[index] = newValue;
    setOptions(newOptions);
  };

  return (
    <div className="border rounded-md">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/50">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => handleToolbarAction('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => handleToolbarAction('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => handleToolbarAction('underline')}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => handleToolbarAction('heading')}
        >
          <Heading className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => handleToolbarAction('list')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowImageInput(!showImageInput)}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowVideoInput(!showVideoInput)}
        >
          <Video className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowLinkInput(!showLinkInput)}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <div className="ml-auto">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handlePreview}
          >
            Preview
          </Button>
        </div>
      </div>
      
      {/* Media inputs */}
      {showImageInput && (
        <div className="p-2 border-b">
          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder="Image URL" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              className="flex-grow"
            />
            <Button type="button" size="sm" onClick={handleAddImage}>
              Insert Image
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setShowImageInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      {showVideoInput && (
        <div className="p-2 border-b">
          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder="YouTube URL or Video ID" 
              value={videoUrl} 
              onChange={(e) => setVideoUrl(e.target.value)} 
              className="flex-grow"
            />
            <Button type="button" size="sm" onClick={handleAddVideo}>
              Insert Video
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setShowVideoInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      {showLinkInput && (
        <div className="p-2 border-b">
          <div className="flex flex-wrap gap-2">
            <Input 
              type="text" 
              placeholder="Link text" 
              value={linkText} 
              onChange={(e) => setLinkText(e.target.value)} 
              className="flex-grow basis-full md:basis-0"
            />
            <Input 
              type="text" 
              placeholder="URL" 
              value={linkUrl} 
              onChange={(e) => setLinkUrl(e.target.value)} 
              className="flex-grow basis-full md:basis-0"
            />
            <Button type="button" size="sm" onClick={handleAddLink}>
              Insert Link
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setShowLinkInput(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border-b w-full rounded-none">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          {onAddQuestion && <TabsTrigger value="questions">Add Question</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="write" className="p-0">
          <Textarea 
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={`border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-t-none min-h-[${minHeight}]`}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="p-4">
          <div 
            className="prose max-w-none" 
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
          {!previewHtml && <p className="text-gray-500">Nothing to preview</p>}
        </TabsContent>
        
        {onAddQuestion && (
          <TabsContent value="questions" className="p-0">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question-text">Question</Label>
                <Textarea 
                  id="question-text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="Enter your question here..."
                />
              </div>
              
              <div className="space-y-2">
                <Label>Question Type</Label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="question-type" 
                      checked={questionType === 'multiple-choice'} 
                      onChange={() => setQuestionType('multiple-choice')}
                      className="form-radio"
                    />
                    <span>Multiple Choice</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="question-type" 
                      checked={questionType === 'open-ended'} 
                      onChange={() => setQuestionType('open-ended')}
                      className="form-radio"
                    />
                    <span>Open-Ended</span>
                  </label>
                </div>
              </div>
              
              {questionType === 'multiple-choice' && (
                <>
                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="space-y-2">
                      {options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            name="correct-answer" 
                            checked={correctAnswer === option} 
                            onChange={() => setCorrectAnswer(option)}
                            disabled={!option.trim()}
                            className="form-radio"
                          />
                          <Input 
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    {correctAnswer === '' && options.some(opt => opt.trim() !== '') && (
                      <p className="text-sm text-red-500">Please select the correct answer</p>
                    )}
                  </div>
                </>
              )}
              
              <Button
                onClick={handleAddQuestionClick}
                disabled={
                  !questionText.trim() || 
                  (questionType === 'multiple-choice' && 
                    (options.filter(opt => opt.trim() !== '').length < 2 || !correctAnswer))
                }
              >
                Add Question
              </Button>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default RichTextEditor;
