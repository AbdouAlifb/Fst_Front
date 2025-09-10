"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { FaClock, FaLayerGroup, FaGraduationCap, FaTag } from "react-icons/fa";
import { fetchFormation } from "@/services/formationService";
import { fetchFilieres } from "@/services/filiereService";

const DEGREE_LABEL = {
  licence: "Licence",
  master: "Master",
  "cycle-ingenieur": "Cycle Ingénieur",
  doctorat: "Doctorat",
  "tronc-commun": "Tronc commun",
};

export default function CourseListFour() {
  const sp = useSearchParams();
  const router = useRouter();
  const formationParam = sp.get("formation"); // slug or id

  const [formation, setFormation] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- data load ---------- */
  useEffect(() => {
    let on = true;
    (async () => {
      try {
        if (!formationParam) {
          setRows([]);
          return;
        }
        const [f, list] = await Promise.all([
          fetchFormation(formationParam).catch(() => null),
          fetchFilieres({
            formation: formationParam,
            status: "published",
            limit: 200,
            sort: "-order,-publishedAt",
          }),
        ]);
        if (!on) return;
        setFormation(f);
        setRows(list.items || []);
      } catch (e) {
        console.error(e);
        if (on) {
          setFormation(null);
          setRows([]);
        }
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => {
      on = false;
    };
  }, [formationParam]);

  /* ---------- Hero parallax ---------- */
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
        gsap.to(el, {
          x: ((relX - container.clientWidth / 2) / container.clientWidth) * movement,
          y: ((relY - container.clientHeight / 2) / container.clientHeight) * movement,
          duration: 0.2,
        });
      });
    };

    container.addEventListener("mousemove", handler);
    return () => container.removeEventListener("mousemove", handler);
  }, []);

  const skeletons = useMemo(
    () => Array.from({ length: 6 }).map((_, i) => ({ _id: `sk-${i}` })),
    []
  );

  const stripHtml = (s) =>
    (s || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

  const brief = (d) => {
    const txt = d?.subtitle || stripHtml(d?.overview);
    return txt && txt.length > 160 ? txt.slice(0, 157) + "…" : txt || "";
  };

  const heroImg = () => {
    const u =
      formation?.bannerImage?.url ||
      formation?.cardImage?.url ||
      "/assets/img/home-4/masthead/1.png";
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    return u.startsWith("http") ? u : `${base}${u}`;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push("/formations");
  };

  return (
    <div className="course-list-page">
      {/* ===== HERO ===== */}
      <section className="masthead -type-3 bg-light-6 js-mouse-move-container">
        <div className="container">
          <div className="row y-gap-30 items-center justify-center">
            <div
              className="col-xl-7 col-lg-11 relative z-5"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="masthead__content pl-32 lg:pl-0">
                <h1 className="masthead__title">
                  {formation ? (
                    formation.title
                  ) : (
                    <>
                      Choisissez votre parcours{" "}
                      <span className="nowrap">
                        à la <span className="text-accent">FST Marrakech</span>
                      </span>
                    </>
                  )}
                </h1>

                <p className="masthead__text text-17 text-dark-1 mt-25">
                  {formation?.subtitle
                    ? formation.subtitle
                    : "Formations en Licence, Master, Doctorat et Cycle ingénieur. Découvrez nos départements et le tronc commun."}
                </p>

                {/* Optional search kept commented for now */}
                {/* <div className="masthead-search mt-30">
                  <div className="masthead-search__form">
                    <form onSubmit={handleSearchSubmit}>
                      <input
                        required
                        type="text"
                        placeholder="Recherchez un département, une filière ou un diplôme…"
                      />
                      <button className="button -accent text-white" type="submit">
                        <i className="icon icon-search" />
                      </button>
                    </form>
                  </div>
                </div> */}
              </div>
            </div>

            <div
              className="col-xl-5 col-lg-7 relative z-2"
              data-aos="fade-up"
              data-aos-delay="750"
            >
              <div className="masthead-image">
                <div className="masthead-image__img1">
                  {/* shape (optional decorative asset) */}
                  <div className="masthead-image__shape xl:d-none">
                    <img
                      width={800}
                      height={800}
                      src="/assets/img/home-4/masthead/shape.svg"
                      alt="shape"
                    />
                  </div>
                  {/* main hero image (dynamic if available) */}
                  <img
                    width={587}
                    height={656}
                    data-move="20"
                    className="js-mouse-move"
                    src={heroImg()}
                    alt="Formation Banner"
                    style={{ objectFit: "cover", borderRadius: 12 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LIST ===== */}
      <section className="courses">
        <div className="container">
          <div className="cards">
            {(loading ? skeletons : rows).map((d) => {
              const id = d?._id || d?.id;
              const slugOrId = d?.slug || id;
              const degree = DEGREE_LABEL[d?.degreeLevel] || null;

              const dept =
                Array.isArray(d?.departments) && d.departments.length
                  ? (typeof d.departments[0] === "string"
                      ? d.departments[0]
                      : (d.departments[0]?.name ||
                         d.departments[0]?.title ||
                         d.departments[0]?.code ||
                         ""))
                  : null;

              return (
                <article
                  key={id}
                  className={`card ${loading ? "is-loading" : ""}`}
                >
                  {/* Tags row (degree + department only) */}
                  <div className="tags">
                    {degree && (
                      <span
                        className="chip"
                        data-variant={d?.degreeLevel /* licence|master|cycle-ingenieur|doctorat|tronc-commun */}
                      >
                        <FaGraduationCap /> {degree}
                      </span>
                    )}

                    {dept && (
                      <span className="chip ghost">
                        <FaTag /> {dept}
                      </span>
                    )}
                  </div>

                  {/* Title + description */}
                  <h3 className="card-title">
                    {loading ? "Chargement…" : d?.title}
                  </h3>
                  {!loading && (d?.subtitle || d?.overview) ? (
                    <p className="desc">{brief(d)}</p>
                  ) : (
                    <div className="desc sk" />
                  )}

                  {/* Stats row (duration + semesters only) */}
                  <div className="stats">
                    {d?.durationYears ? (
                      <div className="stat">
                        <FaClock />
                        <span>
                          {d.durationYears} an{d.durationYears > 1 ? "s" : ""}
                        </span>
                      </div>
                    ) : loading ? (
                      <div className="stat sk w80" />
                    ) : null}

                    {d?.semesters ? (
                      <div className="stat">
                        <FaLayerGroup />
                        <span>
                          {d.semesters} semestre{d.semesters > 1 ? "s" : ""}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* CTA */}
                  {/* <div className="ctaWrap">
                    <Link
                      href={`/courses-single-2/${slugOrId}`}
                      className="btn btn-accent"
                      aria-label={`Voir la filière ${d?.title || ""}`}
                    >
                      Voir la filière
                    </Link>
                  </div> */}
                     <div  className="ctaWrap">
                                            <Link href={`/courses-single-2/${slugOrId}`} className="button -icon -purple-1 text-white">
                                              Voir la filière
                                              <i className="icon-arrow-top-right text-13 ml-10"></i>
                                 </Link>
                                </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STYLES (aligned with Actualité details) ===== */}
      <style jsx>{`
        .course-list-page {
          --accent: #2177CE;                 /* same accent as Actualité details */
          --text: #0f172a;
          --muted: #6b7280;
          --para: #0f172a;
          --border: #e9edf3;                 /* same border color */
          --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
          --shadow-md: 0 18px 42px rgba(15,23,42,0.16);
          --radius: 12px;                    /* same rounding rhythm */

          background: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif; /* same font stack */
          color: var(--text);
          line-height: 1.5;
        }

        .text-accent { color: var(--accent); }

        .container {
          width: min(1200px, 100%);
          margin: 0 auto;
          padding: 0 -16px;
        }

        /* --- Hero (inspired by details header) --- */
        .masthead {
          padding: 70px 0 28px; /* similar vertical rhythm */
          background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
        }
        .masthead__title {
          color: var(--accent);
          font-weight: 800;
          letter-spacing: -0.01em;
          line-height: 1.15;
          font-size: clamp(26px, 3.2vw, 36px); /* match details title size */
          margin-bottom: 8px;
        }
        .masthead__text {
          color: var(--muted);
          line-height: 1.6;
        }

        /* --- Cards grid --- */
        .courses {
          background: #fff;
          padding: 18px 0 96px;
        }
        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 1100px) {
          .cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .cards { grid-template-columns: 1fr; }
        }

        /* --- Card --- */
        .card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);       /* rounded corners */
          padding: 24px 22px 18px;
          box-shadow: var(--shadow-sm);       /* subtle like details */
          transition: transform .12s ease, box-shadow .2s ease, border-color .2s ease;
          min-height: 340px;                  /* bigger cards so full titles breathe */
          overflow: hidden;
        }
        /* subtle accent bar on top (kept) */
        .card::before {
          content: "";
          position: absolute;
          left: 0; top: 0; height: 3px; width: 100%;
          background: linear-gradient(90deg, rgba(33,119,206,0.2) 0%, var(--accent) 55%, rgba(33,119,206,0.2) 100%);
          pointer-events: none;
        }
        .card:hover {
          transform: translateY(-4px);        /* hover lift */
          box-shadow: var(--shadow-md);       /* stronger hover shadow */
          border-color: #dbe3ee;
        }
        .card:active { transform: translateY(-1px); }
        .card.is-loading { position: relative; overflow: hidden; }
        .card.is-loading::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #f4f6fb 25%, #eceff6 37%, #f4f6fb 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
          opacity: 0.5;
        }
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }

        /* --- Chips (match details .chip style) --- */
        .tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .chip {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 10px; border-radius: 999px;
          background: #EAF3FE; color: var(--accent);
          border: 1px solid #e7eef8; font-weight: 700; font-size: 12px;
          white-space: nowrap;
        }
        .chip.ghost {
          background: #f6fafe; color: #3b556e; border-color: #e7eef8;
        }
        /* degree variants tint (soft) */
        .chip[data-variant="licence"]         { background: #ecfdf5; color: #16a34a; border-color: #d1fae5; }
        .chip[data-variant="master"]          { background: #f5f3ff; color: #7c3aed; border-color: #ede9fe; }
        .chip[data-variant="cycle-ingenieur"] { background: #e0f2fe; color: #0284c7; border-color: #bae6fd; }
        .chip[data-variant="doctorat"]        { background: #fef2f2; color: #dc2626; border-color: #fee2e2; }
        .chip[data-variant="tronc-commun"]    { background: #ecfeff; color: #0d9488; border-color: #cffafe; }

        /* --- Title & description --- */
        .card-title {
          margin: 4px 0 12px;
          color: var(--text);
          font-size: 22px;
          font-weight: 500;
          line-height: 1.28;
          display: block;                /* full title (no clamp) */
          overflow: visible;
          white-space: normal;
          word-break: break-word;
        }
        .desc {
          color: var(--para);
          margin: 0 0 16px;
          min-height: 64px;
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .desc.sk {
          height: 64px;
          background: #f2f5fb;
          border-radius: 8px;
        }

        /* --- Stats (kept minimal) --- */
        .stats {
          display: flex;
          gap: 18px;
          flex-wrap: wrap;
          margin-top: auto;
          font-size: 14px;
          color: var(--text);
        }
        .stat { display: inline-flex; align-items: center; gap: 8px; }
        .stat :global(svg) { width: 16px; height: 16px; opacity: .85; }
        .w80 { width: 80px; }

        /* --- CTA (force accent, never white) --- */
        /* CTA container */
  .ctaWrap {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  /* RAW button styles (force accent) */
  .ctaWrap .btn.btn-accent {
    /* reset */
    -webkit-appearance: none;
    appearance: none;
    text-decoration: none;
    cursor: pointer;

    /* box */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 92%;
    padding: 12px 16px;
    border-radius: 12px;

    /* colors (FORCED) */
    background-color: #2177CE !important;
    color: #ffffff !important;
    border: 1px solid #2177CE !important;

    /* type */
    font-weight: 800;
    letter-spacing: 0.1px;
    line-height: 1;

    /* fx */
    box-shadow: 0 8px 20px rgba(33, 119, 206, 0.28);
    transition: background-color .2s ease, border-color .2s ease, box-shadow .2s ease, transform .06s ease;
  }

  .ctaWrap .btn.btn-accent:hover {
    background-color: #1a64b0 !important;
    border-color: #1a64b0 !important;
    box-shadow: 0 12px 28px rgba(26, 100, 176, 0.34);
    transform: translateY(-1px);
  }

  .ctaWrap .btn.btn-accent:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(33, 119, 206, 0.25), 0 8px 20px rgba(33, 119, 206, 0.28);
  }

  .ctaWrap .btn.btn-accent:active {
    transform: translateY(0);
    box-shadow: 0 6px 14px rgba(33, 119, 206, 0.24);
  }

  /* Hard overrides if the theme still forces white somewhere */
  :global(a.btn.btn-accent),
  :global(.card .btn.btn-accent),
  :global(.cards .card a.btn.btn-accent) {
    background-color: #2177CE !important;
    color: #ffffff !important;
    border-color: #2177CE !important;
  }
      `}</style>
    </div>
  );
}
