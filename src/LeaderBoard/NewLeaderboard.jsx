import React, { useEffect, useState, useContext } from 'react';
import Dashboard from '../dashBoard/Dashboard';
import { UserContext } from '../Context/UserContext';
import Footer2 from '../home/Footer2';

// ─── Medal colors for top 3 ───────────────────────────────────────────────────
const MEDAL = ['#f59e0b', '#9ca3af', '#cd7c2f'];
const MEDAL_BG = ['#fffbeb', '#f9fafb', '#fef3e2'];
const MEDAL_BORDER = ['#fde68a', '#e5e7eb', '#fcd9a6'];

function MedalIcon({ rank }) {
  if (rank > 3) return null;
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={MEDAL[rank - 1]} stroke="none">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
}

// ─── Top-3 podium cards ───────────────────────────────────────────────────────
function PodiumCard({ user, rank, globalRank }) {
  const initial = user.name ? user.name[0].toUpperCase() : '?';
  return (
    <div style={{
      background: MEDAL_BG[rank - 1], border: `1px solid ${MEDAL_BORDER[rank - 1]}`,
      borderRadius: 12, padding: '20px 16px', textAlign: 'center',
      flex: 1, minWidth: 140,
    }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: MEDAL[rank - 1], color: '#fff', fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
        {initial}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 4 }}>
        <MedalIcon rank={rank} />
        <span style={{ fontSize: 11, fontWeight: 700, color: MEDAL[rank - 1] }}>#{globalRank}</span>
      </div>
      <p style={{ fontSize: 14, fontWeight: 600, color: '#111827', margin: '0 0 2px' }}>{user.name}</p>
      <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{user.postCount} solved · {user.rating ?? 0}r</p>
    </div>
  );
}

// ─── Main leaderboard ─────────────────────────────────────────────────────────
function NewLeaderboard() {
  const [users,      setUsers]      = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [page,       setPage]       = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { role } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/Public/getAllUsers?page=${page - 1}&size=20`)
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.content || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  const deleteUser = (id) => {
    if (!window.confirm('Delete this user?')) return;
    fetch(`${import.meta.env.VITE_API_URL}/Public/user/id/${id}`, { method: 'DELETE' })
      .then((r) => { if (r.ok) setUsers((prev) => prev.filter((u) => u.id !== id)); })
      .catch(() => {});
  };

  const globalOffset = (page - 1) * 20;
  const top3 = page === 1 ? users.slice(0, 3) : [];
  const tableRows = page === 1 ? users.slice(3) : users;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      <Dashboard />

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '28px 24px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Leaderboard</h1>
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>Top performers ranked by problems solved and rating.</p>
        </div>
      </div>

      <div style={{ flex: 1, maxWidth: 860, margin: '0 auto', width: '100%', padding: '24px', boxSizing: 'border-box' }}>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{ width: 32, height: 32, border: '3px solid #e5e7eb', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
          </div>
        ) : (
          <>
            {/* Top 3 podium */}
            {top3.length === 3 && (
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                {[top3[1], top3[0], top3[2]].map((u, i) => {
                  const rank = i === 1 ? 1 : i === 0 ? 2 : 3;
                  return <PodiumCard key={u.id} user={u} rank={rank} globalRank={rank} />;
                })}
              </div>
            )}

            {/* Table */}
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    {['Rank', 'User', 'Solved', 'Rating', ...(role === 'ADMIN' ? [''] : [])].map((h) => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((user, idx) => {
                    const rank = idx + (page === 1 ? 4 : 1) + globalOffset;
                    const initial = user.name ? user.name[0].toUpperCase() : '?';
                    return (
                      <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f9fafb'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                        <td style={{ padding: '11px 16px', fontSize: 14, color: '#9ca3af', fontWeight: 500, width: 60 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <MedalIcon rank={rank} />
                            {rank}
                          </div>
                        </td>
                        <td style={{ padding: '11px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eff6ff', color: '#2563eb', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              {initial}
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 500, color: '#111827' }}>{user.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '11px 16px', fontSize: 14, color: '#374151', fontWeight: 600 }}>{user.postCount}</td>
                        <td style={{ padding: '11px 16px', fontSize: 14, color: '#6b7280' }}>{user.rating ?? '—'}</td>
                        {role === 'ADMIN' && (
                          <td style={{ padding: '11px 16px' }}>
                            <button
                              onClick={() => deleteUser(user.id)}
                              style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', cursor: 'pointer' }}
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
                <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 13, fontWeight: 500, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.4 : 1 }}>
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
                  return (
                    <button key={p} onClick={() => setPage(p)}
                      style={{ padding: '6px 12px', borderRadius: 7, fontSize: 13, fontWeight: 500, background: p === page ? '#2563eb' : '#fff', color: p === page ? '#fff' : '#374151', border: p === page ? '1px solid #2563eb' : '1px solid #e5e7eb', cursor: 'pointer' }}>
                      {p}
                    </button>
                  );
                })}
                <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 13, fontWeight: 500, color: '#374151', background: '#fff', border: '1px solid #e5e7eb', cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.4 : 1 }}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer2 />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default NewLeaderboard;
