'use client'
import React from 'react';
import { CheckCircle, CheckCircle2, Circle, Clock } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'pending';
}


export function Steps({steps, currentStep, onStepClick} : {steps: Step[], currentStep: number, onStepClick: (step: Step) => void}) {
  return (
    <div className="p-4 bg-zinc-900/50 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Build Steps</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id}   onClick={() => onStepClick(step.id)} className="flex items-center gap-3">
             {step.status === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : step.status === 'in-progress' ? (
                <Clock className="w-5 h-5 text-blue-400" />
              ) : (
                <Circle className="w-5 h-5 text-gray-600" />
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