"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { fetchFormation } from "@/services/formationService";
import { fetchFilieres } from "@/services/filiereService";

export default function CourseListFour() {
  const sp = useSearchParams();
  const formationParam = sp.get("formation"); // slug or id

  const [formation, setFormation] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
    (async () => {
      try {
        if (!formationParam) { setRows([]); return; }
        const [f, list] = await Promise.all([
          fetchFormation(formationParam).catch(() => null),
          fetchFilieres({ formation: formationParam, status: "published", limit: 200, sort: "-order,-publishedAt" })
        ]);
        if (!on) return;
        setFormation(f);
        setRows(list.items || []);
      } catch (e) {
        console.error(e);
        if (on) { setFormation(null); setRows([]); }
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
  }, [formationParam]);

  const img = (d) => {
    const u = d?.cardImage?.url;
    if (!u) return null;
    return u.startsWith("http") ? u : `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}${u}`;
  };

  return (
    <section className="layout-pt-lg layout-pb-lg">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">
                {formation ? formation.title : "Filières"}
              </h2>
              {formation?.subtitle && (
                <p className="sectionTitle__text">{formation.subtitle}</p>
              )}
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-40">
          {(loading ? Array.from({ length: 6 }) : rows).map((d, i) => (
            <div key={(d && d._id) || i} className="col-xl-4 col-lg-6 col-md-6">
              <div className="courseCard -type-4 bg-white rounded-8 shadow-3 h-100 d-flex flex-column">
                <div className="ratio ratio-16x9 bg-light-4 rounded-top-8 overflow-hidden">
                  {loading ? (
                    <div className="w-100 h-100 shimmer" />
                  ) : img(d) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img(d)} alt={d.cardImage?.alt || d.title} className="w-100 h-100 object-cover" />
                  ) : (
                    <div className="w-100 h-100 d-flex align-center justify-center text-12 text-dark-3">Aucune image</div>
                  )}
                </div>
                <div className="p-20 flex-grow-1">
                  <h4 className="text-18 fw-700 lh-14">{loading ? "Chargement…" : d.title}</h4>
                  {!loading && d.subtitle && <p className="text-15 text-dark-1 mt-10">{d.subtitle}</p>}
                </div>
                <div className="p-20 pt-0">
              <Link href={`/courses-single-2/${(d && (d.slug || d._id)) || ""}`} className="button -icon -purple-1 text-white w-100">
                    Voir la filière <i className="icon-arrow-top-right text-13 ml-10" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ratio { position: relative; }
        .ratio-16x9 { padding-bottom: 56.25%; }
        .ratio > :global(img), .ratio > div { position: absolute; inset: 0; }
        .object-cover { object-fit: cover; }
        .shimmer { background: linear-gradient(90deg,#f4f4f6 25%,#ececf0 37%,#f4f4f6 63%); background-size: 400% 100%; animation: shimmer 1.4s ease infinite; }
        @keyframes shimmer { 0% { background-position: 100% 0 } 100% { background-position: -100% 0 } }
      `}</style>
    </section>
  );
}
