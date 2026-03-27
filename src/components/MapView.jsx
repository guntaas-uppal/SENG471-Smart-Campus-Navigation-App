import { useEffect, useRef } from "react";

function getBusyColor(pct) {
  if (pct >= 75) return "#ef4444";
  if (pct >= 50) return "#f59e0b";
  return "#22c55e";
}

function buildingIcon(building, isSelected, accessibilityMode) {
  const color = isSelected ? "#38bdf8" : getBusyColor(building.busy);
  const bg = isSelected ? "#38bdf8" : "#1e293b";
  const textColor = isSelected ? "#0f172a" : "#f1f5f9";
  const subColor = isSelected ? "#0f172a99" : "#64748b";
  const borderColor = isSelected ? "#7dd3fc" : color;
  const accessIcon = accessibilityMode
    ? `<span style="position:absolute;top:-5px;right:-5px;font-size:9px;
        background:#22c55e;color:#0f172a;border-radius:50%;width:13px;height:13px;
        display:flex;align-items:center;justify-content:center;font-weight:700">♿</span>`
    : "";

  return window.L.divIcon({
    className: "",
    iconSize: [68, 46],
    iconAnchor: [34, 23],
    html: `
      <div style="position:relative;background:${bg};border:2px solid ${borderColor};
        border-radius:8px;padding:4px 7px;text-align:center;
        box-shadow:0 4px 14px rgba(0,0,0,0.45);cursor:pointer;min-width:68px">
        <div style="font-weight:700;font-size:11px;color:${textColor};line-height:1.3">${building.code}</div>
        <div style="font-size:9px;color:${subColor}">${building.busy}% busy</div>
        ${accessIcon}
      </div>`,
  });
}

function userIcon() {
  return window.L.divIcon({
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<div style="width:22px;height:22px;border-radius:50%;background:#38bdf8;
      border:3px solid #fff;box-shadow:0 0 0 5px rgba(56,189,248,0.25)"></div>`,
  });
}

export default function MapView({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  accessibilityMode,
  userLocation,
  mapCenter,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const userMarkerRef = useRef(null);
  const accessLayerRef = useRef(null);

  // ── Initialize map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return; // already initialized
    if (!window.L) {
      console.error("Leaflet not loaded — check index.html CDN links");
      return;
    }

    const map = window.L.map(containerRef.current, {
      center: [51.0783, -114.1323],
      zoom: 16,
      zoomControl: true,
    });

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    // Add building markers
    buildings.forEach((b) => {
      const marker = window.L.marker([b.lat, b.lng], {
        icon: buildingIcon(b, false, false),
      })
        .addTo(map)
        .on("click", () => onSelectBuilding(b));
      markersRef.current[b.id] = marker;
    });

    // Fix marker render timing (SCNA-1 bug fix)
    setTimeout(() => map.invalidateSize(), 200);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Update markers when selection / accessibility changes ────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    buildings.forEach((b) => {
      const marker = markersRef.current[b.id];
      if (!marker) return;
      const isSel = selectedBuilding?.id === b.id;
      marker.setIcon(buildingIcon(b, isSel, accessibilityMode));
    });

    // Accessibility overlay polyline
    if (accessLayerRef.current) {
      mapRef.current.removeLayer(accessLayerRef.current);
      accessLayerRef.current = null;
    }
    if (accessibilityMode) {
      const accessPath = buildings
        .filter((b) => ["ENG", "ICT", "EDC", "LIB"].includes(b.id))
        .map((b) => [b.lat, b.lng]);
      accessLayerRef.current = window.L.polyline(accessPath, {
        color: "#22c55e",
        weight: 4,
        dashArray: "8 6",
        opacity: 0.85,
      }).addTo(mapRef.current);
    }
  }, [selectedBuilding, accessibilityMode, buildings]);

  // ── Pan to selected building ─────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !selectedBuilding) return;
    mapRef.current.setView([selectedBuilding.lat, selectedBuilding.lng], 17, { animate: true });
  }, [selectedBuilding]);

  // ── Pan to mapCenter ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !mapCenter) return;
    mapRef.current.setView(mapCenter, 17, { animate: true });
  }, [mapCenter]);

  // ── User location marker ─────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(userLocation);
    } else {
      userMarkerRef.current = window.L.marker(userLocation, {
        icon: userIcon(),
        zIndexOffset: 1000,
      }).addTo(mapRef.current);
    }
  }, [userLocation]);

  return (
    <div style={{ position: "relative", width: "100%", marginBottom: 0 }}>
      <style>{`
        .leaflet-container { background: #0f172a !important; }
        .leaflet-control-zoom a {
          background: #1e293b !important;
          color: #f1f5f9 !important;
          border-color: #334155 !important;
        }
        .leaflet-control-attribution {
          background: rgba(15,23,42,0.85) !important;
          color: #64748b !important;
          font-size: 9px !important;
        }
        .leaflet-control-attribution a { color: #38bdf8 !important; }
      `}</style>

      {/* Map container */}
      <div
        ref={containerRef}
        style={{ width: "100%", height: "52vh", minHeight: 260, borderRadius: 12, overflow: "hidden" }}
      />

      {/* Legend */}
      <div style={{
        position: "absolute", bottom: 14, left: 12,
        background: "rgba(15,23,42,0.88)", border: "1px solid #334155",
        borderRadius: 8, padding: "6px 10px", zIndex: 800,
        fontSize: 10, color: "#94a3b8",
        backdropFilter: "blur(4px)",
        pointerEvents: "none",
      }}>
        {[["#22c55e", "<50%"], ["#f59e0b", "50–75%"], ["#ef4444", ">75%"]].map(([c, l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: c, display: "inline-block", flexShrink: 0 }} />
            <span>{l} busy</span>
          </div>
        ))}
      </div>
    </div>
  );
}