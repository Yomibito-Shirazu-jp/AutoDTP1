
import React from 'react';
import { WorkflowStep, WorkflowStatus } from '../types';
import { ICONS } from '../constants';

interface WorkflowStepCardProps {
  step: WorkflowStep;
}

const statusStyles = {
  [WorkflowStatus.PENDING]: {
    bg: 'bg-gray-700/50',
    text: 'text-gray-400',
    border: 'border-gray-600',
    icon: <div className="h-2.5 w-2.5 rounded-full bg-gray-500 mr-2"></div>,
  },
  [WorkflowStatus.IN_PROGRESS]: {
    bg: 'bg-blue-900/50',
    text: 'text-blue-300',
    border: 'border-blue-500',
    icon: <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse mr-2"></div>,
  },
  [WorkflowStatus.COMPLETED]: {
    bg: 'bg-green-900/50',
    text: 'text-green-300',
    border: 'border-green-500',
    icon: <svg className="h-4 w-4 text-green-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
  },
  [WorkflowStatus.ERROR]: {
    bg: 'bg-red-900/50',
    text: 'text-red-300',
    border: 'border-red-500',
    icon: <svg className="h-4 w-4 text-red-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
  },
};

const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({ step }) => {
    const styles = statusStyles[step.status];
    
    return (
        <div className={`border-l-4 p-4 rounded-r-lg transition-all duration-300 ${styles.bg} ${styles.border}`}>
            <div className="flex justify-between items-center">
                <h4 className="font-bold text-white">{step.title}</h4>
                <div className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full ${styles.text}`}>
                    {styles.icon}
                    {step.status}
                </div>
            </div>
            <p className="text-sm text-gray-400 mt-1">{step.description}</p>
            <details className="mt-2 group">
                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300">詳細...</summary>
                <p className="text-xs text-gray-400 mt-2 p-3 bg-black/20 rounded-md">{step.longDescription}</p>
            </details>
        </div>
    );
};

export default WorkflowStepCard;
