"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchFiliere } from "@/services/filiereService";
import {
  FaClock,
  FaLayerGroup,
  FaBullseye,
  FaCheckCircle,
  FaArrowRight,
  FaBook,
  FaFilePdf,
  FaUser
} from "react-icons/fa";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const TABS = [
  { key: "objectifs", label: "Objectifs", icon: <FaCheckCircle /> },
  { key: "debouches", label: "Débouchés", icon: <FaArrowRight /> },
  { key: "poursuites", label: "Poursuites", icon: <FaCheckCircle /> },
  { key: "programme", label: "Programme", icon: <FaBook /> },
];

export default function CourseDetails({ id }) {
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
    return () => { alive = false; };
  }, [id]);

  const resolveUrl = (u) => (u?.startsWith("http") ? u : `${API_BASE}${u}`);
  const nbModules = doc?.nbModules ?? doc?.programme?.reduce((acc, year) => acc + (year.items?.length || 0), 0);


  return (
      <div className="course-page">
        {/* HEADER */}
        <header className="header">
          {/* Effets lumineux en arrière-plan */}
          <div className="header-bg">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
          </div>

          <div className="header-inner">
            <h1 className="title animate-fade">{doc?.title || "Chargement…"}</h1>
            <p className="subtitle animate-fade">{doc?.subtitle}</p>

            <div className="header-cards">
              {doc && (
                  <>
                    {doc.formation?.title && (
                        <div className="header-card">
                          <FaBullseye className="card-icon big-icon" />
                          <div className="card-value">{doc.formation.title}</div>
                          <div className="card-label">Formation</div>
                        </div>
                    )}
                    {doc.durationYears && (
                        <div className="header-card">
                          <FaClock className="card-icon big-icon" />
                          <div className="card-value">{doc.durationYears} ans</div>
                          <div className="card-label">Durée</div>
                        </div>
                    )}
                    {doc.semesters && (
                        <div className="header-card">
                          <FaLayerGroup className="card-icon big-icon" />
                          <div className="card-value">{doc.semesters}</div>
                          <div className="card-label">Semestres</div>
                        </div>
                    )}
                    {nbModules > 0 && (
                        <div className="header-card">
                          <FaBook className="card-icon big-icon" />
                          <div className="card-value">{nbModules}</div>
                          <div className="card-label">Modules</div>
                        </div>
                    )}

                  </>
              )}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <div className="main-layout">
          <div className="content">
            <div className="tabs">
              {TABS.map((tab) => (
                  <button
                      key={tab.key}
                      className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveTab(tab.key)}
                  >
                    <span className="tab-icon">{tab.icon}</span> {tab.label}
                  </button>
              ))}
            </div>

            <div className="tab-content">
              {/* Objectifs */}
              {!loading && activeTab === "objectifs" && (
                  <div className="cards-vertical">
                    {doc.objectifs?.map((o, i) => (
                        <div key={i} className="center-card">{o}</div>
                    ))}
                  </div>
              )}


              {/* Debouches */}
              {!loading && activeTab === "debouches" && (
                  <div className="cards-vertical">
                    {doc.debouches?.map((d, i) => (
                        <div key={i} className="center-card">{d}</div>
                    ))}
                  </div>
              )}

              {/* Poursuites */}
              {!loading && activeTab === "poursuites" && (
                  <div className="cards-vertical">
                    {doc.poursuites?.map((p, i) => (
                        <div key={i} className="center-card">{p}</div>
                    ))}
                  </div>
              )}


              {!loading && activeTab === "programme" && (
                  <div className="cards-vertical">
                    {doc.programme?.map((year, i) => (
                        <div key={i} className="programme-item">
                          <div className="programme-year">{year.label}</div>
                          <div className="programme-details">
                            <ul>
                              {year.items?.map((item, j) => <li key={j}>{item}</li>)}
                            </ul>
                          </div>
                        </div>
                    ))}
                  </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="sidebar">
            {/* Infos rapides */}
            <div className="card friendly-card">
              <h3>
                <FaCheckCircle style={{ marginRight: "0.5rem" }} />
                Infos rapides
              </h3>
              <ul>
                {doc?.formation?.title && (
                    <li>
                      <span className="field-label">Formation:</span>
                      <Link href={`/courses-list-4?formation=${doc.formation.slug || doc.formation._id}`}>
                        <span className="field-value">{doc.formation.title}</span>
                      </Link>
                    </li>
                )}
                {doc?.status && (
                    <li>
                      <span className="field-label">Statut:</span>
                      <span className="field-value">{doc.status}</span>
                    </li>
                )}
                {doc?.updatedAt && (
                    <li>
                      <span className="field-label">MAJ:</span>
                      <span className="field-value">{new Date(doc.updatedAt).toLocaleDateString("fr-FR")}</span>
                    </li>
                )}
                {doc?.brochure?.url && (
                    <li>
                      <FaFilePdf style={{ marginRight: "0.3rem" }} />
                      <a href={resolveUrl(doc.brochure.url)} target="_blank" rel="noreferrer">
                        Télécharger la brochure
                      </a>
                    </li>
                )}
              </ul>
            </div>

            {/* Coordinateur */}
            {doc?.coordinator && (
                <div className="card friendly-card">
                  <h3>
                    <FaUser style={{ marginRight: "0.5rem" }} />
                    Coordinateur
                  </h3>
                  <div className="field-row">
                    <span className="field-label">Nom:</span>
                    <span className="field-value">{doc.coordinator.name}</span>
                    <span className="field-label">Métier:</span>
                    <span className="field-value">{doc.coordinator.role}</span>
                  </div>
                  <div className="field-row">
                    <span className="field-label">Email:</span>
                    <span className="field-value">{doc.coordinator.email}</span>
                    <span className="field-label">Téléphone:</span>
                    <span className="field-value">{doc.coordinator.phone}</span>
                  </div>
                  <div className="field-row">
                    <span className="field-label">Bureau:</span>
                    <span className="field-value">{doc.coordinator.office}</span>
                  </div>
                </div>
            )}

            {/* Documents */}
            {doc?.documents?.length > 0 && (
                <div className="card friendly-card">
                  <h3>
                    <FaFilePdf style={{ marginRight: "0.5rem" }} />
                    Documents
                  </h3>
                  <ul>
                    {doc.documents.map((d, i) => (
                        <li key={i}>
                          <a href={resolveUrl(d.url)} target="_blank" rel="noreferrer">
                            {d.label} ({d.type || "PDF"})
                          </a>
                        </li>
                    ))}
                  </ul>
                </div>
            )}
          </aside>
        </div>

        <style jsx>{`
          /* HEADER */
          .header {
            position: relative;
            background: linear-gradient(135deg, #16213E, #1a1a80, #0001ff);
            color: #fff;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 3rem 2rem;
            border-radius: 0 0 40px 40px;
            overflow: hidden;
          }

          /* Effets lumineux animés */
          .header-bg .circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(120px);
            opacity: 0.6;
            animation: float 10s infinite ease-in-out alternate;
          }

          .circle1 {
            width: 400px;
            height: 400px;
            top: -100px;
            left: -100px;
            background: #4f46e5;
          }

          .circle2 {
            width: 500px;
            height: 500px;
            bottom: -150px;
            right: -100px;
            background: #3b82f6;
          }

          @keyframes float {
            from {
              transform: translateY(0px);
            }
            to {
              transform: translateY(-40px);
            }
          }

          /* Titre + sous-titre */
          .title {
            padding-top: 3rem;
            font-size: 4rem;
            font-weight: 900;
            margin-bottom: 1rem;
            background: linear-gradient(90deg, #ff7e5f, #feb47b, #d52d5a, #8e0202);
            background-size: 100% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientMove 6s ease infinite;
            text-shadow: none; /* tu peux laisser si tu veux plus de glow */
          }

          @keyframes gradientMove {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }


          .subtitle {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            opacity: 0.9;
          }

          /* Animation d’apparition */
          .animate-fade {
            animation: fadeInUp 1s ease both;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Cards en glassmorphism */
          .header-cards {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
          }

          .header-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            width: 180px;
            height: 180px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-items: center; /* centre horizontalement */
            justify-content: center; /* centre verticalement */
            text-align: center; /* centre le texte multiline */
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }

          .header-card:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
          }

          .card-icon {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
          }

          .card-icon.big-icon {
            font-size: 3rem;
          }

          .card-value {
            font-size: 1.3rem;
            font-weight: 700;
          }

          .card-label {
            font-size: 1rem;
            opacity: 0.85;
          }


          /* LAYOUT PRINCIPAL */
          .main-layout {
            display: flex;
            gap: 2rem;
            margin-top: 2rem;
            padding: 2rem 3rem 3rem 3rem;
          }

          .content {
            flex: 2;
          }

          .sidebar {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          /* TABS */
          .tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
          }

          .tab-btn {
            flex: 1;
            padding: 1rem 0;
            border-radius: 8px;
            border: 1px solid #ddd;
            background: #f5f5f5;
            cursor: pointer;
            font-weight: 700;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
          }

          .tab-btn.active {
            background: #0001ff;
            color: white;
            border-color: #266ff3;
          }

          .tab-icon {
            display: flex;
            align-items: center;
          }

          /* CARDS OBJECTIFS / DEBOUCHES / POURSUITES */
          .cards-vertical {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .center-card {
            background: #f5f8ff;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border-left: 5px solid #266ff3;
            text-align: center;
            font-weight: 600;
            font-size: 1rem;
            color: #000157;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .center-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          /* CARDS PROGRAMME */
          .programme-item {
            display: flex;
            gap: 2rem;
            background: #f5f8ff;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            border-left: 5px solid #266ff3;
            align-items: flex-start;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .programme-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .programme-year {
            flex: 0 0 120px;
            font-weight: 700;
            font-size: 1.1rem;
            color: #000157;
          }

          .programme-details {
            flex: 1;
          }

          .programme-details ul {
            padding-left: 1rem;
            margin: 0;
          }

          .programme-details li {
            margin-bottom: 0.3rem;
            font-size: 1rem;
          }

          /* SIDEBAR */
          .friendly-card {
            background: #f0f4ff;
            padding: 1.5rem;
            border-radius: 16px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .friendly-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          }

          .friendly-card h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .field-row {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem 2rem;
            margin-bottom: 0.5rem;
          }

          .field-label {
            font-weight: 600;
            color: #333;
          }

          .field-value {
            font-weight: 500;
            color: #555;
          }

          /* Sidebar liste classique */
          .sidebar ul li {
            display: flex;
            justify-content: space-between;
            padding: 0.3rem 0;
            font-size: 0.95rem;
          }
        `}</style>
      </div>
  );
}
