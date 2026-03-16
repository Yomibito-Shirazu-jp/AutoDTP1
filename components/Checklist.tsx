
import React from 'react';
import { ChecklistItem } from '../types';

interface ChecklistProps {
  items: ChecklistItem[];
}

const Checklist: React.FC<ChecklistProps> = ({ items }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">チェックリスト</h3>
      <ul className="space-y-3">
        {items.map(item => (
          <li key={item.id} className="flex items-center text-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${item.completed ? 'bg-green-500' : 'bg-gray-700 border border-gray-600'}`}>
              {item.completed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`${item.completed ? 'text-gray-400 line-through' : 'text-gray-200'}`}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
