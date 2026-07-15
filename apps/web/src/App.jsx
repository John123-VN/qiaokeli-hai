import React, { useState } from 'react';
import ImportZone from './components/ImportZone';
import DreaminaView from './components/DreaminaView';

export default function App() {
  const [currentView, setCurrentView] = useState('editor'); // 'editor' or 'dreamina'
  const [mediaLibrary, setMediaLibrary] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [timelineClips, setTimelineClips] = useState([]);

  const handleFileImported = (file) => {
    setMediaLibrary((prev) => [...prev, file]);
    if (!activeVideo) setActiveVideo(file);
  };

  const addToTimeline = (file) => {
    setTimelineClips((prev) => [...prev, file]);
  };

  if (currentView === 'dreamina') {
    return <DreaminaView onBack={() => setCurrentView('editor')} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#120a07] text-[#fdf0ed] font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center h-14 px-6 bg-[#1e120c] border-b border-[#2d1b12]">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold text-[#d4a373] tracking-wider">巧克力海 🌊</span>
          <span className="text-xs bg-[#2d1b12] text-[#d4a373] px-2 py-0.5 rounded border border-[#4a2e20] font-mono">React v1.1</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCurrentView('dreamina')}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-900 to-[#d4a373] hover:opacity-90 text-white font-bold text-xs px-4 py-2 rounded-full transition shadow-lg"
          >
            <span>🌌</span>
            <span>Dreamina AI</span>
          </button>
          <button className="bg-[#2d1b12] hover:bg-[#d4a373] hover:text-[#120a07] text-xs font-semibold px-4 py-2 rounded-full transition">
            Export Video
          </button>
        </div>
      </header>

      {/* Workspace Panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Library Column */}
        <aside className="w-80 bg-[#1a0f0a] border-r border-[#2d1b12] flex flex-col p-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#d4a373]">Assets</h2>
          <ImportZone onFileImported={handleFileImported} />
          
          <div className="flex-1 overflow-y-auto space-y-2">
            {mediaLibrary.map((item, idx) => (
              <div 
                key={idx}
                className="p-3 bg-[#1e120c] border border-[#2d1b12] rounded text-xs flex justify-between items-center hover:border-[#d4a373] transition cursor-pointer"
                onClick={() => setActiveVideo(item)}
              >
                <span className="truncate pr-2 font-medium">{item.name}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); addToTimeline(item); }}
                  className="text-[#d4a373] font-bold text-sm hover:text-white"
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Video Monitor Area */}
        <main className="flex-1 bg-[#0f0704] flex items-center justify-center p-6">
          {activeVideo ? (
            <video src={activeVideo.url} controls className="aspect-video w-full max-w-2xl bg-black rounded shadow-2xl border border-[#2d1b12]" />
          ) : (
            <div className="aspect-video w-full max-w-2xl bg-black rounded shadow-2xl flex flex-col items-center justify-center border border-[#2d1b12] text-gray-600">
              <span className="text-4xl mb-2">🎬</span>
              <p className="text-xs font-mono">No active media stream selected</p>
            </div>
          )}
        </main>
      </div>

      {/* Editor Timeline Track */}
      <footer className="h-56 bg-[#160d09] border-t border-[#2d1b12] p-4 flex flex-col justify-between">
        <div className="text-xs text-gray-500 pb-2 border-b border-[#2d1b12]">00:00:00 / 00:01:00</div>
        <div className="flex-1 flex flex-col justify-center space-y-2">
          <div className="flex items-center h-10 bg-[#1e120c] rounded border border-[#2d1b12] px-2 relative">
            <span className="w-20 text-[10px] font-mono text-[#d4a373]">TRACK 1</span>
            <div className="flex-1 h-full flex items-center relative">
              {timelineClips.map((clip, idx) => (
                <div key={idx} className="h-5/6 bg-[#d4a373] text-[#120a07] text-[10px] font-bold px-3 rounded flex items-center shadow-md">
                  {clip.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
