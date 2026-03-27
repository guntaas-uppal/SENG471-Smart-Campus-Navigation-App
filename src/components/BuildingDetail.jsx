import { ROOM_TYPES } from "../data/campusData";

function busyColor(pct) {
  if (pct >= 75) return "#ef4444";
  if (pct >= 50) return "#f59e0b";
  return "#22c55e";
}

export default function BuildingDetail({ building, accessibilityMode, onClose }) {
  const color = busyColor(building.busy);

  return (
    <div className="card slide-up" style={{ marginTop: 10, position: "relative" }}>
      <button
        onClick={onClose}
        style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: "#64748b", fontSize: 18, cursor: "pointer", lineHeight: 1 }}
        aria-label="Close"
      >
        ✕
      </button>

      <div style={{ paddingRight: 28 }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{building.name}</div>
        <div style={{ fontSize: 11, color: "#64748b" }}>🕐 {building.hours}</div>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 10, marginBottom: 6, alignItems: "center" }}>
        <span
          className="pill"
          style={{ background: color + "22", color }}
        >
          {building.busy}% busy
        </span>
        {accessibilityMode && (
          <span className="pill" style={{ background: "#22c55e22", color: "#22c55e" }}>♿ Accessible routes active</span>
        )}
      </div>

      <div className="busy-bar-wrap">
        <div className="busy-bar" style={{ width: `${building.busy}%`, background: color }} />
      </div>

      <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, marginBottom: 12 }}>{building.description}</p>

      {/* Floors */}
      <div className="section-label">FLOOR GUIDE</div>
      {Array.from({ length: building.floors }, (_, i) => i + 1).map((floor) => {
        const rooms = building.rooms?.filter((r) => r.floor === floor) || [];
        return (
          <div key={floor} className="floor-row">
            <div className="floor-num">F{floor}</div>
            <div style={{ flex: 1 }}>
              {rooms.length > 0
                ? rooms.map((r) => (
                    <div key={r.id} style={{ fontSize: 11, color: "#cbd5e1" }}>
                      {ROOM_TYPES[r.type]?.icon || "📌"} {r.name}
                    </div>
                  ))
                : <div style={{ fontSize: 11, color: "#475569" }}>Offices / Corridors</div>}
            </div>
            {accessibilityMode && (
              <div style={{ display: "flex", gap: 4 }}>
                <span style={{ fontSize: 10, color: "#22c55e" }}>🛗</span>
                {floor === 1 && <span style={{ fontSize: 10, color: "#22c55e" }}>♿</span>}
              </div>
            )}
          </div>
        );
      })}

      {/* Amenities */}
      {building.amenities && (
        <>
          <div className="section-label" style={{ marginTop: 12 }}>AMENITIES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {building.amenities.map((a) => (
              <span key={a} className="pill" style={{ background: "#0f172a", color: "#94a3b8", border: "1px solid #334155" }}>
                {a}
              </span>
            ))}
          </div>
        </>
      )}

      <button className="btn-primary" style={{ marginTop: 14 }}>📍 Get Directions</button>
    </div>
  );
}