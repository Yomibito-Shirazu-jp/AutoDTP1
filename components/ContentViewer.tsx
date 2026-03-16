
import React from 'react';

interface ContentViewerProps {
  draftContent: string;
  editedContent: string;
  activeContent: 'draft' | 'edited';
  setActiveContent: (content: 'draft' | 'edited') => void;
  isLoading: boolean;
}

const ContentViewer: React.FC<ContentViewerProps> = ({ draftContent, editedContent, activeContent, setActiveContent, isLoading }) => {
  const contentToShow = activeContent === 'draft' ? draftContent : editedContent;
  const showTabs = draftContent || editedContent;

  return (
    <div className="mt-6 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {showTabs && (
            <div className="bg-gray-800 border-b border-gray-700">
                <nav className="-mb-px flex space-x-4 px-4" aria-label="Tabs">
                    <button
                        onClick={() => setActiveContent('draft')}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                            activeContent === 'draft'
                            ? 'border-cyan-500 text-cyan-400'
                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                        }`}
                    >
                        AI生成ドラフト
                    </button>
                    {editedContent && (
                        <button
                            onClick={() => setActiveContent('edited')}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeContent === 'edited'
                                ? 'border-indigo-500 text-indigo-400'
                                : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                            }`}
                        >
                            AI編集済み
                        </button>
                    )}
                </nav>
            </div>
        )}

      <div className="p-6 h-96 overflow-y-auto prose prose-invert prose-sm max-w-none prose-p:text-gray-300 prose-headings:text-gray-100">
        {isLoading && !contentToShow ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <svg className="animate-spin h-8 w-8 text-gray-400 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <p>AIがコンテンツを生成中...</p>
            </div>
          </div>
        ) : contentToShow ? (
            <pre className="whitespace-pre-wrap font-sans bg-transparent p-0 m-0">{contentToShow}<span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1"></span></pre>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">ここに生成されたコンテンツが表示されます。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentViewer;
