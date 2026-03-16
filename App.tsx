
import React from 'react';
import ProjectDashboard from './components/ProjectDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold text-cyan-400">AI DTP Operator: DTP-Assist v1</h1>
            <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-green-400">System Online</span>
            </div>
        </div>
      </header>
      <main className="p-4 md:p-8">
        <div className="container mx-auto">
          <ProjectDashboard />
        </div>
      </main>
      <footer className="text-center p-4 text-xs text-gray-500 border-t border-gray-800 mt-8">
        <p>AI DTP Operator: DTP-Assist v1 | Powered by Gemini API</p>
      </footer>
    </div>
  );
}

export default App;
