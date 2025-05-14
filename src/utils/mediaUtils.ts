
/**
 * Utility functions for handling media files (images and videos)
 */

/**
 * Compresses an image to a target size while maintaining aspect ratio
 */
export const compressImage = async (
  file: File, 
  maxWidth = 800, 
  maxHeight = 600, 
  quality = 0.8
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        // Calculate dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob/file
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas to Blob conversion failed'));
              return;
            }
            
            // Create new file with same name but compressed
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            
            resolve(compressedFile);
          },
          file.type,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
  });
};

/**
 * Generates a thumbnail from a video file
 */
export const generateVideoThumbnail = async (
  videoFile: File,
  thumbnailWidth = 400,
  thumbnailHeight = 225
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      // Seek to a position in the video
      video.currentTime = Math.min(1, video.duration / 3);
    };
    
    video.onseeked = () => {
      // Create canvas and draw video frame
      const canvas = document.createElement('canvas');
      canvas.width = thumbnailWidth;
      canvas.height = thumbnailHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnailUrl = canvas.toDataURL('image/jpeg');
      resolve(thumbnailUrl);
    };
    
    video.onerror = () => {
      reject(new Error('Error generating video thumbnail'));
    };
    
    // Load video from URL
    video.src = URL.createObjectURL(videoFile);
  });
};

/**
 * Process and optimize media files based on type
 */
export const processMediaFile = async (file: File): Promise<{
  file: File;
  thumbnailUrl?: string;
  dimensions: { width: number; height: number };
}> => {
  let processedFile = file;
  let thumbnailUrl: string | undefined;
  let dimensions = { width: 800, height: 600 }; // Default dimensions
  
  // Process based on file type
  if (file.type.startsWith('image/')) {
    // Compress images to standard dimensions
    processedFile = await compressImage(file, 800, 600);
    dimensions = { width: 800, height: 600 };
  } 
  else if (file.type.startsWith('video/')) {
    // Generate thumbnail for video files
    thumbnailUrl = await generateVideoThumbnail(file);
    dimensions = { width: 800, height: 450 }; // 16:9 aspect ratio
  }
  
  return {
    file: processedFile,
    thumbnailUrl,
    dimensions
  };
};
