
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { WorkflowStep, WorkflowStatus, ChecklistItem } from '../types';
import { INITIAL_WORKFLOW_STEPS, ICONS } from '../constants';
import { generateDraft, editContent } from '../services/geminiService';
import WorkflowStepCard from './WorkflowStepCard';
import FileUploader from './FileUploader';
import ContentViewer from './ContentViewer';
import Checklist from './Checklist';

const ProjectDashboard: React.FC = () => {
    const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(INITIAL_WORKFLOW_STEPS);
    const [instructions, setInstructions] = useState<string>('再生可能エネルギーに関する企業の年次報告書の冒頭部分を作成。力強く、未来志向のトーンで。');
    const [draftContent, setDraftContent] = useState<string>('');
    const [editedContent, setEditedContent] = useState<string>('');
    const [activeContent, setActiveContent] = useState<'draft' | 'edited'>('draft');
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    const [error, setError] = useState<string | null>(null);
    const [checklist, setChecklist] = useState<ChecklistItem[]>([
      { id: 1, text: '原稿ドラフト生成済', completed: false },
      { id: 2, text: '句読点・文体統一済', completed: false },
      { id: 3, text: '社名表記等、用語統一済', completed: false },
      { id: 4, text: '差し替え反映済', completed: false },
      { id: 5, text: '校正用PDF出力完了', completed: false },
    ]);
    const abortControllerRef = useRef<AbortController | null>(null);


    const updateStepStatus = useCallback((stepId: string, status: WorkflowStatus) => {
        setWorkflowSteps(prevSteps =>
            prevSteps.map(step => (step.id === stepId ? { ...step, status } : step))
        );
    }, []);

    const updateChecklistItem = useCallback((id: number, completed: boolean) => {
        setChecklist(prev => prev.map(item => item.id === id ? {...item, completed} : item));
    }, []);

    const handleGenerateDraft = useCallback(async () => {
        if (!instructions.trim()) {
            setError('指示内容を入力してください。');
            return;
        }
        setError(null);
        setIsLoading(prev => ({...prev, A: true}));
        updateStepStatus('A', WorkflowStatus.IN_PROGRESS);
        setDraftContent('');
        setEditedContent('');
        setActiveContent('draft');
        updateChecklistItem(1, false);

        abortControllerRef.current = new AbortController();

        try {
            const stream = await generateDraft(instructions);
            for await (const chunk of stream) {
                 if (abortControllerRef.current.signal.aborted) break;
                setDraftContent(prev => prev + chunk.text);
            }
            updateStepStatus('A', WorkflowStatus.COMPLETED);
            updateChecklistItem(1, true);

        } catch (e) {
            const err = e as Error;
            setError(err.message);
            updateStepStatus('A', WorkflowStatus.ERROR);
        } finally {
            setIsLoading(prev => ({...prev, A: false}));
        }
    }, [instructions, updateStepStatus, updateChecklistItem]);
    
    const handleEditContent = useCallback(async () => {
        if (!draftContent.trim()) {
            setError('編集するドラフトがありません。');
            return;
        }
        setError(null);
        setIsLoading(prev => ({...prev, B: true}));
        updateStepStatus('B', WorkflowStatus.IN_PROGRESS);
        setEditedContent('');
        setActiveContent('edited');
        updateChecklistItem(2, false);

        abortControllerRef.current = new AbortController();

        try {
            const stream = await editContent(draftContent);
            for await (const chunk of stream) {
                if (abortControllerRef.current.signal.aborted) break;
                setEditedContent(prev => prev + chunk.text);
            }
            updateStepStatus('B', WorkflowStatus.COMPLETED);
            updateChecklistItem(2, true);
        } catch (e) {
            const err = e as Error;
            setError(err.message);
            updateStepStatus('B', WorkflowStatus.ERROR);
        } finally {
            setIsLoading(prev => ({...prev, B: false}));
        }
    }, [draftContent, updateStepStatus, updateChecklistItem]);

    const handleStopGeneration = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };
    
    useEffect(() => {
      // Cleanup on unmount
      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      };
    }, []);

    const canEdit = workflowSteps.find(s => s.id === 'A')?.status === WorkflowStatus.COMPLETED;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Workflow Steps */}
            <div className="lg:col-span-4 space-y-4">
                <h2 className="text-2xl font-semibold text-white mb-4">DTP Workflow</h2>
                {workflowSteps.map(step => (
                    <WorkflowStepCard key={step.id} step={step} />
                ))}
            </div>

            {/* Middle Column: Main Content */}
            <div className="lg:col-span-5">
                <div className="bg-gray-800 rounded-lg p-6 space-y-6 shadow-lg">
                    <h3 className="text-lg font-bold text-cyan-400">Step 1: 原稿作成指示</h3>
                    <p className="text-sm text-gray-400">
                        AIに生成させたい原稿の要件（テーマ、文体、キーワード等）を具体的に入力してください。
                    </p>
                    <textarea
                        className="w-full h-32 bg-gray-900 border border-gray-700 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 resize-none"
                        value={instructions}
                        onChange={e => setInstructions(e.target.value)}
                        placeholder="例: 文唱堂印刷株式会社の次期製品カタログの序文。革新性と伝統の融合をテーマに..."
                    />
                    <FileUploader />
                     <div className="flex space-x-2">
                        <button
                            onClick={handleGenerateDraft}
                            disabled={isLoading['A']}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                        >
                           {isLoading['A'] ? ICONS.spinner : ICONS.sparkles}
                           {isLoading['A'] ? '生成中...' : '原稿を生成 (A)'}
                        </button>
                        <button
                            onClick={handleEditContent}
                            disabled={!canEdit || isLoading['B']}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading['B'] ? ICONS.spinner : ICONS.pencil}
                            {isLoading['B'] ? '編集中...' : 'AI校正・編集 (B)'}
                        </button>
                    </div>
                     {(isLoading['A'] || isLoading['B']) && (
                        <button onClick={handleStopGeneration} className="w-full mt-2 text-sm text-red-400 hover:text-red-300">
                           処理を停止
                        </button>
                    )}
                </div>
                {error && <div className="mt-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-md text-sm">{error}</div>}
                
                <ContentViewer
                    draftContent={draftContent}
                    editedContent={editedContent}
                    activeContent={activeContent}
                    setActiveContent={setActiveContent}
                    isLoading={isLoading['A'] || isLoading['B']}
                />
            </div>

            {/* Right Column: Checklist & Outputs */}
            <div className="lg:col-span-3 space-y-6">
                <Checklist items={checklist} />
                 <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-bold text-cyan-400 mb-4">Step 5: 出力</h3>
                    <div className="space-y-3">
                        <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-colors">{ICONS.download} PDF/X-1a (印刷用)</button>
                        <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-colors">{ICONS.download} PDF (校正用)</button>
                        <button className="w-full inline-flex items-center justify-center px-3 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-900 transition-colors">{ICONS.download} IDML (InDesign)</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDashboard;
