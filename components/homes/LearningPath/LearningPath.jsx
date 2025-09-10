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
              <h2 className="sectionTitle__title ">Notre Mission & Vision</h2>
              <p className="mv-sub">
                Former, innover et rayonner — au service du Maroc et de sa transformation.
              </p>
              <span aria-hidden className="mv-underline" />
            </div>
          </div>
        </div>

        {/* Mission + Vision */}
        <div className="row y-gap-30 pt-40">
          {/* Mission */}
          <div className="col-lg-6">
            <article className="mv-card">
              <header className="mv-card__head">
                <span className="ic-badge" aria-hidden>
                  {/* shield-check */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3l7 4v5.5c0 4.5-3.1 7.9-7 8.5-3.9-.6-7-4-7-8.5V7l7-4Z" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M9 12l2.2 2.2 4.8-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <h3 className="mv-card__title">Notre Mission</h3>
              </header>

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

          {/* Vision */}
          <div className="col-lg-6">
            <article className="mv-card">
              <header className="mv-card__head">
                <span className="ic-badge" aria-hidden>
                  {/* eye / target */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6"/>
                    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6"/>
                  </svg>
                </span>
                <h3 className="mv-card__title">Notre Vision</h3>
              </header>

              <p className="mv-card__lead">
                Être un pôle d&apos;excellence reconnu internationalement dans l&apos;enseignement
                supérieur scientifique et technique, moteur d&apos;innovation et de développement durable.
              </p>
            </article>
          </div>
        </div>

        {/* Valeurs */}
        <div className="row justify-center text-center pt-50">
          <div className="col-auto">
            <h3 className="sectionTitle__title">Nos Valeurs</h3>
            <span aria-hidden className="mv-values-underline" />
          </div>
        </div>

        <div className="row y-gap-20 pt-20">
          <div className="col-lg-3 col-md-6">
            <div className="val-card">
              <span className="ic-badge lg" aria-hidden>
                {/* star */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3.8l2.3 4.7 5.2.8-3.8 3.7.9 5.3-4.6-2.4-4.6 2.4.9-5.3-3.8-3.7 5.2-.8L12 3.8Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </span>
              <div className="val-main">Excellence</div>
              <div className="val-sub">Académique</div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="val-card">
              <span className="ic-badge lg" aria-hidden>
                {/* flask / science */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M10 2v4l-5 9.5a4 4 0 003.5 6.5h7a4 4 0 003.5-6.5L14 6V2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M9 10h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </span>
              <div className="val-main">Innovation</div>
              <div className="val-sub">Scientifique</div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="val-card">
              <span className="ic-badge lg" aria-hidden>
                {/* globe */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 12h18M12 3c3.5 3.7 3.5 13.3 0 18-3.5-4.7-3.5-13.3 0-18Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </span>
              <div className="val-main">Ouverture</div>
              <div className="val-sub">Nationale et internationale</div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="val-card">
              <span className="ic-badge lg" aria-hidden>
                {/* users / community */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3.5 19a5.5 5.5 0 0111 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="17" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M14.6 19c.3-1.9 1.9-3.4 4-3.4 1 0 1.9.3 2.6.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </span>
              <div className="val-main">Engagement Social</div>
              <div className="val-sub">Inclusion et diversité</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root{
          --accent: #2177CE;
          --accent-2: #2A86EE;
          --text: #0f172a;
          --muted: #475569;
          --border: #e9edf3;
          --light-blue: #EAF3FE;    /* app light blue for icons */
          --radius: 14px;
          --shadow-sm: 0 6px 18px rgba(15,23,42,.06);
          --shadow-md: 0 18px 42px rgba(15,23,42,.14);
        }

        .mv-section{ background:#fff; }

        /* Header */
        .mv-header{ display:grid; gap:10px; }
        .mv-kicker{
          display:inline-block; padding:6px 10px; border-radius:999px;
          border:1px solid #e7eef8; background:var(--light-blue);
          color:var(--accent); font-weight:800; letter-spacing:.1px; line-height:1; font-size:12px;
        }
        .mv-title{
          margin:2px 0 2px; color:#0f172a;
          font-weight:800; letter-spacing:.1px; line-height:1;
          font-size:clamp(28px,4.2vw,36px);
        }
        .mv-sub{ margin:0; color:#596579; }
        .mv-underline{
          justify-self:center; width:64px; height:3px; border-radius:999px;
          background:linear-gradient(90deg,var(--accent),var(--accent-2));
        }

        /* Card */
        .mv-card{
          border:1.5px solid #116FCB; border-radius:12px; background:#fff;
          padding:16px 16px 18px; box-shadow:var(--shadow-sm);
          transition:transform .18s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .mv-card:hover{ transform:translateY(-3px); box-shadow:var(--shadow-md); border-color:#dbe3ee; }

        .mv-card__head{ display:flex; align-items:center; gap:10px; margin-bottom:10px; }
        .mv-card__title{
          margin:0; color:var(--text);
          font-weight:650; letter-spacing:.1px; line-height:1; font-size:18px;
        }
        .ic-badge{
          display:inline-flex; align-items:center; justify-content:center;
          width:36px; height:36px; border-radius:10px;
          background:var(--light-blue); color:var(--accent);
          box-shadow:inset 0 0 0 1px #e7eef8;
        }
        .ic-badge.lg{ width:44px; height:44px; border-radius:12px; }

        .mv-card__lead{ margin:0 0 10px; color:#0f172a; line-height:1.6; }

        .mv-list{ margin:10px 0 0; padding:0; list-style:none; display:grid; gap:8px; }
        .mv-list li{ position:relative; padding-left:22px; color:#4b5563; }
        .mv-list li:before{
          content:"✓"; position:absolute; left:0; top:0; line-height:1;
          color:var(--accent); font-weight:800;
        }

        /* Values */
        .mv-values-title{
          margin:0; color:#0f172a;
          font-weight:800; letter-spacing:.1px; line-height:1; font-size:20px;
        }
        .mv-values-underline{
          display:block; width:72px; height:3px; margin:10px auto 0;
          border-radius:999px; background:linear-gradient(90deg,var(--accent),var(--accent-2));
        }

        .val-card{
          border:1px solid #116FCB;; border-radius:12px; background:#fff;
          padding:16px; box-shadow:var(--shadow-sm);
          display:grid; justify-items:center; gap:10px;
          transition:transform .18s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .val-card:hover{ transform:translateY(-3px); box-shadow:var(--shadow-md); border-color:#dbeafe; }

        .val-main{
          color:#0f172a; font-weight:800; letter-spacing:.1px; line-height:1; font-size:15px;
          text-align:center;
        }
        .val-sub{ color:#64748b; font-size:12px; text-align:center; }

        @media (max-width: 992px){
          .mv-card{ padding:14px; }
          .mv-card__title{ font-size:17px; }
        }
      `}</style>
    </section>
  );
}
