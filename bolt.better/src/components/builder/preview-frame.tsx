'use client'
import { WebContainer } from '@webcontainer/api';
import React, { useState, useEffect } from 'react';

/**
 * First, install dependencies (npm i).
 * Then, run the code (npm run dev).
 * Wait for the `server-ready` event.
 * Finally, setUrl(url) and showcase the website to the user by embedding the URL in an iframe.
 */
const PreviewFrame = () => {
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function main() {
      try {
        const installProcess = await WebContainer.spawn('npm', ['install']);
        console.log('Dependencies installed:', installProcess);

        const runProcess = await WebContainer.spawn('npm', ['run', 'dev']);
        console.log('Development server started:', runProcess);

        WebContainer.on('server-ready', (port, readyUrl) => {
          console.log('Server is ready on port:', port);
          console.log('Preview URL:', readyUrl);
          setUrl(readyUrl);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error setting up the web container:', error);
        setIsLoading(false);
      }
    }

    main();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Preview</h2>
      {isLoading ? (
        <p>Loading the preview... Please wait.</p>
      ) : url ? (
        <iframe
          src={url}
          style={{
            width: '100%',
            height: '500px',
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
          title="Website Preview"
        />
      ) : (
        <p>Failed to load the preview. Please check the console for details.</p>
      )}
    </div>
  );
};

export default PreviewFrame;
