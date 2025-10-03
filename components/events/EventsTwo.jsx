"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { fetchActualites } from "@/services/actualiteService";
import { API_BASE_URL } from "@/lib/config";

const apiBase = API_BASE_URL;
/* ---------- utils ---------- */
const resolveUrl = (u) => {
  if (!u) return "";
  const base = apiBase;
  return u.startsWith("http") ? u : `${base}${u}`;
};
const stripHtml = (s) => (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
const brief = (d) => {
  const txt = d?.subtitle || stripHtml(d?.content);
  return txt && txt.length > 200 ? txt.slice(0, 197) + "…" : txt || "";
};
const getDate = (doc) =>
  doc?.displayDate || doc?.event?.startAt || doc?.publishedAt || doc?.createdAt || null;
const fmtDate = (s) =>
  s
    ? new Date(s).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "—";

export default function EventsTwo() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quick category pills (non-intrusive)
  const [cat, setCat] = useState("all"); // all | evenements | annonces | recherche

  /* ---------- hero parallax (mouse move) ---------- */
  useEffect(() => {
    const container = document.querySelector(".js-mouse-move-container");
    if (!container) return;
    const handler = (e) => {
      const targets = container.querySelectorAll(".js-mouse-move");
      const rect = container.getBoundingClientRect();
      const relX = e.pageX - rect.left;
      const relY = e.pageY - rect.top;
      targets.forEach((el) => {
        const movement = Number(el.getAttribute("data-move") || 0);
        el.style.transform = `translate(${((relX - container.clientWidth / 2) / container.clientWidth) * movement}px, ${
          ((relY - container.clientHeight / 2) / container.clientHeight) * movement
        }px)`;
      });
    };
    container.addEventListener("mousemove", handler);
    return () => container.removeEventListener("mousemove", handler);
  }, []);

  /* ---------- offset hero under fixed nav ---------- */
  useEffect(() => {
    const hero = document.querySelector(".hero");
    const anchors = [document.getElementById("list"), document.getElementById("filters")];

    const compute = () => {
      const candidates = Array.from(
        document.querySelectorAll("header, .header, .site-header, .js-header, nav")
      );
      let h = 0;
      for (const el of candidates) {
        const st = window.getComputedStyle(el);
        if (st.position === "fixed" || st.position === "sticky") {
          h = Math.max(h, el.offsetHeight || 0);
        }
      }
      // Fallback if we can't detect: assume ~88px
      if (!h) h = 88;
      hero?.style.setProperty("--nav-height", `${h}px`);
      anchors.forEach((a) => a?.style.setProperty("scroll-margin-top", `${h + 12}px`));
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  /* ---------- fetch all actualités ---------- */
  useEffect(() => {
    let on = true;
    (async () => {
      try {
        const { items } = await fetchActualites({
          status: "published",
          limit: 1000,
          sort: "-publishedAt",
        });
        if (on) setItems(items || []);
      } catch (e) {
        console.error("Failed to load actualités:", e);
        if (on) setItems([]);
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => {
      on = false;
    };
  }, []);

  /* ---------- order ---------- */
  const list = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      const da = new Date(getDate(a)).getTime() || 0;
      const db = new Date(getDate(b)).getTime() || 0;
      return db - da;
    });
    return sorted;
  }, [items]);

  /* ---------- tiny pills filter ---------- */
  const filtered = useMemo(() => {
    if (cat === "all") return list;
    if (cat === "evenements") return list.filter((d) => d?.kind === "evenement" || d?.event);
    if (cat === "annonces") return list.filter((d) => (d?.type || "").toLowerCase().includes("annonce"));
    // if (cat === "recherche") return list.filter((d) => (d?.type || "").toLowerCase().includes("recherche"));
    return list;
  }, [list, cat]);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero js-mouse-move-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            minHeight: "110vh",
            zIndex: 0,
            pointerEvents: "none"
          }}
        >
                <source src="/assets/img/home-4/masthead/videoEvents.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
        <div className="dots" aria-hidden="true" />
        <div className="container">
          <div className="row">
            {/* LEFT */}
            <div className="col left">
              <span className="eyebrow">
                <span className="ic"></span> Dernières actualités
              </span>

              <h1 className="masthead__title">
                Actualités & Événements<br />
                FST Marrakech
              </h1>

              <p className="heroSub" >
                Découvrez les dernières nouvelles, événements et annonces importantes de la
                Faculté des Sciences et Techniques de Marrakech.
              </p>

              <div className="heroPills">
                <span className="pill">
                  <span className="ic">📅</span>
                  {!loading ? `${list.length} publication${list.length > 1 ? "s" : ""}` : "—"}
                </span>
                <span className="pill ghost">
                  <span className="ic">⚡</span> Mise à jour quotidiennement
                </span>
              </div>

              <div className="heroCtas">
                <a href="#list" className="btn btn-accent">
                  Explorer les actualités →
                </a>
              
              </div>
            </div>

            {/* RIGHT */}
            <div className="col right">
              {/*<div className="mediaCard">
                <Image
                  width={980}
                  height={560}
                  className="mediaImg js-mouse-move"
                  data-move="16"
                  src="/assets/img/home-4/masthead/2.jpg"
                  alt="Campus FST Marrakech"
                />

                <div className="floatCard top">
                  <div className="floatTitle">🏆 Excellence académique</div>
                  <div className="floatSub">Classement national</div>
                </div>

                <div className="floatCard bottom">
                  <div className="floatTitle">👥 5000+ Étudiants</div>
                   <div className="floatSub">Communauté active</div>  
                </div>
              </div>*/}
            </div>
          </div>

        </div>
      </section>
      
          {/* Filters (compact pills) */}
          <div id="filters" className="filterRow">
            <span className="filterLabel">Filtrer par:</span>
            {[
              { key: "all", label: "Toutes" },
              { key: "evenements", label: "Événements" },
              { key: "annonces", label: "Annonces" },
              // { key: "recherche", label: "Recherche" },
            ].map((f) => (
              <button
                key={f.key}
                type="button"
                className={`chip ${cat === f.key ? "chip-active" : ""}`}
                onClick={() => setCat(f.key)}
              >
                {f.label}
              </button>
            ))}

            <span className="spacer" />
            <span className="countRight">
              Affichage de {!loading ? <b>{filtered.length}</b> : "—"} publication
              {!loading && filtered.length > 1 ? "s" : ""}
            </span>
          </div>
      {/* ===== LIST ===== */}
      <section id="list" className="listSection">
        <div className="container">
          <div className="grid-cards">
            {(loading ? Array.from({ length: 6 }) : filtered).map((doc, i) => {
              const href = loading ? "#" : `/events/${doc?.slug || doc?._id || ""}`;
              const img = loading ? "" : resolveUrl(doc?.cardImage?.url);
              const date = loading ? null : getDate(doc);
              const deps = Array.isArray(doc?.departments)
                ? doc.departments
                    .map((x) => (typeof x === "string" ? x : x?.name || x?.title || x?.code || ""))
                    .filter(Boolean)
                : [];

              return (
                <article key={doc?._id || i} className={`card ${loading ? "is-loading" : ""}`}>
                  <div className="card__media">
                    {!loading && (
                      <Image
                        width={720}
                        height={405}
                        className="img"
                        src={img || "/assets/img/placeholder/cover.png"}
                        alt={doc?.title || "image"}
                        priority={i < 2}
                      />
                    )}
                  </div>

                  <div className="card__body">
                    <div className="meta">
                      <div className="metaItem">
                        <span className="ic">📅</span>
                        <span>{fmtDate(date)}</span>
                      </div>
                      {doc?.author?.name && (
                        <>
                          <span className="dot" />
                          <div className="metaItem">
                            <span className="ic">👤</span>
                            <span>{doc.author.name}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <h3 className="card__title">
                      {loading ? "Chargement…" : (
                        <Link className="link" href={href}>
                          {doc?.title}
                        </Link>
                      )}
                    </h3>

                    {!loading && (doc?.subtitle || doc?.content) ? (
                      <p className="desc">{brief(doc)}</p>
                    ) : (
                      <div className="desc sk" />
                    )}

                    <div className="chips">
                      {doc?.type && <span className="chip">{doc.type}</span>}
                      {deps.slice(0, 2).map((d) => (
                        <span key={d} className="chip ghost">{d}</span>
                      ))}
                    </div>

                    <div className="ctaRow">
                      <Link href={href} className="btn-link">
                        Lire la suite
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Styles ===== */}
      <style jsx>{`
        :root{
          --accent: #2177CE;
          --accent-light: #2A86EE;   /* light blue for text link */
          --text: #0f172a;
          --muted: #6b7280;
          --border: #e9edf3;
          --grey-hero: #f6f8fb;
          --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
          --shadow-md: 0 18px 42px rgba(15,23,42,0.14);
          --radius: 14px;
          --font-sans: "Plus Jakarta Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
        }

        .container{ width:min(1200px,100%); margin:0 auto; padding:0 16px; }

        /* ===== HERO WRAPPER ===== */
        .hero{
          position: relative;
          isolation: isolate;
          padding: calc(var(--nav-height, 88px) + 16px) 0 26px; /* offset below fixed header */
          background: var(--grey-hero);
          overflow: hidden;
          font-family: var(--font-sans);
        }

        /* dotted background */
        .dots{
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(15,23,42,0.06) 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: .6;
        }

        .row{
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 28px;
          align-items: center;
        }
        @media (max-width: 992px){
          .row{ grid-template-columns: 1fr; }
        }

        .left, .right{ position: relative; z-index: 1; }

        /* Typography (requested variations) */
        .eyebrow{
          display:inline-flex; align-items:center; gap:8px;
          padding: 8px 12px; border-radius: 999px;
          background:#fff; color:#0f172a; border:1px solid #e7eef8;
          font: 700 12px/1 var(--font-sans);
          box-shadow: var(--shadow-sm);
          margin-bottom: 12px;
        }
        .heroTitle{
          color:#2177CE;
          font: 900 clamp(32px, 4.6vw, 56px)/1.08 var(--font-sans); /* heavy title */
          font
          letter-spacing: -0.015em;
          margin: 0 0 10px;
        }
       

        .heroPills{ display:flex; gap:10px; flex-wrap:wrap; margin: 6px 0 16px; }
        .pill{
          display:inline-flex; align-items:center; gap:8px;
          padding: 8px 12px; border-radius: 999px;
          background:#fff; color:#0f172a; border:1px solid #e7eef8;
          font: 700 12px/1 var(--font-sans); /* bold */
          box-shadow: var(--shadow-sm);
        }
        .pill.ghost{ background:#f3f6fb; color:#0f172a; }

        .heroCtas{ display:flex; gap:12px; align-items:center; flex-wrap:wrap; margin-top: 2px; }
        .btn{
          -webkit-appearance:none; appearance:none; cursor:pointer; text-decoration:none;
          display:inline-flex; align-items:center; justify-content:center;
          height:46px; padding: 0 18px; border-radius: 12px;
          border:1px solid transparent; transition: background .2s, border-color .2s, box-shadow .2s, transform .06s;
          font: 800 15px/1 var(--font-sans);
        }
       /* Accent button: default = blue bg + white text; hover = white bg + blue text */
.btn-accent{
  background: #2177CE !important;
  color: #fff !important;
  border-color: var(--accent) !important;
  box-shadow: 0 8px 20px rgba(33,119,206,.28);
}
.btn-accent:hover{
  background: #fff !important;
  color: #2177CE !important;
  border-color: var(--accent) !important;
  transform: translateY(-1px);
}
.btn-accent:active{
  transform: translateY(0);
}

/* Title + subtitle tint toward #2177CE */
.heroTitle,
.masthead__title{
  color: white !important;       /* #2177CE */
}
.heroSub{
  color: white !important;             /* slightly darker accent for contrast */
}

        .btn-ghost{
          background:#fff; color:#0f172a; border-color:#e2e8f0;
        }
        .btn-ghost:hover{ background:#f8fafc; transform: translateY(-1px); }

        /* Hero media card */
        .mediaCard{
          position: relative; border-radius: 16px; overflow: hidden; border:1px solid #e5eaf2;
          background: linear-gradient(135deg, #e5e7eb 0%, #cbd5e1 100%);
          box-shadow: 0 14px 40px rgba(15,23,42,.16);
          min-height: 300px;
        }
        .mediaImg{
          width:100%; height:auto; display:block; object-fit: cover;
          border-radius: 16px; filter: saturate(.96);
        }
        .floatCard{
          position: absolute; display:flex; flex-direction:column; gap:4px;
          background:#fff; padding: 10px 12px; border-radius: 12px;
          border:1px solid #e7eef8; box-shadow: var(--shadow-sm);
          max-width: 260px;
        }
        .floatCard.top{ right: 14px; top: 14px; }
        .floatCard.bottom{ left: 14px; bottom: 14px; }
        .floatTitle{ font: 800 13px/1.2 var(--font-sans); color:#0f172a; }
        .floatSub{ font: 600 12px/1.2 var(--font-sans); color:#64748b; }

        /* Filter pill row */
        #filters{ scroll-margin-top: calc(var(--nav-height, 88px) + 12px); }
        .filterRow{
          margin: 10px 20px;
          display:flex; align-items:center; gap: 10px;
          background:#fff; border:1px solid #e7eef8; border-radius: 14px;
          padding: 10px 12px; box-shadow: var(--shadow-sm);
          font-family: var(--font-sans);
        }
        .filterLabel{ color:#64748b; font: 600 13px/1 var(--font-sans); }
        .chip{
          display:inline-flex; align-items:center; gap:6px;
          padding: 8px 12px; border-radius: 999px;
          background:#f6fafe; color:#3b556e; border:1px solid #e7eef8;
          font: 700 12px/1 var(--font-sans);
        }
        .chip-active{ background:#EAF3FE; color: var(--accent); border-color:#dbeafe; }
        .spacer{ flex:1; }
        .countRight{ color:#334155; font: 600 13px/1 var(--font-sans); }

        /* ===== LIST SECTION ===== */
        #list{ scroll-margin-top: calc(var(--nav-height, 88px) + 12px); }
        .listSection{ background:#fff; padding: 26px 0 72px; font-family: var(--font-sans); }

        .grid-cards{
          display:grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        @media (max-width: 1024px){ .grid-cards{ grid-template-columns: 1fr 1fr; } }
        @media (max-width: 680px){ .grid-cards{ grid-template-columns: 1fr; } }

        .card{
          display:flex; flex-direction:column; overflow:hidden;
          background:#fff; border:1px solid var(--border); border-radius:14px;
          box-shadow: var(--shadow-sm);
          transition: box-shadow .2s ease, transform .12s ease, border-color .2s ease;
        }
        .card:hover{ transform: translateY(-3px); box-shadow: var(--shadow-md); border-color:#dbe3ee; }
        .card.is-loading{ position:relative; }
        .card.is-loading::after{
          content:""; position:absolute; inset:0;
          background:linear-gradient(90deg,#f4f6fb 25%,#eceff6 37%,#f4f6fb 63%);
          background-size:400% 100%; animation: shimmer 1.4s ease infinite; opacity:.5;
        }
        @keyframes shimmer{ 0%{background-position:100% 0;} 100%{background-position:-100% 0;} }

        .card__media{ aspect-ratio: 16/9; background:#f6f8fb; }
        .img{ width:100%; height:100%; object-fit:cover; display:block; }

        .card__body{ padding: 12px 14px 14px; display:grid; gap:8px; }
        .meta{ display:flex; align-items:center; gap:8px 12px; flex-wrap:wrap; color:#0f172a; font-size:13px; }
        .metaItem{ display:inline-flex; align-items:center; gap:6px; }
        .dot{ width:4px; height:4px; border-radius:999px; background:rgba(0,0,0,.25); }

        .card__title{ font: 800 18px/1.28 var(--font-sans); margin:0; }
        .link{ color:#0f172a; text-decoration:none; }
        .link:hover{ text-decoration:underline; }

        .desc{ color:#334155; margin:0; line-height:1.6; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; min-height:72px; }
        .desc.sk{ background:#f2f5fb; border-radius:8px; height:72px; }

        .chips{ display:flex; gap:6px; flex-wrap:wrap; }
        .chip.ghost{ background:#f6fafe; color:#3b556e; border-color:#e7eef8; }

        .ctaRow{ margin-top:2px; }
        .btn-link{
          display:inline-flex; align-items:center; gap:8px;
          font: 800 14px/1 var(--font-sans);
          color: var(--accent-light); text-decoration:none;
          padding: 4px 0; border-radius: 8px; transition: color .2s ease, transform .06s ease;
        }
        .btn-link:hover{ text-decoration: underline; transform: translateY(-1px); }
        .btn-link:focus-visible{ outline: none; box-shadow: 0 0 0 3px rgba(42,134,238,.25); }
      `}</style>
    </>
  );
}
