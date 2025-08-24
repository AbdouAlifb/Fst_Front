"use client";

import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";

import CourceCardFour from "@/components/homes/courseCards/CourseCardFour";
import { fetchFormations } from "@/services/formationService";

export default function CoursesFour() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let on = true;
    (async () => {
      try {
        const { items } = await fetchFormations({
          status: "published",
          sort: "-order,-publishedAt",
          limit: 12,
        });
        if (on) setItems(items || []);
      } catch (e) {
        console.error(e);
        if (on) setItems([]);
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => {
      on = false;
    };
  }, []);

  const skeletons = Array.from({ length: 6 });

  return (
    <section className="layout-pt-lg layout-pb-lg bg-light-3">
      <div className="container">
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle">
              <h2 className="sectionTitle__title">Formations</h2>
              <p className="sectionTitle__text">
                Choisissez votre parcours à la FST Marrakech
              </p>
            </div>
          </div>
        </div>

        <div
          className="relative pt-60 lg:pt-50 js-section-slider"
          data-aos="fade-left"
          data-aos-offset="80"
          data-aos-duration={800}
        >
          <Swiper
            className="overflow-visible"
            modules={[Navigation, Pagination]}
            pagination={{ el: ".event-pagination", clickable: true }}
            navigation={{
              nextEl: ".course-slider-four-next",
              prevEl: ".course-slider-four-prev",
            }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 450: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
          >
            {(loading ? skeletons : items.slice(0, 6)).map((f, i) => (
              <SwiperSlide key={(f && f._id) || i}>
                {loading ? (
                  <div className="coursesCard -type-1 shadow-3 rounded-8 bg-white p-30">
                    <div className="shimmer" style={{ height: 180, borderRadius: 8 }} />
                    <div className="mt-20 shimmer" style={{ height: 14, width: "70%", borderRadius: 6 }} />
                    <div className="mt-10 shimmer" style={{ height: 12, width: "50%", borderRadius: 6 }} />
                  </div>
                ) : (
                  <CourceCardFour data={f} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="course-slider-four-prev section-slider-nav -prev -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-prev">
            <i className="icon icon-arrow-left text-24" />
          </button>

          <button className="course-slider-four-next section-slider-nav -next -dark-bg-dark-2 -white -absolute size-70 rounded-full shadow-5 js-next">
            <i className="icon icon-arrow-right text-24" />
          </button>
        </div>

        <div className="row justify-center pt-60 lg:pt-50">
          <div className="col-auto">
            <Link href="/courses-list-4" className="button -icon -purple-1 text-white">
              Voir toutes les formations
              <i className="icon-arrow-top-right text-13 ml-10"></i>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shimmer {
          background: linear-gradient(90deg, #f4f4f6 25%, #ececf0 37%, #f4f4f6 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease infinite;
        }
        @keyframes shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </section>
  );
}
