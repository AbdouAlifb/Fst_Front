"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchFiliere } from "@/services/filiereService";
import {
  FaClock,
  FaLayerGroup,
  FaGraduationCap,
  FaTh,
  FaBullseye,
  FaBriefcase,
  FaFilePdf,
  FaArrowRight,
  FaUser,
  FaInfoCircle,
} from "react-icons/fa";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const TABS = [
  { key: "objectifs", label: "Objectifs" },
  { key: "debouches", label: "Débouchés" },
  { key: "poursuites", label: "Poursuites" },
  { key: "programme", label: "Programme" },
];

export default function CourseDetailsTwo({ id }) {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("objectifs");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchFiliere(id);
        if (alive) setDoc(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  const resolveUrl = (u) => (u && u.startsWith("http") ? u : `${API_BASE}${u || ""}`);

  const nbModules =
    doc && doc.nbModules != null
      ? doc.nbModules
      : (doc?.programme || []).reduce((acc, y) => acc + ((y.items || []).length || 0), 0);

  return (
    <div className="course-page">
      {/* ===== HERO ===== */}
      <header className="hero">
        <div className="container">
          {doc?.formation?.title && <span className="eyebrow">{doc.formation.title}</span>}
          <h1 className="title">{doc?.title || "Chargement…"}</h1>
          {!!doc?.subtitle && <p className="subtitle">{doc.subtitle}</p>}

          <div className="actions">
            <a href="#programme" className="btn btn-primary">
              Découvrir le programme <FaArrowRight className="btn-ic" />
            </a>
            {doc?.brochure?.url && (
              <a
                href={resolveUrl(doc.brochure.url)}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                Brochure PDF
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="stats">
            {doc?.formation?.title && (
              <div className="stat">
                <div className="ic"><FaGraduationCap /></div>
                <div className="val">{doc.formation.title}</div>
                <div className="lbl">Formation</div>
              </div>
            )}
            {doc?.durationYears && (
              <div className="stat">
                <div className="ic"><FaClock /></div>
                <div className="val">{doc.durationYears} ans</div>
                <div className="lbl">Durée</div>
              </div>
            )}
            {doc?.semesters && (
              <div className="stat">
                <div className="ic"><FaLayerGroup /></div>
                <div className="val">{doc.semesters}</div>
                <div className="lbl">Semestres</div>
              </div>
            )}
            {nbModules > 0 && (
              <div className="stat">
                <div className="ic"><FaTh /></div>
                <div className="val">{nbModules}</div>
                <div className="lbl">Modules</div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== CONTENT WRAPPER ===== */}
      <section className="shell">
        <div className="container">
          <div className="grid">
            {/* Main */}
            <div className="main">
              {/* Tabs */}
              <nav className="tabs">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    className={`tab ${activeTab === t.key ? "active" : ""}`}
                    onClick={() => setActiveTab(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </nav>

              <div className="panel">
                {/* Objectifs */}
                {!loading && activeTab === "objectifs" && (
                  <div className="cards-list">
                    {(doc?.objectifs || []).map((o, i) => (
                      <div key={i} className="mini-card">{o}</div>
                    ))}
                  </div>
                )}

                {/* Débouchés */}
                {!loading && activeTab === "debouches" && (
                  <div className="cards-list">
                    {(doc?.debouches || []).map((d, i) => (
                      <div key={i} className="mini-card">{d}</div>
                    ))}
                  </div>
                )}

                {/* Poursuites */}
                {!loading && activeTab === "poursuites" && (
                  <div className="cards-list">
                    {(doc?.poursuites || []).map((p, i) => (
                      <div key={i} className="mini-card">{p}</div>
                    ))}
                  </div>
                )}

                {/* Programme */}
                {!loading && activeTab === "programme" && (
                  <div id="programme" className="prog">
                    {(doc?.programme || []).map((year, i) => (
                      <div key={i} className="prog-item">
                        <h4 className="prog-year">{year.label}</h4>
                        <ul className="prog-list">
                          {(year.items || []).map((it, j) => <li key={j}>{it}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="side">
              <div className="card info-card">
                <h3 className="card-title"><FaInfoCircle className="card-icon" /> Infos rapides</h3>
                <ul className="kv">
                  {doc?.formation?.title && (
                    <li className="kv-item">
                      <span className="kv-key">Formation:</span>
                      <Link
                        href={`/courses-list-4?formation=${doc.formation.slug || doc.formation._id}`}
                        className="kv-value link"
                      >
                        {doc.formation.title}
                      </Link>
                    </li>
                  )}
                  {doc?.status && (
                    <li className="kv-item">
                      <span className="kv-key">Statut:</span>
                      <b className="kv-value">{doc.status}</b>
                    </li>
                  )}
                  {doc?.updatedAt && (
                    <li className="kv-item">
                      <span className="kv-key">M.A.J.:</span>
                      <b className="kv-value">{new Date(doc.updatedAt).toLocaleDateString("fr-FR")}</b>
                    </li>
                  )}
                  {doc?.brochure?.url && (
                    <li className="kv-item">
                      <a
                        href={resolveUrl(doc.brochure.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="kv-value link"
                      >
                        Télécharger la brochure
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {doc?.coordinator && (
                <div className="card coord-card">
                  <h3 className="card-title"><FaUser className="card-icon" /> Coordinateur</h3>
                  <ul className="kv">
                    <li className="kv-item">
                      <span className="kv-key">Nom:</span>
                      <b className="kv-value">{doc.coordinator.name}</b>
                    </li>
                    <li className="kv-item">
                      <span className="kv-key">Métier:</span>
                      <b className="kv-value">{doc.coordinator.role}</b>
                    </li>
                    <li className="kv-item">
                      <span className="kv-key">Email:</span>
                      <b className="kv-value">{doc.coordinator.email}</b>
                    </li>
                    <li className="kv-item">
                      <span className="kv-key">Téléphone:</span>
                      <b className="kv-value">{doc.coordinator.phone}</b>
                    </li>
                    <li className="kv-item">
                      <span className="kv-key">Bureau:</span>
                      <b className="kv-value">{doc.coordinator.office}</b>
                    </li>
                  </ul>
                </div>
              )}

              {!!(doc?.documents && doc.documents.length) && (
                <div className="card docs-card">
                  <h3 className="card-title"><FaFilePdf className="card-icon" /> Documents</h3>
                  <ul className="docs-list">
                    {(doc.documents || []).map((d, i) => (
                      <li key={i} className="docs-item">
                        <a href={resolveUrl(d.url)} target="_blank" rel="noreferrer" className="link">
                          {d.label} [{d.type || "PDF"}]
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ===== STYLES ===== */}
      <style jsx>{`
        .course-page {
          --accent: #2177CE;
          --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
          --border: #e9edf3;
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #000;
          line-height: 1.5;
        }

        /* Wider container, small side gutters */
        .container {
          --container-w: 1400px;
          width: min(var(--container-w), 100%);
          margin: 0 auto;
          padding: 0 16px;
        }
        @media (min-width: 1600px) {
          .container { --container-w: 1440px; }
        }

        /* HERO */
        .hero {
          padding: 170px 0 24px; /* below fixed header */
          background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
        }
        .eyebrow {
          font-size: 14px; font-weight: 600; color: #6b7280; margin-bottom: 10px; display: block;
        }
        .title { font-size: 36px; font-weight: 700; margin-bottom: 10px; }
        .subtitle { font-size: 18px; color: #6b7280; margin-bottom: 28px; }

        .actions { display: flex; gap: 12px; margin-bottom: 28px; }
        .btn {
          padding: 12px 18px; border-radius: 8px; font-weight: 700; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px; transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
          border: 1px solid transparent;
        }
        .btn-primary {
          background: var(--accent); color: #fff !important; box-shadow: var(--shadow-sm);
        }
        .btn-primary:hover { transform: translateY(-1px); }
        .btn-primary * { color: #fff !important; }
        .btn-ghost { background: #fff; color: #0f172a; border-color: #dfe3ea; box-shadow: var(--shadow-sm); }
        .btn-ghost:hover { background: #f6f8fb; transform: translateY(-1px); }
        .btn-ic { font-size: 16px; color: inherit; }

        /* Header stat cards */
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .stat {
          background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 18px 20px; text-align: center;
          box-shadow: var(--shadow-sm); transition: transform .15s ease, border-color .15s ease, background .15s ease;
        }
        .stat:hover { transform: translateY(-2px); border-color: #d7e7fb; background: #fff; }
        .ic {
          width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          margin: 0 auto 10px; font-size: 20px; color: var(--accent); background: #EAF3FE;
          border: 1px solid #e7eef8;
        }
        .val { font-size: 18px; font-weight: 800; color: #0f172a; }
        .lbl { font-size: 14px; color: #6b7280; }
        @media (max-width: 768px) { .stats { grid-template-columns: repeat(2, 1fr); } }

        /* BODY */
        .shell { padding: 32px 0 40px; }
        .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; }
        @media (max-width: 992px) { .grid { grid-template-columns: 1fr; } }

        /* Tabs */
        .tabs { display: flex; border-bottom: 1px solid #e5e7eb; margin-bottom: 18px; gap: 8px; flex-wrap: wrap; }
        .tab {
          background: none; border: none; padding: 10px 14px; font-weight: 700; color: #6b7280; cursor: pointer; position: relative; border-radius: 8px;
        }
        .tab:hover { color: var(--accent); background: #f5f9ff; }
        .tab.active { color: var(--accent); }
        .tab.active::after {
          content: ""; position: absolute; bottom: -1px; left: 10px; right: 10px; height: 3px; background: var(--accent); border-radius: 3px;
        }

        /* Lists as mini-cards */
        .cards-list { display: grid; gap: 10px; }
        .mini-card {
          background: #fff; border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px;
          box-shadow: var(--shadow-sm); font-weight: 600; color: #0f172a;
        }

        /* Programme */
        .prog { display: grid; gap: 14px; }
        .prog-item {
          background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 16px;
          box-shadow: var(--shadow-sm);
        }
        .prog-year { font-size: 18px; font-weight: 800; color: #0f172a; margin: 0 0 8px; }
        .prog-list { list-style: none; padding: 0; margin: 0; }
        .prog-list li { margin-bottom: 8px; padding-left: 18px; position: relative; }
        .prog-list li::before { content: "•"; color: var(--accent); position: absolute; left: 0; top: 0; }

        /* Sidebar cards */
        .side { display: flex; flex-direction: column; gap: 16px; }
        .card {
          background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 16px 18px;
          box-shadow: var(--shadow-sm);
        }
        .card-title { font-size: 16px; font-weight: 800; margin: 0 0 10px; display: flex; align-items: center; gap: 8px; color: #0f172a; }
        .card-icon { color: var(--accent); font-size: 18px; }

        .kv { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
        .kv-item { display: grid; grid-template-columns: 1fr auto; gap: 12px; font-size: 14px; }
        .kv-key { color: #6b7280; font-weight: 600; }
        .kv-value { color: #0f172a; font-weight: 700; text-align: right; }
        .link { color: #0f172a; text-decoration: none; }
        .link:hover { text-decoration: underline; }

        .docs-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
        .docs-item { font-size: 14px; }
      `}</style>
    </div>
  );
}
