import React from 'react';
import Editor from '@monaco-editor/react';


const SampleData = `// Welcome to Bolt Code Editor
function greeting() {
  console.log("Hello from Bolt!");
}`;
export function CodeEditor() {
  // if (!file) {
  //   return (
  //     <div className="h-full flex items-center justify-center text-gray-400">
  //       Select a file to view its contents
  //     </div>
  //   );
  // }

  return (
    <Editor
      height="100%"
      defaultLanguage="typescript"
      theme="vs-dark"
      value={SampleData}
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
      }}
    />
  );
}