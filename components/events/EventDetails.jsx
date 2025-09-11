"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaInfoCircle,
  FaFilePdf,
  FaTag,
} from "react-icons/fa";
import { fetchActualite } from "@/services/actualiteService";
  import { API_BASE_URL } from "@/lib/config";
  
  const apiBase = API_BASE_URL;
const TYPE_LABELS = {
  academique: "Événements académiques",
  administratif: "Annonces administratives",
  recherche: "Recherche",
  "vie-etudiante": "Vie étudiante",
  appel: "Appel à candidatures",
  autre: "Actualité",
};

const API_BASE =apiBase;

export default function EventDetails({ id }) {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
    (async () => {
      try {
        const data = await fetchActualite(id);
        if (on) setDoc(data);
      } catch (e) {
        console.error("Failed to load actualité:", e);
        if (on) setDoc(null);
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => {
      on = false;
    };
  }, [id]);

  const resolveDisplayDate = (d) =>
    d?.displayDate || d?.event?.startAt || d?.publishedAt || d?.createdAt;

  const fmtDate = (v) =>
    v
      ? new Date(v).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  const fmtTime = (v) =>
    v
      ? new Date(v).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

  const looksLikeHTML = (s) =>
    typeof s === "string" && /<\/?[a-z][\s\S]*>/i.test(s);

  const dateStr = doc ? fmtDate(resolveDisplayDate(doc)) : "";
  const typeLabel = doc?.type ? TYPE_LABELS[doc.type] || "Actualité" : null;
  const isEvent = doc?.kind === "evenement";

  const resolveUrl = (u) =>
    u && u.startsWith("http") ? u : `${API_BASE}${u || ""}`;

  const hasDocs = !!(doc?.documents && doc.documents.length);
  const hasPoster = !!doc?.cardImage?.url;

  return (
    <div className="event-page">
      {/* ===== HERO ===== */}
      <header className="hero">
        <div className="container">
          <div className="heroCard">
            {!!typeLabel && <span className="eyebrow">{typeLabel}</span>}
            <h1 className="title">{loading ? "Chargement…" : doc?.title}</h1>

            <div className="meta">
              <span className="metaItem">
                <FaCalendarAlt />
                <span>{loading ? "…" : dateStr}</span>
              </span>

              {doc?.author?.name && (
                <>
                  <span className="dot" />
                  <span className="metaItem">
                    <FaUser />
                    <span>
                      Par {doc.author.name}
                      {doc.author.role ? ` — ${doc.author.role}` : ""}
                    </span>
                  </span>
                </>
              )}

              {isEvent && doc?.event?.location && (
                <>
                  <span className="dot" />
                  <span className="metaItem">
                    <FaMapMarkerAlt />
                    <span>{doc.event.location}</span>
                  </span>
                </>
              )}
            </div>

            {/* label chips (status, departments) */}
            <div className="chips">
              {doc?.status && (
                <span className="chip">
                  <FaInfoCircle /> {doc.status}
                </span>
              )}
              {doc?.departments?.length > 0 && (
                <span className="chip">
                  <FaTag /> {doc.departments.join(", ")}
                </span>
              )}
            </div>
          </div>

          {doc?.subtitle && (
            <div className="callout">
              <p className="calloutText">{doc.subtitle}</p>
            </div>
          )}
        </div>
      </header>

      {/* ===== BODY ===== */}
      <section className="shell">
        <div className="container">
          <div className="grid">
            {/* MAIN */}
            <div className="main">
              {/* Event info (only if kind=evenement) */}
              {isEvent && (
                <div className="card info-card">
                  <h3 className="card-title">
                    <FaInfoCircle className="card-icon" /> Informations de l’événement
                  </h3>
                  <ul className="kv">
                    {doc?.event?.startAt && (
                      <li className="kv-item">
                        <span className="kv-key">Début:</span>
                        <span className="kv-value">
                          {fmtDate(doc.event.startAt)} &nbsp;·&nbsp;{" "}
                          <FaClock className="inline-ic" /> {fmtTime(doc.event.startAt)}
                        </span>
                      </li>
                    )}
                    {doc?.event?.endAt && (
                      <li className="kv-item">
                        <span className="kv-key">Fin:</span>
                        <span className="kv-value">
                          {fmtDate(doc.event.endAt)} &nbsp;·&nbsp;{" "}
                          <FaClock className="inline-ic" /> {fmtTime(doc.event.endAt)}
                        </span>
                      </li>
                    )}
                    {doc?.event?.location && (
                      <li className="kv-item">
                        <span className="kv-key">Lieu:</span>
                        <b className="kv-value">{doc.event.location}</b>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Content (HTML or raw-text justified) */}
              <article className="card content-card">
                {loading ? (
                  <p className="muted">Chargement…</p>
                ) : looksLikeHTML(doc?.content) ? (
                  <div
                    className="content content-html"
                    dangerouslySetInnerHTML={{ __html: doc?.content || "" }}
                  />
                ) : (
                  <div className="content content-raw">
                    {(doc?.content || "")
                      .split(/\n{2,}/) // paragraph breaks on blank lines
                      .map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                  </div>
                )}
              </article>

              {/* Poster / flyer (after text) */}
              {hasPoster && (
                <figure className="poster card">
                  <img
                    src={resolveUrl(doc.cardImage.url)}
                    alt={doc.cardImage.alt || "Affiche de l’événement"}
                    className="poster-img"
                  />
                  {doc.cardImage.alt && (
                    <figcaption className="poster-cap">{doc.cardImage.alt}</figcaption>
                  )}
                </figure>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="side">
              <div className="card info-card">
                <h3 className="card-title">
                  <FaInfoCircle className="card-icon" /> Infos rapides
                </h3>
                <ul className="kv">
                  {!!typeLabel && (
                    <li className="kv-item">
                      <span className="kv-key">Type:</span>
                      <b className="kv-value">{typeLabel}</b>
                    </li>
                  )}
                  {doc?.updatedAt && (
                    <li className="kv-item">
                      <span className="kv-key">M.A.J.:</span>
                      <b className="kv-value">
                        {new Date(doc.updatedAt).toLocaleDateString("fr-FR")}
                      </b>
                    </li>
                  )}
                  {doc?.kind && (
                    <li className="kv-item">
                      <span className="kv-key">Nature:</span>
                      <b className="kv-value">
                        {doc.kind === "evenement" ? "Événement" : "Actualité"}
                      </b>
                    </li>
                  )}
                </ul>
              </div>

              {hasDocs && (
                <div className="card docs-card">
                  <h3 className="card-title">
                    <FaFilePdf className="card-icon" /> Documents
                  </h3>
                  <ul className="docs-list">
                    {(doc.documents || []).map((d, i) => (
                      <li key={i} className="docs-item">
                        <a
                          href={resolveUrl(d.url)}
                          target="_blank"
                          rel="noreferrer"
                          className="link"
                        >
                          {d.label || d.name || "Document"} [{d.type || "PDF"}]
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {doc?.type && (
                <div className="card info-card">
                  <h3 className="card-title">
                    <FaTag className="card-icon" /> Plus dans « {TYPE_LABELS[doc.type] || "Actualité"} »
                  </h3>
                  <Link href={`/events-list?type=${doc.type}`} className="btn btn-ghost">
                    Voir toutes
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ===== STYLES (kept identical rhythm; added poster + justified text) ===== */}
      <style jsx>{`
        .event-page {
          --accent: #2177CE;
          --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
          --border: #e9edf3;
          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #000;
          line-height: 1.5;
        }

        .container {
          --container-w: 1400px;
          width: min(var(--container-w), 100%);
          margin: 0 auto;
          padding: 0 16px;
        }
        @media (min-width: 1600px) {
          .container { --container-w: 1440px; }
        }

        .hero {
          padding: 170px 0 24px;
          background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
        }
        .heroCard {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 18px;
          box-shadow: var(--shadow-sm);
        }
        .eyebrow {
          font-size: 14px;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 10px;
          display: block;
        }
        .title {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 10px;
          color: var(--accent);
        }

        .meta { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 14px; font-size: 14px; color: #0f172a; margin-top: 4px; }
        .metaItem { display: inline-flex; align-items: center; gap: 8px; }
        .dot { width: 4px; height: 4px; border-radius: 999px; background: rgba(0,0,0,0.25); }

        .chips { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
        .chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 10px; border-radius: 999px;
          background: #EAF3FE; color: var(--accent);
          border: 1px solid #e7eef8; font-weight: 700; font-size: 12px;
        }

        .callout { margin-top: 12px; background: #f3f7ff; border-radius: 10px; padding: 12px 14px; border-left: 4px solid var(--accent); }
        .calloutText { margin: 0; color: #334155; }

        .shell { padding: 32px 0 40px; }
        .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 32px; }
        @media (max-width: 992px) { .grid { grid-template-columns: 1fr; } }

        .main { display: grid; gap: 16px; }
        .side { display: flex; flex-direction: column; gap: 16px; }

        .card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 18px;
          box-shadow: var(--shadow-sm);
        }
        .card-title { font-size: 16px; font-weight: 800; margin: 0 0 10px; display: flex; align-items: center; gap: 8px; color: var(--accent); }
        .card-icon { color: var(--accent); font-size: 18px; }

        .kv { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
        .kv-item { display: grid; grid-template-columns: 1fr auto; gap: 12px; font-size: 14px; }
        .kv-key { color: #6b7280; font-weight: 600; }
        .kv-value { color: #0f172a; font-weight: 700; text-align: right; }
        .inline-ic { vertical-align: -2px; }

        .docs-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; }
        .docs-item { font-size: 14px; }
        .link { color: #0f172a; text-decoration: none; }
        .link:hover { text-decoration: underline; }

        .content-card { padding: 0; }
        .content { padding: 16px 18px; }
        .content-html :global(h2) { font-size: 20px; margin: 12px 0 8px; color: var(--accent); }
        .content-html :global(p) { margin: 0 0 12px; color: #0f172a; }
        .content-html :global(ul) { padding-left: 18px; margin: 0 0 12px; }
        .content-html :global(a) { color: var(--accent); text-decoration: underline; }

        /* Raw text: justified with line breaks preserved */
        .content-raw { white-space: pre-wrap; text-align: justify; text-justify: inter-word; }
        .content-raw p { margin: 0 0 12px; }

        /* Poster / flyer */
        .poster { padding: 0; overflow: hidden; }
        .poster-img {
          display: block;
          width: 100%;
          max-width: 820px;
          margin: 0 auto;
          height: auto;
          border-radius: 10px;
        }
        .poster-cap {
          text-align: center;
          color: #6b7280;
          font-size: 13px;
          padding: 8px 10px 12px;
        }
      `}</style>
    </div>
  );
}
