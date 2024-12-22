'use client'
import { PreviewFrameProps } from '@/types/preview';
import { Globe, RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';

/**
 * First, install dependencies (npm i).
 * Then, run the code (npm run dev).
 * Wait for the `server-ready` event.
 * Finally, setUrl(url) and showcase the website to the user by embedding the URL in an iframe.
 */
export function PreviewFrame({ files, webContainer }: PreviewFrameProps) {
  // In a real implementation, this would compile and render the preview
  const [url, setUrl] = useState("");
  const [port, setPort] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function main() {
    setIsLoading(true);
    const installProcess = await webContainer.spawn('npm', ['install']);

    installProcess.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));

    await webContainer.spawn('npm', ['run', 'dev']);

    // Wait for `server-ready` event
    webContainer.on('server-ready', (port, url) => {
      // ...
      setPort(port);
      console.log(url)
      setUrl(url);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    main()
  }, [])
  return (
    <div className="h-[60vh] flex flex-col bg-zinc-900 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 rounded-md flex-1">
          <Globe className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-400 text-sm">{url && url}</span>
          <span className="text-white text-sm">{port && port}</span>
        </div>
        <button className="p-2 hover:bg-zinc-700 rounded-md transition-colors">
          <RefreshCw className="w-4 h-4 text-zinc-400" />
        </button>
      </div>
      <div className="flex-1 bg-white">
        {/* Preview iframe will be rendered here */}
      </div>
    </div>
  );
};

export default PreviewFrame;
