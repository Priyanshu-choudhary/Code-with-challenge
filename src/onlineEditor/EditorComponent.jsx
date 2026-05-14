import React, { useEffect, useState, useCallback, useContext } from 'react';
import Editor from '@monaco-editor/react';
import './EditorComponent.css';
import Dashboard from '../dashBoard/Dashboard';
import { runCode as judge0Run } from '../judge0/judge0Service';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from '../Context/UserContext';

const LANGUAGES = [
  { label: 'Java',       value: 'java' },
  { label: 'C',          value: 'c' },
  { label: 'C++',        value: 'cpp' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python 3',   value: 'python3' },
  { label: 'Python 2',   value: 'python2' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'PHP',        value: 'php' },
  { label: 'Kotlin',     value: 'kotlin' },
  { label: 'Rust',       value: 'rust' },
  { label: 'Bash',       value: 'bash' },
];

const EDITOR_THEMES = [
  { label: 'Dark',  value: 'vs-dark' },
  { label: 'Light', value: 'light' },
  { label: 'High contrast', value: 'hc-black' },
];

const DEFAULT_CODE = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  python3: `# Python 3
print("Hello, World!")`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  javascript: `// JavaScript
console.log("Hello, World!");`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
};

const RunIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const EditorComponent = ({ initialValue }) => {
  const [language, setLanguage]       = useState('java');
  const [editorLang, setEditorLang]   = useState('java');
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [code, setCode]               = useState(initialValue || DEFAULT_CODE['java']);
  const [input, setInput]             = useState('');
  const [output, setOutput]           = useState(null);
  const [running, setRunning]         = useState(false);
  const [activeTab, setActiveTab]     = useState('output'); // 'output' | 'input'
  const [langOpen, setLangOpen]       = useState(false);
  const langRef = React.useRef(null);

  // Sync editor language (Python variants map to 'python')
  useEffect(() => {
    const mono = language.startsWith('python') ? 'python' : language;
    setEditorLang(mono);
  }, [language]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
    setLangOpen(false);
    if (!initialValue) {
      setCode(DEFAULT_CODE[lang] || '// Start coding...');
    }
  }, [initialValue]);

  const runCode = async () => {
    setRunning(true);
    setOutput(null);
    setActiveTab('output');
    try {
      const result = await judge0Run(code, language, input);
      setOutput(result);
    } catch (e) {
      setOutput({ stderr: e.message });
    } finally {
      setRunning(false);
    }
  };

  const clearAll = () => { setOutput(null); setInput(''); };

  const currentLang = LANGUAGES.find((l) => l.value === language) || LANGUAGES[0];
  const hasError    = output?.stderr || output?.compile_output;
  const outputText  = hasError
    ? (output.compile_output || '') + (output.stderr || '')
    : (output?.stdout || '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#1e1e2e', overflow: 'hidden' }}>
      {!initialValue && <Dashboard />}

      {/* ── Main toolbar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px',
        height: 46, background: '#16161f', borderBottom: '1px solid #2d2d3d',
        flexShrink: 0,
      }}>
        {/* File tab */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 5, background: '#1e1e2e', border: '1px solid #3d3d55', fontSize: 13, color: '#c9d1d9' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          Main.{currentLang.value === 'javascript' ? 'js' : currentLang.value === 'typescript' ? 'ts' : currentLang.value.startsWith('python') ? 'py' : currentLang.value === 'cpp' ? 'cpp' : currentLang.value}
        </div>

        <div style={{ flex: 1 }} />

        {/* Language selector */}
        <div ref={langRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setLangOpen((o) => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px',
              borderRadius: 6, background: '#2d2d3d', border: '1px solid #3d3d55',
              color: '#c9d1d9', fontSize: 13, cursor: 'pointer',
            }}
          >
            {currentLang.label}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {langOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', right: 0, width: 160,
              background: '#1e1e2e', border: '1px solid #3d3d55', borderRadius: 8,
              overflow: 'hidden', zIndex: 50,
            }}>
              {LANGUAGES.map((l) => (
                <button
                  key={l.value}
                  onClick={() => handleLanguageChange(l.value)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '8px 14px', fontSize: 13, cursor: 'pointer',
                    color: l.value === language ? '#60a5fa' : '#c9d1d9',
                    background: l.value === language ? '#2563eb22' : 'transparent',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => { if (l.value !== language) e.currentTarget.style.background = '#2d2d3d'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = l.value === language ? '#2563eb22' : 'transparent'; }}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Editor theme */}
        <select
          value={editorTheme}
          onChange={(e) => setEditorTheme(e.target.value)}
          style={{
            padding: '5px 10px', borderRadius: 6, background: '#2d2d3d',
            border: '1px solid #3d3d55', color: '#c9d1d9', fontSize: 13, cursor: 'pointer',
          }}
        >
          {EDITOR_THEMES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        {/* Run */}
        <button
          onClick={runCode}
          disabled={running}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
            color: '#fff', background: running ? '#1d4ed8' : '#2563eb',
            border: 'none', cursor: running ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {running ? <Spinner animation="border" size="sm" style={{ width: 14, height: 14 }} /> : <RunIcon />}
          {running ? 'Running...' : 'Run'}
          {!running && <span style={{ fontSize: 11, color: '#93c5fd', marginLeft: 2 }}>Ctrl+Enter</span>}
        </button>
      </div>

      {/* ── Editor + Output panel ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Editor */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Editor
            height="100%"
            language={editorLang}
            value={code}
            theme={editorTheme}
            onChange={(v) => setCode(v || '')}
            options={{
              minimap: { enabled: true, scale: 0.7 },
              fontSize: 14,
              lineHeight: 22,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              fontLigatures: true,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              renderLineHighlight: 'line',
              cursorBlinking: 'smooth',
              smoothScrolling: true,
              padding: { top: 12 },
            }}
          />
        </div>

        {/* Output / Input panel */}
        <div style={{ width: 340, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#16161f', borderLeft: '1px solid #2d2d3d' }}>
          {/* Panel tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #2d2d3d', flexShrink: 0 }}>
            {['output', 'input'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: '10px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  background: 'transparent', border: 'none',
                  color: activeTab === tab ? '#60a5fa' : '#6b7280',
                  borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                  textTransform: 'capitalize',
                  transition: 'color 0.1s',
                }}
              >
                {tab}
              </button>
            ))}
            <button
              onClick={clearAll}
              style={{ padding: '10px 12px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280', fontSize: 11 }}
            >
              Clear
            </button>
          </div>

          {/* Output tab */}
          {activeTab === 'output' && (
            <div style={{ flex: 1, overflow: 'auto', padding: 14 }}>
              {output === null && !running && (
                <p style={{ fontSize: 13, color: '#4b5563', textAlign: 'center', marginTop: 40 }}>
                  Run your code to see output here.
                </p>
              )}
              {running && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 0', color: '#6b7280', fontSize: 13 }}>
                  <Spinner animation="border" size="sm" style={{ width: 14, height: 14 }} />
                  Executing...
                </div>
              )}
              {output && (
                <>
                  {/* Status badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: hasError ? '#dc2626' : '#16a34a' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: hasError ? '#f87171' : '#4ade80' }}>
                      {hasError ? 'Error' : 'Success'}
                    </span>
                    {output.time && (
                      <span style={{ marginLeft: 'auto', fontSize: 11, color: '#6b7280' }}>
                        {output.time}s · {output.memory} KB
                      </span>
                    )}
                  </div>
                  <pre style={{
                    margin: 0, fontSize: 12, fontFamily: "'JetBrains Mono', monospace",
                    color: hasError ? '#f87171' : '#e2e8f0',
                    background: hasError ? '#1a0808' : '#0d1117',
                    padding: '12px', borderRadius: 6, overflow: 'auto',
                    border: `1px solid ${hasError ? '#450a0a' : '#1d2432'}`,
                    whiteSpace: 'pre-wrap', wordBreak: 'break-all',
                  }}>
                    {outputText || '(no output)'}
                  </pre>
                </>
              )}
            </div>
          )}

          {/* Input tab */}
          {activeTab === 'input' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 14 }}>
              <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 8px' }}>Standard input (stdin)</p>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input for your program..."
                style={{
                  flex: 1, resize: 'none', background: '#0d1117', border: '1px solid #2d2d3d',
                  borderRadius: 6, padding: 10, fontSize: 13, color: '#e2e8f0',
                  fontFamily: "'JetBrains Mono', monospace", outline: 'none',
                }}
                onFocus={(e) => { e.target.style.borderColor = '#2563eb'; }}
                onBlur={(e)  => { e.target.style.borderColor = '#2d2d3d'; }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Keyboard shortcut handler */}
      <style>{`
        .editor-container { display: contents; }
      `}</style>
    </div>
  );
};

export default React.memo(EditorComponent);
