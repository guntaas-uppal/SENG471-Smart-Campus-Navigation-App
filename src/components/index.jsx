import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
// EventsTab
// ─────────────────────────────────────────────
export function EventsTab({ events }) {
  return (
    <div>
      <div className="page-title">Campus Events</div>
      {events.map((ev) => (
        <div
          key={ev.id}
          className="event-card"
          style={{ borderLeftColor: ev.color }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{ev.title}</div>
            <span
              className="pill"
              style={{ background: ev.color + "22", color: ev.color, textTransform: "capitalize" }}
            >
              {ev.type}
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>
            📍 {ev.location} &nbsp;·&nbsp; 🕐 {ev.time} &nbsp;·&nbsp; {ev.date}
          </div>
          <button className="btn-ghost" style={{ marginTop: 8 }}>
            Navigate Here
          </button>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// ParkingTab
// ─────────────────────────────────────────────
function busyColor(pct) {
  if (pct >= 75) return "#ef4444";
  if (pct >= 50) return "#f59e0b";
  return "#22c55e";
}

export function ParkingTab({ parking, transit }) {
  return (
    <div>
      <div className="page-title">Parking &amp; Transit</div>

      <div className="section-label">Parking Lots</div>
      {parking.map((p) => {
        const freePct = Math.round((p.available / p.total) * 100);
        const color = busyColor(100 - freePct);
        return (
          <div key={p.id} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
              <span className="pill" style={{ background: color + "22", color }}>
                {p.available} free
              </span>
            </div>
            <div className="busy-bar-wrap">
              <div className="busy-bar" style={{ width: `${freePct}%`, background: color }} />
            </div>
            <div style={{ display: "flex", gap: 14, fontSize: 11, color: "#94a3b8", marginTop: 4 }}>
              <span>♿ {p.accessible} accessible</span>
              <span>⚡ {p.ev} EV</span>
              <span>🚗 {p.total} total</span>
            </div>
          </div>
        );
      })}

      <div className="section-label" style={{ marginTop: 12 }}>Transit Nearby</div>
      {transit.map((t, i) => (
        <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 28 }}>{t.type === "train" ? "🚊" : "🚌"}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{t.route}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>📍 {t.stop}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "#38bdf8" }}>{t.nextArrival}</div>
            <div style={{ fontSize: 10, color: "#64748b" }}>next</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// AccessibilityTab
// ─────────────────────────────────────────────
export function AccessibilityTab({ buildings, accessibilityMode, onToggle }) {
  const featureColors = ["#22c55e", "#38bdf8", "#f59e0b", "#8b5cf6"];
  const features = ["Accessible Entrance", "Elevator All Floors", "Accessible WC (F1)", "Accessible Parking"];

  return (
    <div>
      <div className="page-title">Accessibility</div>

      <div className="card" style={{ border: "1.5px solid #22c55e44" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 18 }}>♿</span>
          <span style={{ fontWeight: 700, color: "#22c55e" }}>Accessibility Mode</span>
          <button
            onClick={onToggle}
            style={{
              marginLeft: "auto",
              background: accessibilityMode ? "#22c55e" : "#0f172a",
              border: "none",
              borderRadius: 20,
              padding: "4px 14px",
              color: accessibilityMode ? "#0f172a" : "#64748b",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            {accessibilityMode ? "ON" : "OFF"}
          </button>
        </div>
        <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
          When enabled, routes default to accessible paths using elevators and ramps.
          Accessible washrooms and entrances are highlighted on the map.
        </div>
      </div>

      {buildings.map((b) => (
        <div key={b.id} className="card slide-up">
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{b.name}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {features.map((f, i) => (
              <span
                key={f}
                className="pill"
                style={{ background: featureColors[i] + "22", color: featureColors[i], fontSize: 11 }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="card" style={{ background: "#ef444415", border: "1.5px solid #ef444433" }}>
        <div style={{ fontWeight: 700, color: "#ef4444", marginBottom: 6, fontSize: 14 }}>
          🆘 Request Assistance
        </div>
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>
          Need help navigating? Send a request and nearby users will be notified.
        </div>
        <button className="btn-primary" style={{ background: "#ef4444" }}>
          Send Assistance Request
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ChatBot
// ─────────────────────────────────────────────
const BOT_REPLIES = {
  edc: "🏢 EDC is open 7AM–9PM, 5 floors. Accessible entrance on the west side. Coffee cart on Floor 1.",
  ict: "🏢 ICT is open 7AM–11PM, 6 floors. All-gender washroom on Floor 2. SENG 471 is in ICT 121!",
  eng: "🏢 ENG is open 7AM–10PM, 4 floors. Career Fair in the Atrium today at 1PM!",
  tfdl: "📚 TFDL (Library) open until Midnight. Study pods on F3, silent zone on F5, 3D printing on F1.",
  library: "📚 TFDL open until Midnight. Study pods on F3, silent zone on F5, café on F1.",
  parking: "🅿️ ICT Parkade has the most space (92 free). Lot 32 near Engineering is almost full (7 left).",
  washroom: "🚻 Accessible washrooms on Floor 1 of every building. ICT Floor 2 has an all-gender washroom.",
  bathroom: "🚻 Accessible washrooms on Floor 1 of every building. ICT Floor 2 has an all-gender washroom.",
  study: "📚 Best spots: TFDL Floors 3 & 5 for quiet zones. ICT student lounge. MacHall open seating.",
  bus: "🚌 Route 9 in 3 min at University Gate NW. Route 19 in 11 min at Campus Drive SE.",
  train: "🚊 Red Line CTrain in 7 min at University Station.",
  transit: "🚌 Route 9 in 3 min, Red Line in 7 min (University Station), Route 19 in 11 min.",
  wheelchair: "♿ Enable Accessibility Mode (top-right) for elevator/ramp routes.",
  accessible: "♿ Enable Accessibility Mode (top-right) for elevator and ramp routes.",
  food: "☕ Tim Hortons in TFDL basement. MacHall food court open 7AM–10PM.",
  coffee: "☕ Tim Hortons in TFDL, coffee cart in EDC Floor 1, vending in most buildings.",
  event: "📅 Today: SENG 471 at ICT 121 (10AM), Career Fair ENG Atrium (1PM), Coffee & Code ICT Lounge (3:30PM).",
};

export function ChatBot({ onClose, buildings }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Campus Navigator Bot here! Ask me about buildings, parking, study spaces, transit, or accessibility." },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  function sendMsg() {
    const msg = input.trim();
    if (!msg) return;
    setInput("");
    setMessages((m) => [...m, { from: "user", text: msg }]);

    setTimeout(() => {
      const lower = msg.toLowerCase();
      let reply = "I don't have specific info on that yet. Try searching for a building code or check the map!";

      for (const key of Object.keys(BOT_REPLIES)) {
        if (lower.includes(key)) {
          reply = BOT_REPLIES[key];
          break;
        }
      }

      // Match building names from data
      const matchedBuilding = buildings.find(
        (b) =>
          lower.includes(b.name.toLowerCase()) ||
          lower.includes(b.code.toLowerCase())
      );
      if (matchedBuilding && !reply.startsWith("🏢")) {
        reply = `🏢 ${matchedBuilding.name}: ${matchedBuilding.floors} floors, open ${matchedBuilding.hours.split(",")[0]}. Currently ${matchedBuilding.busy}% busy.`;
      }

      setMessages((m) => [...m, { from: "bot", text: reply }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 600);
  }

  return (
    <div className="chat-overlay">
      <div className="chat-drawer slide-up">
        <div className="chat-header">
          <div style={{ fontWeight: 700, fontSize: 14 }}>💬 Campus Bot</div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "#64748b", fontSize: 20, cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`bubble ${m.from}`}>
              {m.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder="Ask about a location..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMsg()}
            autoFocus
          />
          <button className="chat-send" onClick={sendMsg}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// NotificationPanel
// ─────────────────────────────────────────────
export function NotificationPanel({ notifications, onClose }) {
  return (
    <div className="notif-panel slide-up">
      <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 8, letterSpacing: 1 }}>
        NOTIFICATIONS
      </div>
      {notifications.map((n) => (
        <div
          key={n.id}
          className="notif-item"
          style={{ borderLeftColor: n.type === "alert" ? "#ef4444" : "#38bdf8" }}
        >
          {n.text}
        </div>
      ))}
      <button className="btn-ghost" style={{ width: "100%", marginTop: 6 }} onClick={onClose}>
        Dismiss All
      </button>
    </div>
  );
}