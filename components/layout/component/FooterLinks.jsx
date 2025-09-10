"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchFormations } from "@/services/formationService";

const DEGREE_ORDER = ["tronc-commun", "licence", "master", "cycle-ingenieur", "doctorat"];

export default function FooterLinks({ allClasses }) {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
    (async () => {
      try {
        const { items } = await fetchFormations({
          status: "published",
          sort: "-order,-publishedAt",
          limit: 1000,
        });
        if (on) setFormations(items || []);
      } catch (e) {
        console.error("Failed to load formations in footer:", e);
        if (on) setFormations([]);
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => { on = false; };
  }, []);

  const sortedFormations = useMemo(() => {
    const byDegree = {};
    formations.forEach((f) => {
      const k = f?.degreeLevel || "autres";
      (byDegree[k] ||= []).push(f);
    });
    Object.keys(byDegree).forEach((k) => {
      byDegree[k].sort((a, b) => (a?.order || 0) - (b?.order || 0));
    });

    const flat = [];
    DEGREE_ORDER.forEach((k) => { if (byDegree[k]) flat.push(...byDegree[k]); });
    Object.keys(byDegree)
      .filter((k) => !DEGREE_ORDER.includes(k))
      .forEach((k) => flat.push(...byDegree[k]));

    return flat;
  }, [formations]);

  const listHref = (f) =>
    `/courses-list-4?formation=${encodeURIComponent(f?.slug || f?._id || "")}`;

  return (
    <>
      {/* Logo + University name (2/12) */}
      <div className="col-xl-2 col-lg-4 col-md-6">
        <div className="brandBlock">
          <Image
            width={140}
            height={50}
            src="/assets/img/general/logo-fst.png"
            alt="FST Marrakech"
            className="brandLogo"
          />
          <div className="brandTitle">
            Faculté des Sciences et Techniques de Marrakech
          </div>
        </div>
      </div>

      {/* À propos (2/12) */}
      <div className="col-xl-2 col-lg-4 col-md-6">
        <div className={allClasses || ""}>À propos</div>
        <div className="d-flex y-gap-10 flex-column">
          <Link href="/about-1">À Propos</Link>
          <Link href="/">Accueil</Link>
        </div>
      </div>

      {/* Nouveautés (2/12) */}
      <div className="col-xl-2 col-lg-4 col-md-6">
        <div className={allClasses || ""}>Nouveautés</div>
        <div className="d-flex y-gap-10 flex-column">
          {/* Adjust the route if needed */}
          <Link href="/event-list-2">Actualités</Link>
        </div>
      </div>

      {/* Formations (dynamic) (2/12) */}
      <div className="col-xl-2 col-lg-4 col-md-6">
        <div className={allClasses || ""}>Formations</div>
        <div className="d-flex y-gap-10 flex-column">
          {loading ? (
            <>
              <span className="sk-line" />
              <span className="sk-line" />
              <span className="sk-line" />
            </>
          ) : (
            sortedFormations.map((f) => (
              <Link key={f._id || f.slug} href={listHref(f)}>
                {f.title}
              </Link>
            ))
          )}
          {!loading && sortedFormations.length === 0 && (
            <span className="text-muted">Aucune formation publiée</span>
          )}
        </div>
      </div>

      <style jsx>{`
        .brandBlock {
          display: grid;
          gap: 10px;
        }
        .brandTitle {
          color: #0f172a;
          font-weight: 400;
          line-height: 1.3;
        }
        .sk-line {
          display: block;
          height: 12px;
          width: 80%;
          border-radius: 6px;
          background: linear-gradient(90deg, #f4f6fb 25%, #eceff6 37%, #f4f6fb 63%);
          background-size: 400% 100%;
          animation: sk 1.2s ease infinite;
        }
        @keyframes sk {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </>
  );
}
