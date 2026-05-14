import '@testing-library/jest-dom';

// Mock import.meta.env for tests
if (!globalThis.importMeta) {
  globalThis.importMeta = { env: {} };
}
Object.defineProperty(globalThis, 'import', {
  value: { meta: { env: { VITE_API_URL: 'http://localhost:9090' } } },
  writable: true,
  configurable: true,
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem:     (k) => store[k] ?? null,
    setItem:     (k, v) => { store[k] = String(v); },
    removeItem:  (k) => { delete store[k]; },
    clear:       ()    => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Silence non-critical console errors during tests
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Warning:')) return;
  originalError(...args);
};
