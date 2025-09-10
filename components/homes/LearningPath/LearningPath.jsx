"use client";

import React from "react";

export default function LearningPath() {
  return (
    <section className="mv-section layout-pt-lg layout-pb-lg">
      <div className="container">
        {/* Header */}
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="mv-header">
              <span className="mv-kicker">Mission • Vision • Valeurs</span>
              <h2 className="mv-title">Notre Mission & Vision</h2>
              <p className="mv-sub">
                Former, innover et rayonner — au service du Maroc et de sa transformation.
              </p>
              <span aria-hidden className="mv-underline" />
            </div>
          </div>
        </div>

        {/* Mission + Vision */}
        <div className="row y-gap-30 pt-50">
          <div className="col-lg-6">
            <article className="mv-card">
              <div className="mv-card__stripe" />
              <h3 className="mv-card__title">Notre Mission</h3>
              <p className="mv-card__lead">
                Former des cadres scientifiques et techniques de haut niveau, capables de contribuer
                au développement économique, social et technologique du Maroc.
              </p>
              <ul className="mv-list">
                <li>Excellence académique dans l&apos;enseignement supérieur</li>
                <li>Recherche scientifique innovante et appliquée</li>
                <li>Partenariats avec le secteur industriel</li>
              </ul>
            </article>
          </div>

          <div className="col-lg-6">
            <article className="mv-card">
              <div className="mv-card__stripe" />
              <h3 className="mv-card__title">Notre Vision</h3>
              <p className="mv-card__lead">
                Être un pôle d&apos;excellence reconnu internationalement dans l&apos;enseignement
                supérieur scientifique et technique, moteur d&apos;innovation et de développement durable.
              </p>
            </article>
          </div>
        </div>

        {/* Valeurs */}
        <div className="row justify-center text-center pt-60">
          <div className="col-auto">
            <h3 className="mv-values-title">Nos Valeurs</h3>
            <span aria-hidden className="mv-values-underline" />
          </div>
        </div>

        <div className="row y-gap-20 pt-30">
          <div className="col-lg-3 col-md-6">
            <div className="val-card">
              <div className="val-main">Excellence</div>
              <div className="val-sub">Académique</div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="val-card">
              <div className="val-main">Innovation</div>
              <div className="val-sub">Scientifique</div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="val-card">
              <div className="val-main">Ouverture</div>
              <div className="val-sub">Nationale et internationale</div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="val-card">
              <div className="val-main">Engagement Social</div>
              <div className="val-sub">Inclusion et diversité</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --accent: #2177CE;
          --accent-2: #2A86EE;
          --text: #0f172a;
          --muted: #475569;
          --border: #e9edf3;
          --bg-soft: #f6f8fb;
          --radius: 16px;
          --shadow-sm: 0 6px 18px rgba(15, 23, 42, 0.06);
          --shadow-md: 0 18px 42px rgba(15, 23, 42, 0.14);
          --blob: radial-gradient(40% 60% at 70% 20%, #2a86ee20 0%, transparent 70%),
                   radial-gradient(30% 40% at 20% 80%, #2177ce1a 0%, transparent 60%);
        }

        .mv-section {
          position: relative;
          isolation: isolate;
          background:
            linear-gradient(180deg, #ffffff 0%, #fbfdff 60%, #ffffff 100%),
            var(--blob);
        }

        /* Header */
        .mv-header { position: relative; display: grid; gap: 10px; }
        .mv-kicker {
          display: inline-block;
          padding: 6px 10px;
          border: 1px solid #e7eef8;
          border-radius: 999px;
          background: #EAF3FE;
          color: var(--accent);
          font-weight: 800;
          letter-spacing: 0.1px;
          line-height: 1;
          font-size: 12px;
        }
        .mv-title {
          margin: 2px 0 2px;
          color: var(--text);
          font-weight: 800;
          letter-spacing: 0.1px;
          line-height: 1;
          font-size: clamp(28px, 4.2vw, 40px);
        }
        .mv-sub {
          margin: 0;
          color: var(--muted);
        }

        .mv-underline {
          justify-self: center;
          width: 0;
          height: 3px;
          margin-top: 10px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          transition: width .45s cubic-bezier(.2, .8, .2, 1);
        }
        .mv-header:hover .mv-underline {
          width: 160px;
        }

        /* Cards */
        .mv-card {
          position: relative;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          background: #fff;
          padding: 18px 18px 20px;
          box-shadow: var(--shadow-sm);
          transition: transform .18s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease;
          will-change: transform;
        }
        .mv-card__stripe {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: var(--radius);
          padding: 1px; /* gradient border trick */
          background: linear-gradient(135deg, #dce6f5 0%, #e9f0fb 40%, #ffffff 60%, #d8e9ff 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
        }
        .mv-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: #dbe3ee;
          background: linear-gradient(180deg, #ffffff 0%, #fcfdff 100%);
        }
        .mv-card__title {
          margin: 0 0 10px;
          color: var(--accent);
          font-weight: 800;
          letter-spacing: 0.1px;
          line-height: 1;
          font-size: 20px;
        }
        .mv-card__lead {
          margin: 0 0 12px;
          color: var(--text);
          line-height: 1.65;
        }

        /* Bullet list with animated checkmarks */
        .mv-list {
          margin: 12px 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
        }
        .mv-list li {
          position: relative;
          padding-left: 28px;
          color: var(--muted);
          line-height: 1.6;
        }
        .mv-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          font-weight: 800;
          letter-spacing: 0.1px;
          line-height: 1;
          color: var(--accent);
          transform: translateY(2px) scale(0.9);
          transition: transform .2s ease, color .2s ease;
        }
        .mv-card:hover .mv-list li::before {
          transform: translateY(2px) scale(1);
          color: var(--accent-2);
        }

        /* Valeurs */
        .mv-values-title {
          margin: 0;
          color: var(--text);
          font-weight: 800;
          letter-spacing: 0.1px;
          line-height: 1;
          font-size: 22px;
        }
        .mv-values-underline {
          display: block;
          width: 0;
          height: 3px;
          margin: 10px auto 0;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          transition: width .45s cubic-bezier(.2, .8, .2, 1);
        }
        .mv-values-title:hover + .mv-values-underline {
          width: 120px;
        }

        .val-card {
          position: relative;
          border-radius: 14px;
          padding: 16px 16px 14px;
          background:
            linear-gradient(180deg, #EAF3FE 0%, #f3f8ff 100%);
          border: 1px solid #e7eef8;
          box-shadow: var(--shadow-sm);
          transition: transform .18s ease, box-shadow .25s ease, border-color .25s ease;
          will-change: transform;
        }
        .val-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 14px;
          background: radial-gradient(60% 60% at 80% 20%, #2a86ee1a 0%, transparent 60%);
          opacity: 0;
          transition: opacity .25s ease;
        }
        .val-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: #dbeafe;
        }
        .val-card:hover::after { opacity: 1; }

        .val-main {
          color: var(--text);
          font-weight: 800;
          letter-spacing: 0.1px;
          line-height: 1;
          font-size: 18px;
        }
        .val-sub {
          color: #3b556e;
          font-size: 13px;
          margin-top: 6px;
          line-height: 1.35;
        }

        @media (max-width: 992px) {
          .mv-card { padding: 16px; }
          .mv-card__title { font-size: 19px; }
        }
      `}</style>
    </section>
  );
}
