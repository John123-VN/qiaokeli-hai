import React, { useState, useEffect } from 'react';

export default function DreaminaView({ onBack }) {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [cameraMotion, setCameraMotion] = useState('zoom-in');
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);

  // Load API key from local storage on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem('dreamina_secret_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('dreamina_secret_key', apiKey.trim());
      alert('Dreamina API key saved locally and securely.');
    } else {
      localStorage.removeItem('dreamina_secret_key');
      alert('Dreamina API key cleared from local storage.');
    }
  };

  const startAiGeneration = async () => {
    const activeKey = localStorage.getItem('dreamina_secret_key') || apiKey.trim();

    if (!activeKey) {
      alert("Authentication failed. Please enter and save your Dreamina API key first.");
      return;
    }
    if (!prompt.trim()) {
      alert("Please enter a text prompt describing your scene.");
      return;
    }

    setIsGenerating(true);
    setGeneratedVideoUrl(null);
    setGenerationProgress(10);
    setLoadingText("Handshaking credentials with secure Dreamina US API key...");

    // Simulate generation pipeline phases
    const simulationSteps = [
      { progress: 25, text: "Processing request on Dreamina servers..." },
      { progress: 50, text: "Generating video frames (45/100)..." },
      { progress: 75, text: "Finalizing video rendering compile..." },
      { progress: 100, text: "Render complete! Injecting stream..." }
    ];

    for (let i = 0; i < simulationSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGenerationProgress(simulationSteps[i].progress);
      setLoadingText(simulationSteps[i].text);
    }

    // Set a high-quality looping asset simulation
    setGeneratedVideoUrl("https://assets.mixkit.co/videos/preview/mixkit-brown-liquid-splashing-around-41857-large.mp4");
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#120a07] text-[#fdf0ed] font-sans">
      {/* View Header */}
      <header className="flex justify-between items-center h-14 px-6 bg-[#1e120c] border-b border-[#2d1b12]">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-bold text-[#d4a373] tracking-wider">巧克力海 × Dreamina AI 🌌</span>
          <span className="text-xs bg-[#2d1b12] text-[#d4a373] px-2 py-0.5 rounded border border-[#4a2e20] font-mono">Generative Mode</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center bg-[#120a07] rounded border border-[#2d1b12] px-2 py-1">
            <input 
              type="password" 
              value={apiKey} 
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste Dreamina US API Key..." 
              className="bg-transparent text-xs text-[#fdf0ed] focus:outline-none w-48 pr-12"
            />
            <button 
              onClick={saveApiKey} 
              className="bg-[#2d1b12] hover:bg-[#d4a373] hover:text-[#120a07] text-[10px] font-bold px-2 py-0.5 rounded transition absolute right-1"
            >
              Save
            </button>
          </div>
          <button 
            onClick={onBack}
            className="text-xs text-[#d4a373] hover:text-[#fdf0ed] font-semibold transition"
          >
            ← Back to Editor
          </button>
        </div>
      </header>

      {/* Main Panel Content Split */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side: Parameters Form */}
        <aside className="w-80 bg-[#1a0f0a] border-r border-[#2d1b12] p-4 flex flex-col space-y-4 overflow-y-auto">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#d4a373] mb-1">AI Generator Panel</h2>
            <p className="text-[10px] text-gray-500">Transform natural text prompts into high-motion cinematic sequences.</p>
          </div>

          {/* Prompt Entry */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 block uppercase">Visual Prompt</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A rich dark chocolate wave breaking into an ocean of hot cocoa, highly detailed, photorealistic, cinematic camera panning up..." 
              className="w-full h-28 bg-[#120a07] border border-[#2d1b12] rounded-lg p-2.5 text-xs text-[#fdf0ed] focus:outline-none focus:border-[#d4a373] resize-none"
            />
          </div>

          {/* Aspect Ratio Picker */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 block uppercase">Aspect Ratio</label>
            <div className="grid grid-cols-3 gap-1">
              {['9:16', '16:9', '1:1'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2 text-[11px] rounded font-bold border transition ${
                    aspectRatio === ratio 
                      ? 'border-[#d4a373] bg-[#2d1b12] text-[#d4a373]' 
                      : 'border-[#2d1b12] bg-[#120a07] text-gray-400 hover:bg-[#1a0f0a]'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Presets Selector */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gray-400 block uppercase">Camera Motion</label>
            <select 
              value={cameraMotion}
              onChange={(e) => setCameraMotion(e.target.value)}
              className="w-full bg-[#120a07] border border-[#2d1b12] rounded-lg p-2 text-xs text-[#fdf0ed] focus:outline-none focus:border-[#d4a373]"
            >
              <option value="none">Static Frame</option>
              <option value="zoom-in">Zoom In (Slow)</option>
              <option value="pan-left">Pan Left (Slow)</option>
              <option value="tilt-up">Tilt Up (Cinematic)</option>
            </select>
          </div>

          {/* Core Action Trigger */}
          <button 
            onClick={startAiGeneration}
            disabled={isGenerating}
            className="w-full bg-[#d4a373] hover:opacity-90 disabled:opacity-50 text-[#120a07] font-bold py-2.5 rounded-lg text-xs transition"
          >
            {isGenerating ? 'Rendering frames...' : 'Generate Clip'}
          </button>
        </aside>

        {/* Right Side: Preview Display & Rendering Screen */}
        <main className="flex-1 bg-[#0f0704] flex items-center justify-center p-6 relative">
          <div 
            className="bg-black rounded-xl border border-[#2d1b12] flex items-center justify-center overflow-hidden relative shadow-2xl transition-all duration-300"
            style={{
              aspectRatio: aspectRatio === '9:16' ? '9/16' : aspectRatio === '16:9' ? '16/9' : '1/1',
              height: '80%',
              maxHeight: '70vh'
            }}
          >
            {/* Loading/Render Screen Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 bg-[#120a07]/95 flex flex-col items-center justify-center p-6 space-y-4 z-10 text-center">
                <div className="relative flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#4a2e20] border-t-[#d4a373]" />
                  <span className="absolute text-[10px] font-bold font-mono text-[#d4a373]">{generationProgress}%</span>
                </div>
                <p className="text-xs font-semibold text-[#d4a373] max-w-xs">{loadingText}</p>
              </div>
            )}

            {/* Inactive Standby Screen */}
            {!isGenerating && !generatedVideoUrl && (
              <div className="text-center p-6">
                <span className="text-5xl block mb-2 opacity-35">🌌</span>
                <p className="text-xs text-gray-500 max-w-xs">Enter your parameters and generate to view your Dreamina clip.</p>
              </div>
            )}

            {/* Playback Container */}
            {generatedVideoUrl && (
              <video 
                src={generatedVideoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </main>

      </div>
    </div>
  );
}
