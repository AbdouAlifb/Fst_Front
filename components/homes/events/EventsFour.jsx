"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// If needed: import "swiper/css"; import "swiper/css/navigation"; import "swiper/css/pagination";
import { fetchActualites } from "@/services/actualiteService"; // if alias not set, use ../../services/actualiteService

export default function EventsFour() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { items } = await fetchActualites({
          status: "published",
          limit: 12,
          sort: "-publishedAt",
        });
        if (mounted) setItems(items || []);
      } catch (e) {
        console.error("Failed to load actualités:", e);
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const resolveDate = (doc) =>
    (doc && (doc.displayDate || (doc.event && doc.event.startAt) || doc.publishedAt || doc.createdAt)) || undefined;

  const fmtDay = (d) =>
    d ? new Date(d).toLocaleDateString("fr-FR", { day: "2-digit" }) : "—";

  const fmtMonthUpper = (d) =>
    d ? new Date(d).toLocaleDateString("fr-FR", { month: "long" }).toUpperCase() : "—";

  return (
    <section className="layout-pt-lg layout-pb-lg border-top-light">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title ">Actualités</h2>
              <p className="sectionTitle__text ">
                Découvrez les actualités, événements et innovations de la{" "}
                <b>Faculté des Sciences et Techniques de Marrakech</b>.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-60 lg:pt-50 js-section-slider">
          <Swiper
            className="overflow-visible"
            modules={[Navigation, Pagination]}
            pagination={{ el: ".event-four-pagination", clickable: true }}
            navigation={{
              nextEl: ".icon-arrow-right-event-four",
              prevEl: ".icon-arrow-left-event-four",
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              450: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {(loading ? Array.from({ length: 3 }) : items.slice(0, 6)).map((doc, i) => {
              const date = loading ? undefined : resolveDate(doc);
              const href = loading ? "#" : `/events/${(doc && (doc.slug || doc._id)) || ""}`;
              const title = loading ? "Chargement…" : (doc && doc.title) || "";

              return (
                <SwiperSlide key={(doc && doc._id) || i} className="swiper-slide">
                  <div className="swiper-slide">
                    <div className="eventCard -type-3 bg-light-4 rounded-8">
                      <div className="eventCard__date">
                        <span className="text-45 lh-1 fw-700 text-dark-1">
                          {fmtDay(date)}
                        </span>
                        <span className="text-18 lh-1 fw-500 ml-15">
                          {fmtMonthUpper(date)}
                        </span>
                      </div>

                      <h4 className="eventCard__title text-24 lh-15 fw-500">
                        <Link className="linkCustom" href={href}>
                          {title}
                        </Link>
                      </h4>

                      <div className="eventCard__button">
                        <Link href={href} className="button -icon -purple-1 text-white">
                          Voir les détails
                          <i className="icon-arrow-top-right text-13 ml-10"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="d-flex justify-center x-gap-15 items-center pt-60 lg:pt-40">
            <div className="col-auto">
              <button className="d-flex items-center text-24 arrow-left-hover js-prev icon-arrow-left-event-four">
                <i className="icon icon-arrow-left"></i>
              </button>
            </div>
            <div className="col-auto">
              <div className="pagination -arrows js-pagination event-four-pagination"></div>
            </div>
            <div className="col-auto">
              <button className="d-flex items-center text-24 arrow-right-hover js-next icon-arrow-right-event-four">
                <i className="icon icon-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
