// States Explorer React App
const { useState, useEffect } = React;

// fallback states in case API fails
const sampleStates = [
  { name: 'Karnataka', image: 'https://images.unsplash.com/photo-1504275107627-2aaab6a08a0f?q=80&w=1400', intro: 'Karnataka blends historic palaces, ancient temples, bustling cities, and green hill stations.', culture: 'Known for Carnatic music, Yakshagana, and rich Kannada cuisine.' },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400', intro: 'Goa is known for beaches, colonial architecture, and lively culture.', culture: 'Coastal cuisine, Portuguese-influenced heritage, and festivals.' },
  { name: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1400', intro: 'UP is rich in history, temples and Mughal architecture.', culture: 'Lively traditions, Hindustani music and Mughlai cuisine.' }
];

function StateCard({ st, onView }) {
  const mainImage = (st.images && st.images[0]) || st.image || '/images/img1.png';
  return (
    <div className="grid-item state-card" role="article" aria-label={st.name}>
      <div className="destination-image-wrap">
        <img src={mainImage} alt={st.name} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = '/images/img1.png'; }} />
      </div>
      <h3>{st.name}</h3>
      <p className="dest-short">{st.intro}</p>
      {st.culture && <p className="dest-culture">{st.culture.length > 120 ? `${st.culture.slice(0,120)}...` : st.culture}</p>}
      <div className="destination-actions">
        <button className="submit" onClick={() => onView(st)}>Quick View</button>
        <button className="submit" onClick={() => { window.location.href = `state.html?name=${encodeURIComponent(st.name)}`; }}>Explore</button>
      </div>
    </div>
  );
}

function Modal({ item, onClose }) {
  if (!item) return null;
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <img src={item.image || '/images/img1.png'} alt={item.name} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = '/images/img1.png'; }} />
        <h2>{item.name}</h2>
        <p>{item.intro}</p>
        <p><strong>Culture:</strong> {item.culture}</p>
        {item.popular && <p><strong>Popular:</strong> {item.popular.join(', ')}</p>}
      </div>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('');
  // no sort required for states
  const [sort, setSort] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(12);
  // no default state filter; use search to find a state
  const [states, setStates] = useState([]);

  // Use local `data/states.json` for state info; modal uses state objects loaded from this array
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        // Load the local JSON file in the project
        const url = '/data/states.json';
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!didCancel) {
          setItems(data || []);
          setTotal((data && data.length) || 0);
          setError(null);
          setShowError(false);
        }
      } catch (e) {
        // If local JSON fails, fall back to the embedded sample data
        console.warn('Failed to load local states.json; using fallback sample data.', e);
        if (!didCancel) {
          setItems(sampleStates);
          setTotal(sampleStates.length);
          setError('Unable to load local state data; showing embedded sample data.');
          setShowError(true);
        }
      } finally {
        if (!didCancel) setLoading(false);
      }
    };
    fetchData();
    return () => { didCancel = true; };
  }, []); // fetch once on mount; searches are client-side

  // build states list available in the loaded data
  useEffect(() => {
    const unique = Array.from(new Set((items || []).map(i => i.name).filter(Boolean))).sort();
    setStates(unique);
  }, [items]);

  const filtered = items.filter(it => it.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="destinations-wrapper">
      <div className="destination-controls">
        <input className="destination-search" placeholder={`Search states (${total || 0} available)`} value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {/* No separate state-info block; use modal for detailed info */}

      {/* Show a centered top notice about fallback data before the grid */}
      {showError && error && (
        <div className="error-banner" role="status" aria-live="polite" style={{ maxWidth: '1180px', margin: '0 auto 12px' }}>
          <div className="error-text" style={{ flex: 1 }}>{error}</div>
          <button className="error-dismiss" onClick={() => setShowError(false)} aria-label="Dismiss">✕</button>
        </div>
      )}

      <div className="dest-grid">
        {loading && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center' }}>
            <p>Loading states...</p>
          </div>
        )}
        {/* Old non-dismissible error area removed — we now show a top, dismissible banner */}
        {filtered.map(st => (
          <StateCard key={st.name} st={st} onView={setSelected} />
        ))}
        {filtered.length === 0 && !loading && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#333' }}>
            <p>No states match your search.</p>
          </div>
        )}
      </div>

      <Modal item={selected} onClose={() => setSelected(null)} />
      <div style={{ display:'flex', justifyContent:'center', gap:10, padding: 12 }}>
        {page > 1 && <button onClick={() => setPage(page - 1)} className="submit">Previous</button>}
        <div style={{ alignSelf:'center' }}>Page {page} / {Math.max(1, Math.ceil(total / limit))}</div>
        {page * limit < total && <button onClick={() => setPage(page + 1)} className="submit">Next</button>}
      </div>
    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('destinations-root'));
root.render(<App/>);
