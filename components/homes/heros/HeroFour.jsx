"use client";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HeroFour() {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const parallaxIt = () => {
      const target = document.querySelectorAll(".js-mouse-move-container");

      target.forEach((container) => {
        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = el.getAttribute("data-move");

          document.addEventListener("mousemove", (e) => {
            const relX = e.pageX - container.offsetLeft;
            const relY = e.pageY - container.offsetTop;

            gsap.to(el, {
              x:
                ((relX - container.offsetWidth / 2) / container.offsetWidth) *
                Number(movement),
              y:
                ((relY - container.offsetHeight / 2) / container.offsetHeight) *
                Number(movement),
              duration: 0.2,
            });
          });
        });
      });
    };

    parallaxIt();
  }, []);
  
  return (
<section className="masthead -type-3 js-mouse-move-container" style={{ position: "relative", overflow: "hidden", height: "120vh", marginTop: "-80px", paddingTop: "125px", display: "flex", alignItems: "center" }}>
<video
  autoPlay
  loop
  muted
  playsInline
  controls={false}
  controlsList="nodownload nofullscreen noremoteplayback"
  disablePictureInPicture
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    minHeight: "100vh",
    zIndex: 0,
    pointerEvents: "none"
  }}
>
        <source src="/assets/img/home-4/masthead/videoHero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Optional dark overlay for better text readability */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 1
      }}></div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="row y-gap-30 items-center justify-center">
          <div
            className="col-xl-7 col-lg-11 relative z-5"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="masthead__content pl-32 lg:pl-0">
              <h1 className="masthead__title" style={{ paddingTop: "20px", color: "white" }}>
                Choisissez votre parcours{" "}
                <span className="nowrap">
                  à la <span className="text-purple-1">FST Marrakech</span>
                </span>
              </h1>

              <p className="masthead__text text-17 mt-25" style={{ color: "white" }}>
                Formations en Licence, Master, Doctorat et Cycle ingénieur. Découvrez nos départements et le tronc commun.
              </p>

              <div className="masthead-search mt-30">
                {/* <div className="masthead-search__form">
                  <form onSubmit={handleSubmit}>
                    <input
                      required
                      type="text"
                      placeholder="Recherchez un département, une filière ou un diplôme…"
                    />

                    <button
                      className="button -purple-1 text-white"
                      onClick={() => router.push("/formations")}
                    >
                      <i className="icon icon-search"></i>
                    </button>
                  </form>
                </div>

                <div className="masthead-search__searches mt-40">
                  Recherches populaires :
                  <Link href="/formations/tronc-commun">Tronc commun</Link>,{" "}
                  <Link href="/formations/licence">Licence</Link>,{" "}
                  <Link href="/formations/master">Master</Link>,{" "}
                  <Link href="/formations/doctorat">Doctorat</Link>,{" "}
                  <Link href="/formations/cycle-ingenieur">Cycle ingénieur</Link>
                </div> */}
              </div>
            </div>
          </div>

          <div
            className="col-xl-5 col-lg-7 relative z-2"
            data-aos="fade-up"
            data-aos-delay="750"
          >

              {/* <div className="masthead-image__el1">
                <div
                  data-move="40"
                  className="lg:d-none img-el -w-250 px-20 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                >
                  <div className="size-50 d-flex justify-center items-center bg-red-2 rounded-full">
                    <Image
                      width={24}
                      height={23}
                      src="/assets/img/masthead/1.svg"
                      alt="icon"
                    />
                  </div>
                  <div className="ml-20">
                    <div className="text-orange-1 text-16 fw-500 lh-1">
                      3.000 +
                    </div>
                    <div className="mt-3">Free Courses</div>
                  </div>
                </div>
              </div>

              <div className="masthead-image__el2">
                <div
                  data-move="40"
                  className="shadow-4 img-el -w-260 px-40 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                >
                  <div className="img-el__side">
                    <div className="size-50 d-flex justify-center items-center bg-dark-1 rounded-full">
                      <Image
                        width={20}
                        height={27}
                        src="/assets/img/masthead/2.svg"
                        alt="icon"
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="text-purple-1 text-16 fw-500 lh-1">
                      Congrats!
                    </div>
                    <div className="mt-3">Your Admission Completed</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
    </section>
  );
}