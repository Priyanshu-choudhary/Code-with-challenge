import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Footer2 from '../home/Footer2';

// ─── Difficulty badge ─────────────────────────────────────────────────────────
function DifficultyBadge({ difficulty }) {
  const styles = {
    Easy:   { background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' },
    Medium: { background: '#fef9c3', color: '#854d0e', border: '1px solid #fde68a' },
    Hard:   { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' },
  };
  const s = styles[difficulty] || { background: '#f3f4f6', color: '#6b7280', border: '1px solid #e5e7eb' };
  return (
    <span style={{ ...s, display: 'inline-block', padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>
      {difficulty || 'Unknown'}
    </span>
  );
}

// ─── Accuracy bar ─────────────────────────────────────────────────────────────
function AccuracyBar({ value }) {
  const pct = value != null ? parseFloat(value).toFixed(1) : null;
  if (pct == null) return <span style={{ fontSize: 12, color: '#9ca3af' }}>—</span>;
  const barColor = pct >= 60 ? '#16a34a' : pct >= 40 ? '#d97706' : '#dc2626';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 80 }}>
      <div style={{ flex: 1, height: 4, borderRadius: 4, background: '#e5e7eb', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: 4 }} />
      </div>
      <span style={{ fontSize: 11, color: '#6b7280', width: 36, textAlign: 'right' }}>{pct}%</span>
    </div>
  );
}

// ─── Skeleton row ─────────────────────────────────────────────────────────────
function SkeletonRow() {
  const cell = (w) => (
    <div style={{ height: 14, width: w, borderRadius: 4, background: '#f3f4f6', animation: 'pulse 1.5s ease-in-out infinite' }} />
  );
  return (
    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
      <td style={{ padding: '12px 8px 12px 16px', width: 48 }}>{cell(24)}</td>
      <td style={{ padding: '12px 8px' }}>{cell(200)}</td>
      <td style={{ padding: '12px 8px' }}>{cell(56)}</td>
      <td style={{ padding: '12px 8px' }}>{cell(80)}</td>
      <td style={{ padding: '12px 16px 12px 8px' }}>{cell(40)}</td>
    </tr>
  );
}

// ─── Filter sidebar ───────────────────────────────────────────────────────────
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const TOPICS = ['Arrays','String','Linked Lists','Stacks','Queues','Hash Tables','Trees','Graphs','Heaps','Sorting','Dynamic Programming','Greedy','Recursion','Backtracking','Bit Manipulation','Basic'];
const COMPANIES = ['Google','Amazon','Microsoft','Apple','Facebook','IBM','Oracle','Netflix','Adobe','Salesforce'];

function FilterSection({ label, items, activeItems, onToggle }) {
  const [open, setOpen] = useState(label === 'Difficulty');
  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '8px 12px', borderRadius: 7, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#374151', textAlign: 'left' }}
      >
        {label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div style={{ padding: '4px 8px', display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 4 }}>
          {items.map((item) => {
            const active = activeItems.includes(item);
            return (
              <button
                key={item}
                onClick={() => onToggle(item)}
                style={{
                  padding: '3px 10px', borderRadius: 999, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  border: active ? '1px solid #2563eb' : '1px solid #e5e7eb',
                  background: active ? '#eff6ff' : '#fff',
                  color: active ? '#2563eb' : '#6b7280',
                  transition: 'all 0.1s',
                }}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterSidebar({ filters, onChange }) {
  const toggle = (key, val) => {
    const set = new Set(filters[key]);
    set.has(val) ? set.delete(val) : set.add(val);
    onChange({ ...filters, [key]: [...set] });
  };
  const hasAny = Object.values(filters).some((a) => a.length > 0);

  return (
    <aside style={{ width: 220, flexShrink: 0, borderRight: '1px solid #e5e7eb', background: '#fafafa' }}>
      <div style={{ position: 'sticky', top: 60, padding: '16px 8px', maxHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Filters</span>
          {hasAny && (
            <button
              onClick={() => onChange({ difficulty: [], topics: [], companies: [] })}
              style={{ fontSize: 11, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
            >
              Clear all
            </button>
          )}
        </div>
        <FilterSection label="Difficulty" items={DIFFICULTIES} activeItems={filters.difficulty} onToggle={(v) => toggle('difficulty', v)} />
        <FilterSection label="Topics"     items={TOPICS}       activeItems={filters.topics}     onToggle={(v) => toggle('topics', v)} />
        <FilterSection label="Companies"  items={COMPANIES}    activeItems={filters.companies}  onToggle={(v) => toggle('companies', v)} />
      </div>
    </aside>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Paginator({ page, totalPages, onChange }) {
  const pages = Math.max(1, totalPages - 1);
  const btn = (p, label) => (
    <button
      key={label}
      onClick={() => onChange(p)}
      disabled={p < 1 || p > pages || p === page}
      style={{
        padding: '5px 12px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: p === page ? 'default' : 'pointer',
        background: p === page ? '#2563eb' : '#fff',
        color: p === page ? '#fff' : '#374151',
        border: p === page ? '1px solid #2563eb' : '1px solid #e5e7eb',
        opacity: (p < 1 || p > pages) ? 0.35 : 1,
      }}
    >
      {label}
    </button>
  );

  const visible = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(pages, page + 2); i++) visible.push(i);

  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      {btn(page - 1, '‹')}
      {visible.map((p) => btn(p, String(p)))}
      {btn(page + 1, '›')}
    </div>
  );
}

// ─── Problem row ──────────────────────────────────────────────────────────────
function ProblemRow({ index, problem, role, onNavigate, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const { title, difficulty, accuracy, status, id } = problem;
  return (
    <tr
      onClick={() => onNavigate(problem)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderBottom: '1px solid #f3f4f6', background: hovered ? '#f9fafb' : '#fff', cursor: 'pointer', transition: 'background 0.1s' }}
    >
      <td style={{ padding: '12px 8px 12px 16px', width: 48, fontSize: 13, color: '#9ca3af' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {status === 'Done' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
          {index + 1}
        </span>
      </td>
      <td style={{ padding: '12px 8px', fontSize: 14, fontWeight: 500, color: hovered ? '#2563eb' : '#111827', transition: 'color 0.1s' }}>
        {title}
      </td>
      <td style={{ padding: '12px 8px' }}>
        <DifficultyBadge difficulty={difficulty} />
      </td>
      <td style={{ padding: '12px 8px' }}>
        <AccuracyBar value={accuracy} />
      </td>
      <td style={{ padding: '12px 16px 12px 8px' }}>
        <div style={{ display: 'flex', gap: 6, opacity: hovered ? 1 : 0, transition: 'opacity 0.15s' }} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onNavigate(problem)}
            style={{ padding: '4px 10px', borderRadius: 5, fontSize: 12, fontWeight: 500, color: '#2563eb', background: '#eff6ff', border: '1px solid #bfdbfe', cursor: 'pointer' }}
          >
            Solve
          </button>
          {role === 'ADMIN' && (
            <>
              <button onClick={() => onEdit(id)} style={{ padding: '4px 8px', borderRadius: 5, fontSize: 12, color: '#0891b2', background: '#ecfeff', border: '1px solid #a5f3fc', cursor: 'pointer' }}>Edit</button>
              <button onClick={() => onDelete(id)} style={{ padding: '4px 8px', borderRadius: 5, fontSize: 12, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', cursor: 'pointer' }}>Del</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ProblemSet() {
  const navigate = useNavigate();
  const { role } = useContext(UserContext);

  const [questions,         setQuestions]         = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [page,              setPage]              = useState(1);
  const [totalPages,        setTotalPages]        = useState(10);
  const [loading,           setLoading]           = useState(true);
  const [searchQuery,       setSearchQuery]       = useState('');
  const [filters,           setFilters]           = useState({ difficulty: [], topics: [], companies: [] });

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch(
      `${import.meta.env.VITE_API_URL}/Posts/username/ProblemSet/posts?page=${page - 1}&size=20`,
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    )
      .then((r) => r.json())
      .then((data) => {
        setTotalPages(data.totalPages || 10);
        setQuestions(data.content || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    let list = questions;
    if (filters.difficulty.length) list = list.filter((q) => filters.difficulty.includes(q.difficulty));
    if (filters.topics.length)     list = list.filter((q) => q.tags?.some((t) => filters.topics.includes(t)));
    if (filters.companies.length)  list = list.filter((q) => q.companies?.some((c) => filters.companies.includes(c)));
    if (searchQuery.length >= 2) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.title?.toLowerCase().includes(q) || p.tags?.join(' ').toLowerCase().includes(q));
    }
    setFilteredQuestions(list);
  }, [questions, filters, searchQuery]);

  const navigateToProblem = useCallback((problem) => {
    navigate(`/question/${problem.id}/ProblemSet`, {
      state: { problems: [problem], currentIndex: 0, navHistory: 'no def', currentPage: 'ProblemSet', CourseDescription: '', totalProblems: 0, language: ['java'] },
    });
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this problem?')) return;
    const token = localStorage.getItem('token');
    await fetch(`${import.meta.env.VITE_API_URL}/Posts/id/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleRandom = () => {
    if (!questions.length) return;
    navigateToProblem(questions[Math.floor(Math.random() * questions.length)]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Dashboard />

      <div style={{ display: 'flex', flex: 1 }}>
        <FilterSidebar filters={filters} onChange={setFilters} />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '28px 24px' }}>

            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
              <div>
                <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0 }}>Problems</h1>
                <p style={{ fontSize: 13, color: '#9ca3af', margin: '2px 0 0' }}>
                  {loading ? 'Loading...' : `${filteredQuestions.length} problem${filteredQuestions.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Search */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: 13, color: '#374151', background: 'transparent', width: 160 }}
                  />
                </div>
                {/* Random */}
                <button onClick={handleRandom}
                  style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
                  Random
                </button>
                {/* Admin add */}
                {role === 'ADMIN' && (
                  <button onClick={() => navigate('/UploadQuestion/ProblemSet')}
                    style={{ padding: '7px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#fff', background: '#2563eb', border: 'none', cursor: 'pointer' }}>
                    + Add problem
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f9fafb' }}>
                    {['#', 'Title', 'Difficulty', 'Accuracy', ''].map((h) => (
                      <th key={h} style={{ padding: '10px 8px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', ...(h === '#' ? { paddingLeft: 16, width: 48 } : h === '' ? { paddingRight: 16 } : {}) }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading
                    ? Array.from({ length: 12 }).map((_, i) => <SkeletonRow key={i} />)
                    : filteredQuestions.length === 0
                    ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '56px 16px', textAlign: 'center' }}>
                          <p style={{ fontSize: 14, color: '#9ca3af', margin: 0 }}>No problems match your current filters.</p>
                          <button onClick={() => { setFilters({ difficulty: [], topics: [], companies: [] }); setSearchQuery(''); }}
                            style={{ marginTop: 12, padding: '6px 14px', borderRadius: 7, fontSize: 13, color: '#2563eb', background: '#eff6ff', border: 'none', cursor: 'pointer' }}>
                            Clear filters
                          </button>
                        </td>
                      </tr>
                    )
                    : filteredQuestions.map((q, i) => (
                      <ProblemRow
                        key={q.id}
                        index={i}
                        problem={q}
                        role={role}
                        onNavigate={navigateToProblem}
                        onEdit={(id) => navigate(`/edit/${id}/ProblemSet`)}
                        onDelete={handleDelete}
                      />
                    ))
                  }
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && totalPages > 2 && (
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                <Paginator page={page} totalPages={totalPages} onChange={(p) => { setPage(p); window.scrollTo(0, 0); }} />
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer2 />
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
