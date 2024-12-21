'use client'
import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
}

const steps: Step[] = [
  { id: 1, title: 'Initialize Project', status: 'completed' },
  { id: 2, title: 'Install Dependencies', status: 'current' },
  { id: 3, title: 'Configure Settings', status: 'pending' },
  { id: 4, title: 'Build Project', status: 'pending' }
];

export function Steps() {
  return (
    <div className="p-4 bg-zinc-900/50 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Build Steps</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center gap-3">
            {step.status === 'completed' ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className={`w-5 h-5 ${
                step.status === 'current' ? 'text-blue-500' : 'text-zinc-600'
              }`} />
            )}
            <span className={`${
              step.status === 'pending' ? 'text-zinc-500' : 'text-white'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}