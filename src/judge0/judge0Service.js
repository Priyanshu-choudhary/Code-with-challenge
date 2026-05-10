const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090';

// Language name → Judge0 language ID
export const LANGUAGE_IDS = {
  java:       62,
  python3:    71,
  python2:    70,
  python:     71,
  c:          50,
  cpp:        54,
  javascript: 63,
  nodejs:     63,
  typescript: 74,
  kotlin:     78,
  rust:       73,
  php:        68,
  bash:       46,
  sh:         46,
  scala:      81,
};

// Judge0 status ID → label + color for UI
export const VERDICT = {
  1:  { label: 'In Queue',            color: '#6366f1' },
  2:  { label: 'Processing',          color: '#6366f1' },
  3:  { label: 'Accepted',            color: '#22c55e' },
  4:  { label: 'Wrong Answer',        color: '#ef4444' },
  5:  { label: 'Time Limit Exceeded', color: '#f59e0b' },
  6:  { label: 'Compilation Error',   color: '#f97316' },
  7:  { label: 'Runtime Error',       color: '#ef4444' },
  8:  { label: 'Runtime Error',       color: '#ef4444' },
  9:  { label: 'Runtime Error',       color: '#ef4444' },
  10: { label: 'Runtime Error',       color: '#ef4444' },
  11: { label: 'Runtime Error',       color: '#ef4444' },
  12: { label: 'Runtime Error',       color: '#ef4444' },
  13: { label: 'Internal Error',      color: '#94a3b8' },
  14: { label: 'Exec Format Error',   color: '#94a3b8' },
};

/**
 * Run code freely (playground — no test case comparison).
 * POST /judge/run  — no login required.
 * Returns: { stdout, stderr, compile_output, statusDescription, statusId, time, memory }
 */
export async function runCode(sourceCode, language, stdin = '') {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/judge/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ sourceCode, language, stdin }),
  });
  if (!res.ok) throw new Error(`Run failed: ${res.status}`);
  return res.json();
}

/**
 * Submit code against problem test cases.
 * POST /judge/submit  — requires login (JWT).
 * Returns: { allPassed, totalTestCases, passedCount, results: [...] }
 */
export async function submitCode(sourceCode, language, testCases, timeLimitSeconds, memoryLimitKb) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${BASE_URL}/judge/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sourceCode, language, testCases, timeLimitSeconds, memoryLimitKb }),
  });
  if (!res.ok) throw new Error(`Submit failed: ${res.status}`);
  return res.json();
}
