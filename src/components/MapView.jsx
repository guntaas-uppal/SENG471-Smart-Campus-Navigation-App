import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's broken default icon paths when bundled with Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// ── Helpers ──────────────────────────────────────────────────────────────────
function getBusyColor(pct) {
  if (pct >= 75) return "#ef4444";
  if (pct >= 50) return "#f59e0b";
  return "#22c55e";
}

function buildingIcon(building, isSelected, accessibilityMode) {
  const color = isSelected ? "#38bdf8" : getBusyColor(building.busy);
  const bg    = isSelected ? "#38bdf8" : "#1e293b";
  const text  = isSelected ? "#0f172a" : "#f1f5f9";
  const sub   = isSelected ? "#0f172a99" : "#64748b";
  const border = isSelected ? "#7dd3fc" : color;
  const a11y  = accessibilityMode
    ? `<span style="position:absolute;top:-5px;right:-5px;font-size:9px;
        background:#22c55e;color:#0f172a;border-radius:50%;width:14px;height:14px;
        display:flex;align-items:center;justify-content:center;font-weight:700">♿</span>`
    : "";
  return L.divIcon({
    className: "",
    iconSize: [70, 46],
    iconAnchor: [35, 23],
    html: `<div style="position:relative;background:${bg};border:2px solid ${border};
      border-radius:8px;padding:4px 8px;text-align:center;min-width:70px;
      box-shadow:0 4px 14px rgba(0,0,0,0.5);cursor:pointer">
      <div style="font-weight:700;font-size:11px;color:${text};line-height:1.3">${building.code}</div>
      <div style="font-size:9px;color:${sub}">${building.busy}% busy</div>
      ${a11y}
    </div>`,
  });
}

function userIcon() {
  return L.divIcon({
    className: "",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    html: `<div style="width:22px;height:22px;border-radius:50%;background:#38bdf8;
      border:3px solid #fff;box-shadow:0 0 0 5px rgba(56,189,248,0.25)"></div>`,
  });
}

// ── Component ────────────────────────────────────────────────────────────────
export default function MapView({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  accessibilityMode,
  userLocation,
  mapCenter,
}) {
  const containerRef   = useRef(null);
  const mapRef         = useRef(null);
  const markersRef     = useRef({});
  const userMarkerRef  = useRef(null);
  const accessLayerRef = useRef(null);

  // ── Init map once ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [51.0783, -114.1323],
      zoom: 16,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    buildings.forEach((b) => {
      const marker = L.marker([b.lat, b.lng], { icon: buildingIcon(b, false, false) })
        .addTo(map)
        .on("click", () => onSelectBuilding(b));
      markersRef.current[b.id] = marker;
    });

    // SCNA-1 fix: force size recalculation after React paint
    requestAnimationFrame(() => {
      requestAnimationFrame(() => map.invalidateSize());
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Update marker icons ────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    buildings.forEach((b) => {
      markersRef.current[b.id]?.setIcon(
        buildingIcon(b, selectedBuilding?.id === b.id, accessibilityMode)
      );
    });

    // Accessibility overlay
    if (accessLayerRef.current) {
      mapRef.current.removeLayer(accessLayerRef.current);
      accessLayerRef.current = null;
    }
    if (accessibilityMode) {
      const path = buildings
        .filter((b) => ["ENG", "ICT", "EDC", "LIB"].includes(b.id))
        .map((b) => [b.lat, b.lng]);
      accessLayerRef.current = L.polyline(path, {
        color: "#22c55e", weight: 4, dashArray: "8 6", opacity: 0.85,
      }).addTo(mapRef.current);
    }
  }, [selectedBuilding, accessibilityMode, buildings]);

  // ── Pan to selected building ───────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !selectedBuilding) return;
    mapRef.current.setView([selectedBuilding.lat, selectedBuilding.lng], 17, { animate: true });
  }, [selectedBuilding]);

  // ── Pan to mapCenter ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !mapCenter) return;
    mapRef.current.setView(mapCenter, 17, { animate: true });
  }, [mapCenter]);

  // ── User location dot ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng(userLocation);
    } else {
      userMarkerRef.current = L.marker(userLocation, {
        icon: userIcon(), zIndexOffset: 1000,
      }).addTo(mapRef.current);
    }
  }, [userLocation]);

  return (
    <div style={{ position: "relative", marginBottom: 0 }}>
      {/* Dark map tile override */}
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

      {/* THE MAP — explicit pixel height is required for Leaflet */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "52vh",
          minHeight: "260px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      />

      {/* Busy colour legend */}
      <div style={{
        position: "absolute", bottom: 14, left: 12,
        background: "rgba(15,23,42,0.88)", border: "1px solid #334155",
        borderRadius: 8, padding: "6px 10px", zIndex: 800,
        fontSize: 10, color: "#94a3b8", pointerEvents: "none",
      }}>
        {[["#22c55e","<50%"],["#f59e0b","50–75%"],["#ef4444",">75%"]].map(([c,l]) => (
          <div key={l} style={{ display:"flex", alignItems:"center", gap:5, marginBottom:2 }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:c, display:"inline-block" }} />
            <span>{l} busy</span>
          </div>
        ))}
      </div>
    </div>
  );
}
