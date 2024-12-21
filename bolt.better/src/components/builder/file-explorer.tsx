import React, { useState } from 'react';
import { FileExplorerItem } from '@/components/builder/file-explorer-item';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
}

const initialFiles: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        children: [
          { id: '3', name: 'App.tsx', type: 'file' },
          { id: '4', name: 'index.ts', type: 'file' },
        ],
      },
      { id: '5', name: 'main.tsx', type: 'file' },
    ],
  },
  {
    id: '6',
    name: 'public',
    type: 'folder',
    children: [
      { id: '7', name: 'favicon.ico', type: 'file' },
    ],
  },
];

export function FileExplorer() {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(['1']));
  const [activeFile, setActiveFile] = useState<string | null>(null);

  const toggleFolder = (id: string) => {
    const newOpenFolders = new Set(openFolders);
    if (newOpenFolders.has(id)) {
      newOpenFolders.delete(id);
    } else {
      newOpenFolders.add(id);
    }
    setOpenFolders(newOpenFolders);
  };

  const renderTree = (nodes: FileNode[], level: number = 0) => {
    return nodes.map((node) => (
      <React.Fragment key={node.id}>
        <FileExplorerItem
          name={node.name}
          type={node.type}
          level={level}
          isOpen={node.type === 'folder' && openFolders.has(node.id)}
          isActive={node.type === 'file' && activeFile === node.id}
          onToggle={() => toggleFolder(node.id)}
          onClick={() => node.type === 'file' && setActiveFile(node.id)}
        />
        {node.type === 'folder' &&
          openFolders.has(node.id) &&
          node.children &&
          renderTree(node.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="h-[60vh] bg-zinc-900/50 rounded-lg overflow-y-auto">
      <div className="p-2">
        <h3 className="text-sm font-medium text-zinc-400 px-2 mb-2">Files</h3>
        {renderTree(initialFiles)}
      </div>
    </div>
  );
}