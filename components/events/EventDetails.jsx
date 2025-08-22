"use client";

import React, { useEffect, useState } from "react";
import { fetchActualite } from "@/services/actualiteService";

const TYPE_LABELS = {
  academique: "Événements académiques",
  administratif: "Annonces administratives",
  recherche: "Recherche",
  "vie-etudiante": "Vie étudiante",
  appel: "Appel à candidatures",
  autre: "Actualité",
};

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

  const resolveDate = (d) =>
    d?.displayDate || d?.event?.startAt || d?.publishedAt || d?.createdAt;

  const dateStr =
    doc && resolveDate(doc)
      ? new Date(resolveDate(doc)).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

  const typeLabel = doc?.type ? TYPE_LABELS[doc.type] || "Actualité" : null;

  return (
    <>
      {/* HERO */}
      <section className="layout-pt-lg">
        <div className="container">
          <div className="heroCard">
            {typeLabel && (
              <span className="badge bg-blue-1 text-white heroPill">
                {typeLabel}
              </span>
            )}

            <h1 className="heroTitle">
              {loading ? "Chargement…" : doc?.title}
            </h1>

            <div className="heroMeta">
              <span className="metaItem">
                <i className="icon icon-calendar-2" />
                <span>{loading ? "…" : dateStr}</span>
              </span>

              {doc?.author?.name && (
                <>
                  <span className="dot" />
                  <span className="metaItem">
                    <i className="icon icon-user" />
                    <span>
                      Par {doc.author.name}
                      {doc.author.role ? ` — ${doc.author.role}` : ""}
                    </span>
                  </span>
                </>
              )}

              {doc?.kind === "evenement" && doc?.event?.location && (
                <>
                  <span className="dot" />
                  <span className="metaItem">
                    <i className="icon icon-location" />
                    <span>{doc.event.location}</span>
                  </span>
                </>
              )}
            </div>
          </div>

          {/* SUBTITLE CALLOUT */}
          {doc?.subtitle && (
            <div className="callout">
              <p className="calloutText">{doc.subtitle}</p>
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section className="layout-pb-lg">
        <div className="container">
          <div className="row y-gap-40">
            <div className="col-xl-9 col-lg-10">
              {loading ? (
                <p className="text-light-1">Chargement…</p>
              ) : (
                <div
                  className="content-style"
                  // Assurez-vous de nettoyer/truster le HTML côté admin
                  dangerouslySetInnerHTML={{ __html: doc?.content || "" }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* scoped styles */}
      <style jsx>{`
        .heroCard {
          background: linear-gradient(135deg, #eaf2ff 0%, #f3f0ff 100%);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 16px;
          padding: 28px 24px 26px;
          box-shadow: 0 10px 30px rgba(24, 39, 75, 0.05);
        }
        .heroPill {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
        }
        .heroTitle {
          margin-top: 14px;
          margin-bottom: 8px;
          line-height: 1.2;
          font-weight: 800;
          /* big blue title */
          color: var(--blue-1, #2563eb);
          font-size: clamp(28px, 4.6vw, 52px);
          letter-spacing: -0.02em;
        }
        .heroMeta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 14px;
          color: #0f172a; /* dark */
          font-size: 14px;
          margin-top: 8px;
        }
        .metaItem {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          line-height: 1;
        }
        .metaItem i {
          font-size: 16px;
        }
        .dot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.25);
          display: inline-block;
        }
        .callout {
          margin-top: 18px;
          background: #f3f7ff;
          border-radius: 10px;
          padding: 18px 18px;
          border-left: 4px solid var(--blue-1, #2563eb);
        }
        .calloutText {
          margin: 0;
          font-size: 16px;
          color: #334155;
        }
        @media (max-width: 576px) {
          .heroCard {
            padding: 22px 16px 18px;
          }
        }
      `}</style>
    </>
  );
}
