'use client';
import React from 'react';
import { Code2, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Steps } from '@/components/builder/steps';
import { CodeEditor } from '@/components/builder/code-editor';
import { Terminal } from '@/components/builder/terminal';
import { FileExplorer } from '@/components/builder/file-explorer';
import PreviewFrame from './preview-frame';

export function BuilderPage({
  webContainer,
  files = [],
  selectedFile = null,
  steps = [],
  currentStep = null,
  onStepClick = () => {},
  setCurrentStep = () => {},
  setSelectedFile = () => {}
}) {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="grid grid-cols-[220px_1fr] gap-4 h-screen">
        {/* Left Sidebar */}
        <div className="space-y-4">
          <Steps
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>

        {/* Main Content */}
        <div className="space-y-4">
          <Tabs defaultValue="code">
            <TabsList>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Code
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <div className="grid grid-cols-[200px_1fr] gap-4">
                <FileExplorer 
                  files={files} 
                  onFileSelect={setSelectedFile}
                />
                {selectedFile ? (
                  <CodeEditor file={selectedFile} />
                ) : (
                  <div className="text-gray-500">Select a file to edit</div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <div className="h-[60vh] bg-white rounded-lg">
                <PreviewFrame files={files} webContainer={webContainer} />
              </div>
            </TabsContent>
          </Tabs>

          {/* Terminal */}
          <Terminal />
        </div>
      </div>
    </div>
  );
}
