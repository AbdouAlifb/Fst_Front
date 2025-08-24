"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { fetchFiliere } from "@/services/filiereService";

/**
 * CourseDetailsTwo — polished JSX version
 * - Sticky in-page nav with active section
 * - Hero with built-in gradient overlay (no global overlay bug)
 * - Compact chips, clean cards, hover effects
 * - Program year cards with dot accent
 * - Documents as clickable rows
 * - Sticky right info panel with optional brochure CTA
 * - Skeletons during load
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const SECTIONS = [
  { id: "overview", label: "Aperçu" },
  { id: "course-content", label: "Programme" },
  { id: "instructors", label: "Coordinateur" },
  { id: "documents", label: "Documents" },
];

function resolveUrl(u) {
  if (!u) return "";
  return u.startsWith("http") ? u : `${API_BASE}${u}`;
}

export default function CourseDetailsTwo({ id }) {
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const observerRef = useRef(null);

  // Load filière
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchFiliere(id); // accepts slug or id
        if (alive) setDoc(data);
      } catch (e) {
        console.error("[CourseDetailsTwo] load failed:", e);
        if (alive) setDoc(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  // Observe sections for active nav highlight
  useEffect(() => {
    const opts = {
      rootMargin: "-120px 0px -65% 0px",
      threshold: [0, 0.2, 0.4, 0.6],
    };
    observerRef.current = new IntersectionObserver((entries) => {
      const topMost = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (topMost && topMost.target && topMost.target.id)
        setActiveId(topMost.target.id);
    }, opts);

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current && observerRef.current.disconnect();
  }, [loading]);

  const hero = useMemo(() => {
    const u =
      (doc && doc.heroImage && doc.heroImage.url) ||
      (doc && doc.cardImage && doc.cardImage.url);
    return u ? resolveUrl(u) : null;
  }, [doc]);

  const isNew = useMemo(() => {
    if (!doc || !doc.createdAt) return false;
    const days = (Date.now() - new Date(doc.createdAt).getTime()) / 86400000;
    return days < 60;
  }, [doc]);

  return (
    <div id="js-pin-container" className="js-pin-container relative">
      {/* ====== HEADER ====== */}
      <section
        className="page-header -type-5 bg-dark-1"
        style={{ position: "relative" }}
      >
        <div className="page-header__bg">
          <div
            className="bg-image js-lazy"
            style={
              hero
                ? {
                    backgroundImage: `linear-gradient(180deg, rgba(12,12,24,.55) 0%, rgba(12,12,24,.70) 60%, rgba(12,12,24,.80) 100%), url(${hero})`,
                  }
                : { background: "linear-gradient(140deg,#1b1f3b,#6541f5)" }
            }
          />
        </div>

        <div className="container">
          <div
            className="page-header__content pt-90 pb-90"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="row y-gap-30 relative">
              <div className="col-xl-9 col-lg-10">
                {/* badges */}
                <div className="d-flex x-gap-15 y-gap-10 pb-16">
                  {doc && doc.degreeLevel ? (
                    <span className="badge px-15 py-8 text-11 bg-purple-1 text-white fw-400">
                      {String(doc.degreeLevel).replace("-", " ").toUpperCase()}
                    </span>
                  ) : null}
                  {isNew ? (
                    <span className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">
                      NOUVEAU
                    </span>
                  ) : null}
                  {doc && doc.isFeatured ? (
                    <span className="badge px-15 py-8 text-11 bg-green-1 text-dark-1 fw-400">
                      MISE EN AVANT
                    </span>
                  ) : null}
                </div>

                <h1 className="text-30 lh-14 text-white pr-60 lg:pr-0">
                  {loading ? "Chargement…" : (doc && doc.title) || "Filière"}
                </h1>

                {doc && doc.subtitle ? (
                  <p className="col-xl-9 mt-16 text-white opacity-90">
                    {doc.subtitle}
                  </p>
                ) : null}

                {/* chips */}
                {!loading ? (
                  <div className="d-flex x-gap-25 y-gap-10 items-center flex-wrap pt-18">
                    {doc && doc.durationYears ? (
                      <Chip icon="icon-wall-clock">
                        Durée {doc.durationYears} ans
                      </Chip>
                    ) : null}
                    {doc && doc.semesters ? (
                      <Chip icon="icon-book-open">
                        {doc.semesters} semestres
                      </Chip>
                    ) : null}
                    {doc && doc.creditsECTS ? (
                      <Chip icon="icon-layers">{doc.creditsECTS} ECTS</Chip>
                    ) : null}
                    {doc &&
                    Array.isArray(doc.departments) &&
                    doc.departments.length > 0 ? (
                      <Chip icon="icon-academic-cap">
                        {doc.departments.join(", ")}
                      </Chip>
                    ) : null}
                  </div>
                ) : null}

                {/* back to formation */}
                {doc && doc.formation && doc.formation.title ? (
                  <div className="d-flex items-center pt-18">
                    <Link
                      className="button -sm -white text-dark-1"
                      href={`/courses-list-4?formation=${encodeURIComponent(
                        doc.formation.slug || doc.formation._id
                      )}`}
                    >
                      ← Retour : {doc.formation.title}
                    </Link>
                  </div>
                ) : null}

                {/* Optional CTA in hero if brochure exists */}
                {doc && doc.brochure && doc.brochure.url ? (
                  <div className="d-flex items-center pt-12">
                    <a
                      className="button -sm -purple-1"
                      href={resolveUrl(doc.brochure.url)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Télécharger la brochure
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* sticky in-page nav */}
        <div
          className="border-top-light"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            backdropFilter: "blur(6px)",
            background: "rgba(12,12,24,0.72)",
          }}
        >
          <div className="container">
            <nav className="cd-subnav d-flex x-gap-30 overflow-auto no-scrollbar py-12">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`pb-12 page-nav-menu__link ${
                    activeId === s.id ? "is-active" : ""
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* ====== CONTENT ====== */}
      <section className="layout-pt-md layout-pb-md">
        <div className="container">
          <div className="row">
            {/* Main column */}
            <div className="col-lg-8">
              {/* ===== Overview ===== */}
              <div id="overview" className="mt-30">
                <h3 className="text-20">Aperçu</h3>
                <div className="text-light-1 mt-20 content-style">
                  {loading ? (
                    <Skeleton lines={4} />
                  ) : doc && doc.overview ? (
                    <div dangerouslySetInnerHTML={{ __html: doc.overview }} />
                  ) : (
                    <p>À venir.</p>
                  )}
                </div>

                {/* Objectifs / Débouchés / Poursuites */}
                <div className="row y-gap-30 mt-30">
                  {doc &&
                  Array.isArray(doc.objectifs) &&
                  doc.objectifs.length > 0 ? (
                    <div className="col-md-6">
                      <Card title="Objectifs" className="cd-card">
                        <ul className="ul-list y-gap-8">
                          {doc.objectifs.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  ) : null}
                  {doc &&
                  Array.isArray(doc.debouches) &&
                  doc.debouches.length > 0 ? (
                    <div className="col-md-6">
                      <Card title="Débouchés" className="cd-card">
                        <ul className="ul-list y-gap-8">
                          {doc.debouches.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  ) : null}
                  {doc &&
                  Array.isArray(doc.poursuites) &&
                  doc.poursuites.length > 0 ? (
                    <div className="col-12">
                      <Card title="Poursuites d’études" className="cd-card">
                        <ul className="ul-list y-gap-8">
                          {doc.poursuites.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* ===== Programme ===== */}
              <div id="course-content" className="mt-60">
                <h3 className="text-20">Programme</h3>
                <p className="text-light-1 mt-10">
                  Parcours détaillé{" "}
                  {doc && doc.durationYears ? `sur ${doc.durationYears} ans` : ""}
                  .
                </p>

                <div className="row x-gap-20 y-gap-20 pt-20">
                  {(doc && doc.programme ? doc.programme : []).map(
                    (year, idx) => (
                      <div className="col-md-4" key={idx}>
                        <div className="cd-year rounded-8 border-light bg-white shadow-1 py-20 px-20">
                          <div className="text-15 fw-700 mb-12 d-flex items-center">
                            <span className="dot size-20 rounded-full mr-10" />
                            {(year && year.label) || `Année ${idx + 1}`}
                          </div>
                          <ul className="ul-list y-gap-8">
                            {(year && year.items ? year.items : []).map(
                              (m, i) => (
                                <li key={i}>{m}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* ===== Coordinateur ===== */}
              <div id="instructors" className="mt-60">
                <h3 className="text-20">Coordinateur</h3>
                {doc && doc.coordinator ? (
                  <div className="row y-gap-20 pt-20">
                    <div className="col-12">
                      <div className="d-flex items-start x-gap-15 rounded-8 border-light bg-white shadow-1 p-20">
                        <div className="icon icon-person-3 text-30 text-purple-1" />
                        <div>
                          <div className="text-16 fw-700">
                            {doc.coordinator.name || "-"}
                          </div>
                          <div className="text-14 text-light-1">
                            {doc.coordinator.role || ""}
                          </div>
                          {doc.coordinator.email ? (
                            <div className="text-14 mt-5">
                              {doc.coordinator.email}
                            </div>
                          ) : null}
                          {doc.coordinator.phone ? (
                            <div className="text-14 mt-5">
                              {doc.coordinator.phone}
                            </div>
                          ) : null}
                          {doc.coordinator.office ? (
                            <div className="text-14 mt-5">
                              {doc.coordinator.office}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-light-1 mt-10">Non renseigné.</p>
                )}
              </div>

              {/* ===== Documents ===== */}
              <div id="documents" className="mt-60">
                <h3 className="text-20">Documents à télécharger</h3>
                {doc && Array.isArray(doc.documents) && doc.documents.length > 0 ? (
                  <div className="row y-gap-12 pt-15">
                    {doc.documents.map((d, i) => (
                      <div key={i} className="col-md-6">
                        <a
                          className="cd-doc d-flex items-center x-gap-12 rounded-8 border-light bg-white shadow-1 py-14 px-16"
                          href={resolveUrl(d.url)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="icon icon-file-2 text-18 text-purple-1" />
                          <div>
                            <div className="text-14 fw-600">
                              {d.label || "Document"}
                            </div>
                            <div className="text-12 text-light-1">
                              {d.type ? `${d.type}` : "PDF"}
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-light-1 mt-10">Aucun document disponible.</p>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="col-lg-4">
              <div
                className="cd-card cd-sticky rounded-8 border-light bg-white shadow-1 p-20"
                style={{ top: 96 }}
              >
                <h4 className="text-18 mb-10">Infos rapides</h4>
                <ul className="ul-list y-gap-8">
                  {doc && doc.formation && doc.formation.title ? (
                    <li>
                      Formation:{" "}
                      <Link
                        href={`/courses-list-4?formation=${encodeURIComponent(
                          doc.formation.slug || doc.formation._id
                        )}`}
                        className="linkCustom"
                      >
                        {doc.formation.title}
                      </Link>
                    </li>
                  ) : null}
                  {doc && doc.status ? (
                    <li>
                      Statut:{" "}
                      {doc.status === "published"
                        ? "Publié"
                        : doc.status === "draft"
                        ? "Brouillon"
                        : "Archivé"}
                    </li>
                  ) : null}
                  {doc && doc.updatedAt ? (
                    <li>
                      MAJ: {new Date(doc.updatedAt).toLocaleDateString("fr-FR")}
                    </li>
                  ) : null}
                  {doc && doc.brochure && doc.brochure.url ? (
                    <li className="pt-8">
                      <a
                        className="button -md -purple-1 w-100"
                        href={resolveUrl(doc.brochure.url)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Télécharger la brochure
                      </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoped visual polish */}
      <style jsx>{`
        /* Cards */
        .cd-card {
          border-radius: 12px;
          border: 1px solid rgba(16, 24, 40, 0.06);
          box-shadow: 0 10px 30px rgba(2, 6, 23, 0.06);
          background: #fff;
        }
        .cd-sticky {
          position: sticky;
        }

        /* Chips (on hero) */
        .cd-chip {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #fff;
          backdrop-filter: blur(6px);
        }
        .cd-chip :global(i.icon) {
          opacity: 0.9;
        }

        /* Programme years */
        .cd-year {
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .cd-year:hover {
          box-shadow: 0 12px 34px rgba(2, 6, 23, 0.1);
          transform: translateY(-2px);
        }
        .cd-year .dot {
          background: radial-gradient(
            closest-side,
            #7b5cff 0%,
            #c4b5fd 70%,
            transparent 71%
          );
          opacity: 0.85;
        }

        /* Documents rows */
        .cd-doc {
          transition: background 0.15s ease, box-shadow 0.15s ease;
        }
        .cd-doc:hover {
          background: #f8fafc;
          box-shadow: 0 8px 20px rgba(2, 6, 23, 0.06);
        }

        /* Sub-nav active state underline + subtle border */
        .cd-subnav {
          border-bottom: 1px solid rgba(16, 24, 40, 0.08);
        }
        :global(.page-nav-menu__link.is-active) {
          color: #0f172a !important;
          font-weight: 600;
          position: relative;
        }
        :global(.page-nav-menu__link.is-active)::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          height: 3px;
          border-radius: 3px;
          background: linear-gradient(90deg, #7b5cff, #3b82f6);
        }

        /* Lists inside cards */
        :global(.ul-list) li {
          color: #0f172a;
        }
        :global(.ul-list) li + li {
          margin-top: 6px;
        }

        /* Section headings spacing */
        :global(h3.text-20) {
          margin-bottom: 6px;
        }
      `}</style>
    </div>
  );
}

/* ---------- UI bits ---------- */
function Chip({ icon, children }) {
  return (
    <span className="cd-chip d-inline-flex items-center x-gap-8 rounded-200 px-12 py-8 text-12">
      {icon ? <i className={`icon ${icon} text-13`} /> : null}
      {children}
    </span>
  );
}

function Card({ title, children, className = "" }) {
  return (
    <div className={`rounded-8 border-light bg-white shadow-1 p-20 ${className}`}>
      {title ? <div className="text-16 fw-700 mb-12">{title}</div> : null}
      {children}
    </div>
  );
}

function Skeleton({ lines = 3 }) {
  return (
    <div className="y-gap-10">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="bg-light-4" style={{ height: 12, borderRadius: 6 }} />
      ))}
    </div>
  );
}
