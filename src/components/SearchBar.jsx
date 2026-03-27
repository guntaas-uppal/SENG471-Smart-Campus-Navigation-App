import { useState, useRef, useEffect } from "react";

export default function SearchBar({ buildings, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const wrapRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInput = (val) => {
    setQuery(val);
    if (val.length < 2) {
      setResults([]);
      return;
    }
    const lower = val.toLowerCase();
    const matched = buildings.filter(
      (b) =>
        b.name.toLowerCase().includes(lower) ||
        b.code.toLowerCase().includes(lower) ||
        b.departments?.some((d) => d.toLowerCase().includes(lower)) ||
        b.rooms?.some(
          (r) =>
            r.name.toLowerCase().includes(lower) ||
            r.id.toLowerCase().includes(lower)
        )
    );
    setResults(matched.slice(0, 6));
  };

  const handleSelect = (building) => {
    onSelect(building);
    setQuery("");
    setResults([]);
  };

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <input
        className="search-input"
        placeholder="🔍  Search buildings, rooms, departments..."
        value={query}
        onChange={(e) => handleInput(e.target.value)}
      />
      {results.length > 0 && (
        <div className="search-dropdown">
          {results.map((b) => (
            <div key={b.id} className="search-item" onClick={() => handleSelect(b)}>
              <span className="search-item-icon">🏛️</span>
              <div>
                <div className="search-item-name">{b.name}</div>
                <div className="search-item-sub">
                  {b.floors} floors · {b.hours.split(",")[0]}
                </div>
              </div>
              <span className="search-item-code">{b.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}