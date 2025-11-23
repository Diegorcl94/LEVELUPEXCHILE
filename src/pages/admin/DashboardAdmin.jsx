import React from "react";
import "../../styles/style.css";

export default function DashboardAdmin() {
  const cards = [
    {
      title: "Productos",
      link: "/admin-panel/productos",
      icon: "🛒",
      color: "#00ffbf"
    },
    {
      title: "Blog",
      link: "/admin-panel/blog",
      icon: "📰",
      color: "#39ff14"
    },
    {
      title: "Eventos",
      link: "/admin-panel/eventos",
      icon: "🎫",
      color: "#1E90FF"
    },
    {
      title: "Destacados",
      link: "/admin-panel/destacados",
      icon: "⭐",
      color: "#FFD700"
    },
    {
      title: "Banners",
      link: "/admin-panel/banners",
      icon: "🖼️",
      color: "#FF8C00" // naranja neon
    }
  ];

  return (
    <div className="container py-5 text-light">
      <h1 className="section-title text-center">Panel de Administración 👑</h1>
      <p className="text-center lead mb-5">Bienvenido administrador</p>

      <div className="row g-4">
        {cards.map((c, i) => (
          <div className="col-md-6 col-lg-3" key={i}>
            <a
              href={c.link}
              className="admin-card d-flex flex-column align-items-center justify-content-center"
              style={{
                border: `2px solid ${c.color}`,
                boxShadow: `0 0 12px ${c.color}`,
                textDecoration: "none",
                borderRadius: "20px",
                padding: "40px 10px",
                background: "#111"
              }}
            >
              <div className="display-3">{c.icon}</div>
              <h4 className="mt-3 text-light">{c.title}</h4>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
