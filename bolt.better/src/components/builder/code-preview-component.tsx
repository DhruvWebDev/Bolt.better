'use client'
import React from 'react';
import { Code2, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Steps } from '@/components/builder/steps';
import { CodeEditor } from '@/components/builder/code-editor';
import { Terminal } from '@/components/builder/terminal';
import { FileExplorer } from '@/components/builder/file-explorer';

export function BuilderPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="grid grid-cols-[220px_1fr] gap-4 h-screen">
        {/* Left Sidebar */}
        <div className="space-y-4">
          <Steps />
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
                <FileExplorer />
                <CodeEditor />
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <div className="h-[60vh] bg-white rounded-lg">
                {/* Preview iframe will go here */}
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