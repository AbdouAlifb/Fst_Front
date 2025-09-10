"use client";

import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <>
      {/* PAGE HEADER */}
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <h1 className="page-header__title">À propos de la FST Marrakech</h1>
                <p className="page-header__text">
                  Découvrez l&apos;excellence académique et l&apos;innovation scientifique qui font de
                  notre faculté un pilier de l&apos;enseignement supérieur au Maroc depuis 1994.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOT DU DOYEN */}
      <section className="dean-section">
        <div className="container">
          {/* Title band */}
          <div className="band">
            <h2 className="band__title">Mot de Monsieur le Doyen</h2>
          </div>

          <div className="grid">
            {/* LEFT: portrait */}
            <aside className="left">
              <figure className="portrait">
                <Image
                  src="/assets/img/general/doyen.jpg" /* place doyen.jpeg in /public/assets/img/about/ */
                  width={720}
                  height={480}
                  alt="Pr. Said RAKRAK, Doyen de la FST Marrakech"
                  className="portrait__img"
                  priority
                />
                <figcaption className="portrait__cap">
                  <strong>Pr. Said RAKRAK</strong>
                  <span>Doyen de la FST Marrakech</span>
                </figcaption>
              </figure>
            </aside>

            {/* RIGHT: letter */}
            <main className="right">
              {/* Lead quote */}
              <p className="lead">
                <span className="quoteMark">❝</span>
                C’est avec une immense fierté que nous vous accueillons au sein de la Faculté des
                Sciences et Techniques de Marrakech.
              </p>

              {/* First paragraph in light-blue card */}
              <div className="callout">
                <p>
                  <strong>Fondée en 1994</strong>, la Faculté des Sciences et Techniques de Marrakech
                  (FSTM), l&apos;un des quinze établissements de l&apos;Université Cadi Ayyad, incarne la
                  vision d&apos;excellence et d&apos;innovation de l&apos;université. Son projet de développement
                  s&apos;inscrit dans les axes stratégiques du Nouveau Modèle de Développement (NMD) et de
                  la stratégie nationale 2015–2030, tout en bénéficiant de l&apos;expertise de l&apos;UCA en
                  matière de formation et de recherche scientifique. Établissement à accès régulé, la
                  FSTM se distingue par la diversité de son offre de formation, structurée selon le
                  système LMD et enrichie par des parcours d&apos;ingénierie. Elle contribue activement à la
                  dynamisation de l&apos;environnement socio-économique et industriel de la région
                  Marrakech-Safi, en formant des profils polyvalents et hautement qualifiés.
                </p>
              </div>

              {/* Paragraphs */}
              <p>
                Notre conviction est que{" "}
                <a className="inlineLink" href="#">
                  l’excellence académique se mesure à sa capacité à transformer la société
                </a>
                . Nous plaçons la recherche-développement au cœur de nos priorités, en alignant nos
                efforts sur les axes stratégiques et les défis nationaux.
              </p>

              <p>
                Cette démarche nous permet de contribuer activement au progrès scientifique et au
                développement durable de notre région Marrakech-Safi et de notre pays. Par une
                synergie puissante entre formation scientifique rigoureuse et immersion
                professionnelle, nous formons des lauréats agiles et créatifs, prêts à relever les
                défis de demain.
              </p>

              {/* Soft quote box */}
              <div className="soft">
                <p>
                  Cette ambition est une œuvre collective, portée par l’enthousiasme de nos étudiants,
                  l’expertise de nos enseignants-chercheurs et le dévouement de notre personnel.
                  Ensemble, animés par une culture du mérite et de l’innovation,{" "}
                  <a className="inlineLink" href="#">
                    nous bâtissons une faculté moderne et inclusive
                  </a>
                  .
                </p>
              </div>

              {/* Closing */}
              <p className="closing">
                <span className="quoteMark">❝</span>
                Bienvenue dans un lieu où se construit l’avenir.
              </p>

              <hr className="divider" />

              <p className="signature">
                Le Doyen de la Faculté des Sciences et Techniques de Marrakech
              </p>
            </main>
          </div>
        </div>

        {/* Styles (Dean) */}
        <style jsx>{`
          :root {
            --accent: #2177ce;
            --accent-2: #2a86ee;
            --text: #0f172a;
            --muted: #475569;
            --border: #e9edf3;
            --light: #eaf3fe;
            --shadow-sm: 0 6px 18px rgba(15, 23, 42, 0.06);
          }

          .container {
            width: min(1200px, 100%);
            margin: 0 auto;
            padding: 0 16px;
          }

          .dean-section {
            padding: 28px 0 60px;
            background: #fff;
          }

          .band {
            background: #f3f8ff;
            border: 1px solid #dbeafe;
            border-radius: 8px;
            padding: 12px 16px;
            margin-bottom: 18px;
          }
          .band__title {
            margin: 0;
            color: var(--accent);
            font-weight: 650;
            letter-spacing: 0.1px;
            line-height: 1;
            font-size: 20px;
          }

          .grid {
            display: grid;
            grid-template-columns: 380px 1fr;
            gap: 28px;
            position: relative;
          }
          .grid::before {
            content: "";
            position: absolute;
            left: 380px;
            top: 8px;
            bottom: 8px;
            width: 3px;
            border-radius: 3px;
            background: linear-gradient(180deg, #cfe5ff 0%, #5aa3ff 70%, #1b6fd0 100%);
            opacity: 0.9;
          }
          @media (max-width: 992px) {
            .grid {
              grid-template-columns: 1fr;
            }
            .grid::before {
              display: none;
            }
          }

          .portrait { margin: 0; }
          .portrait__img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border);
          }
          .portrait__cap {
            text-align: center;
            margin-top: 10px;
            color: #0f172a;
          }
          .portrait__cap strong {
            display: block;
            font-weight: 800;
          }
          .portrait__cap span {
            display: block;
            color: #6b7280;
            font-size: 14px;
            margin-top: 2px;
          }

          .right { color: var(--text); }
          .lead {
            font-style: italic;
            color: #0f172a;
            margin: 6px 0 14px;
            line-height: 1.6;
          }
          .quoteMark {
            color: var(--accent-2);
            margin-right: 8px;
            font-size: 20px;
            vertical-align: baseline;
          }
          .callout {
            border-left: 4px solid var(--accent);
            background: var(--light);
            border-radius: 10px;
            padding: 14px 14px 14px 16px;
            margin-bottom: 12px;
          }
          .soft {
            background: #f5f8ff;
            border: 1px solid #e3edff;
            border-radius: 10px;
            padding: 14px;
            margin: 10px 0 14px;
          }
          .inlineLink { color: var(--accent); text-decoration: underline; }
          .closing {
            font-style: italic;
            color: #0f172a;
            margin: 10px 0 14px;
          }
          .divider {
            border: none;
            height: 1px;
            background: #eef2f7;
            margin: 14px 0 8px;
          }
          .signature {
            text-align: center;
            font-weight: 700;
            color: #0f172a;
          }
          .right p { margin: 0 0 10px; line-height: 1.7; }
        `}</style>
      </section>

      {/* PRÉSENTATION – SECTION 2 */}
      <section className="about2">
        <div className="container">
          <div className="a2-head">
            {/* <span className="a2-kicker">Présentation</span> */}
            <h2 className="page-header__title">Présentation de la FST Marrakech</h2><hr />
            <p className="a2-sub">
              La Faculté des Sciences et Techniques de Marrakech (FST Marrakech) représente depuis
              près de trois décennies un pilier d&apos;excellence dans la formation scientifique et
              technique au Maroc. Notre établissement se distingue par son approche pédagogique
              innovante et son engagement profond envers le développement régional et national.
            </p>
          </div>

          <div className="a2-grid">
            {/* LEFT: content blocks */}
            <div className="a2-left">
              <article className="a2-card">
                <h3 className="a2-h3">Notre identité académique</h3>
                <p>
                  Au carrefour des savoirs scientifiques et des applications technologiques, la FST
                  Marrakech cultive un environnement d&apos;apprentissage où théorie et pratique
                  s&apos;entrelacent harmonieusement. Nos programmes, constamment actualisés,
                  préparent nos étudiants à devenir des acteurs de changement dans leurs domaines
                  respectifs.
                </p>
              </article>

              <article className="a2-card">
                <h3 className="a2-h3">Notre écosystème d&apos;innovation</h3>
                <p>
                  La FST Marrakech abrite des plateformes technologiques de pointe et des
                  laboratoires spécialisés qui constituent de véritables incubateurs d&apos;idées et de
                  solutions. Cette infrastructure moderne permet à nos équipes de recherche
                  d&apos;explorer des voies novatrices dans des secteurs stratégiques.
                </p>
              </article>

              <article className="a2-card">
                <div className="a2-banner">
                  <span className="a2-dot" />
                  <span className="a2-bannerText">Campus de la FST Marrakech</span>
                </div>
                <h3 className="a2-h3 mt8">Notre rayonnement international</h3>
                <p>
                  Notre faculté cultive activement des partenariats académiques et scientifiques
                  avec des partenaires nationaux et à travers le monde. Cette ouverture enrichit
                  notre vision et offre à nos étudiants et chercheurs des opportunités d&apos;échanges
                  et de mobilité.
                </p>
              </article>

              <article className="a2-card">
                <h3 className="a2-h3">Notre engagement sociétal</h3>
                <p>
                  Au-delà de sa mission académique, la FST Marrakech s&apos;engage résolument dans le
                  développement régional par des projets concrets qui répondent aux défis locaux.
                  Nos équipes travaillent en étroite collaboration avec les acteurs territoriaux
                  pour concevoir des solutions adaptées aux enjeux spécifiques de la région
                  Marrakech-Safi.
                </p>
              </article>

              <div className="a2-closing">
                La FST Marrakech ne se contente pas de transmettre des connaissances — elle forge
                des esprits analytiques, cultive l&apos;innovation et inspire l&apos;excellence. En
                rejoignant notre communauté, vous intégrez un écosystème dynamique où votre
                potentiel pourra pleinement s&apos;épanouir.
              </div>
            </div>

            {/* RIGHT: image panel */}
            <aside className="a2-right">
              <div className="a2-media">
                <Image
                  src="/assets/img/home-4/masthead/hero.jpg" /* place about1.jpg in /public/assets/img/about/ */
                  width={900}
                  height={1100}
                  alt="Vie de campus à la FST Marrakech"
                  className="a2-img"
                />
              </div>
            </aside>
          </div>
        </div>

        {/* Styles (Section 2) */}
        <style jsx>{`
          :root {
            --accent: #2177ce;
            --accent-2: #2a86ee;
            --text: #0f172a;
            --muted: #475569;
            --border: #e9edf3;
            --card: #ffffff;
            --light: #eaf3fe;
            --shadow-sm: 0 6px 18px rgba(15, 23, 42, 0.06);
            --shadow-md: 0 18px 42px rgba(15, 23, 42, 0.14);
            --radius: 14px;
          }

          .about2 {
            background: linear-gradient(180deg, #fbfdff 0%, #ffffff 100%);
            padding: 28px 0 70px;
          }

          .a2-head {
            text-align: center;
            max-width: 900px;
            margin: 0 auto 14px;
          }
          .a2-kicker {
            display: inline-block;
            padding: 6px 10px;
            border: 1px solid #e7eef8;
            border-radius: 999px;
            background: #eaf3fe;
            color: var(--accent);
            font-weight: 800;
            letter-spacing: 0.1px;
            line-height: 1;
            font-size: 12px;
          }
          .a2-title {
            margin: 8px 0 6px;
            color: var(--text);
            font-weight: 800;
            letter-spacing: 0.1px;
            line-height: 1;
            font-size: clamp(26px, 3.8vw, 32px);
          }
          .a2-sub {
            margin: 0 auto;
            color: var(--muted);
            line-height: 1.7;
          }

          .a2-grid {
            display: grid;
            grid-template-columns: 1.3fr 0.7fr;
            gap: 28px;
            margin-top: 26px;
          }
          @media (max-width: 992px) {
            .a2-grid { grid-template-columns: 1fr; }
          }

          .a2-left { display: grid; gap: 14px; }

          .a2-card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 14px 16px;
            box-shadow: var(--shadow-sm);
            transition: transform 0.18s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          }
          .a2-card:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-md);
            border-color: #dbeafe;
          }

          .a2-h3 {
            margin: 0 0 8px;
            color: var(--accent);
            font-weight: 600;
            letter-spacing: 0.1px;
            line-height: 1;
            font-size: 18px;
          }
          .a2-card p { margin: 0; color: var(--text); line-height: 1.7; }

          .a2-banner {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: #f3f8ff;
            border: 1px solid #dbeafe;
            border-radius: 999px;
            padding: 6px 10px;
            margin-bottom: 8px;
            box-shadow: var(--shadow-sm);
          }
          .a2-dot {
            width: 8px; height: 8px; border-radius: 999px; background: var(--accent-2);
          }
          .a2-bannerText {
            color: var(--accent);
            font-weight: 800;
            letter-spacing: 0.1px;
            line-height: 1;
            font-size: 12px;
          }
          .mt8 { margin-top: 8px; }

          .a2-closing {
            border-left: 4px solid var(--accent);
            background: var(--light);
            border-radius: 10px;
            padding: 14px 16px;
            color: var(--text);
            line-height: 1.7;
            box-shadow: var(--shadow-sm);
          }

          .a2-right { position: relative; }
          .a2-media {
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid #e5eaf2;
            box-shadow: 0 14px 40px rgba(15, 23, 42, 0.16);
            background: linear-gradient(135deg, #e5e7eb 0%, #cbd5e1 100%);
          }
          .a2-img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
          }
        `}</style>
      </section>
    </>
  );
}
