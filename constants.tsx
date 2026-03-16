
import React from 'react';
import { WorkflowStep, WorkflowStatus } from './types';

export const INITIAL_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'A',
    title: 'A. 原稿作成AI (Drafting AI)',
    description: '指示書から新規原稿を生成',
    status: WorkflowStatus.PENDING,
    longDescription: '手書き・PDF・メール文から要件を抽出し、過去の原稿や仕様書を参考に、タイトル、本文、図版説明などを構造化した下書き原稿を生成します。'
  },
  {
    id: 'B',
    title: 'B. 原稿編集AI (Editing AI)',
    description: '文体統一・要約・誤字修正',
    status: WorkflowStatus.PENDING,
    longDescription: '文体統一、敬語変換、語尾整形、誤字脱字の検出、社内・業界用語の統一を行い、Markdown形式に整形します。'
  },
  {
    id: 'C',
    title: 'C. 差し替えAI (Replacement AI)',
    description: '修正指示を自動抽出し再組版',
    status: WorkflowStatus.PENDING,
    longDescription: '改訂原稿や指示書を自動比較し、Markdown単位で内容を置換・再生成します。競合箇所は手動承認のためにリスト化します。'
  },
  {
    id: 'D',
    title: 'D. DTP処理AI (Processing AI)',
    description: 'レイアウト・体裁・画像配置',
    status: WorkflowStatus.PENDING,
    longDescription: '段組、余白、禁則処理をAIが補正し、文脈を分析して最適な画像位置を決定します。スタイルマップを元に自動で体裁を適用します。'
  },
  {
    id: 'E',
    title: 'E. 出力AI (Export AI)',
    description: '各種形式でファイルを出力',
    status: WorkflowStatus.PENDING,
    longDescription: '印刷用のPDF/X-1a、校正用PDF、InDesign用IDML、Webプレビュー用HTML、Git連携用Markdownなど、多様な形式でファイルを出力します。'
  },
];

export const ICONS = {
  upload: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>,
  sparkles: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  pencil: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>,
  replace: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 12L3 8m4 8l4-8m11 4h-5m5 0l-2-2m2 2l-2 4M4 16h16" /></svg>,
  layout: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  download: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  info: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>,
  spinner: <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>,
};
