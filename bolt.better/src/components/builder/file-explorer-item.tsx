'use client'
import React from 'react';
import { ChevronRight, File, Folder } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileExplorerItemProps {
  name: string;
  type: 'file' | 'folder';
  level: number;
  isOpen?: boolean;
  isActive?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
}

export function FileExplorerItem({
  name,
  type,
  level,
  isOpen,
  isActive,
  onToggle,
  onClick,
}: FileExplorerItemProps) {
  return (
    <div
      className={cn(
        'flex items-center py-1 px-2 hover:bg-zinc-800/50 cursor-pointer text-sm',
        isActive && 'bg-zinc-800 text-white',
        !isActive && 'text-zinc-400'
      )}
      style={{ paddingLeft: `${level * 12 + 8}px` }}
      onClick={onClick}
    >
      {type === 'folder' && (
        <ChevronRight
          className={cn(
            'h-4 w-4 mr-1 transition-transform',
            isOpen && 'rotate-90'
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
        />
      )}
      {type === 'file' && <File className="h-4 w-4 mr-1" />}
      {type === 'folder' && <Folder className="h-4 w-4 mr-1" />}
      <span className="truncate">{name}</span>
    </div>
  );
}