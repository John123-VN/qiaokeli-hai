import React, { useState, useRef } from 'react';

export default function ImportZone({ onFileImported }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const processFiles = (files) => {
    for (let file of files) {
      if (file.type.startsWith('video/') || file.type.startsWith('audio/')) {
        const fileData = {
          name: file.name,
          type: file.type.startsWith('video/') ? 'video' : 'audio',
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
          url: URL.createObjectURL(file), // Generate local blob URL for playback
        };
        onFileImported(fileData);
      } else {
        alert('Unsupported file format. Please upload video or audio tracks.');
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={triggerFileInput}
      className={`relative h-28 border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
        isDragActive
          ? 'border-[#d4a373] bg-[#2d1b12]/40 scale-[0.98]'
          : 'border-[#4a2e20] bg-[#120a07]/60 hover:border-[#d4a373]/60'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="video/*,audio/*"
        onChange={handleChange}
        className="hidden"
      />

      <span className="text-2xl mb-1 select-none">📥</span>
      <p className="text-[11px] font-bold text-[#d4a373] uppercase tracking-wide">
        Drag & Drop media
      </p>
      <p className="text-[9px] text-gray-500 mt-0.5">
        Or click to browse video / audio
      </p>
    </div>
  );
}
