"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import Socials from "@/components/common/Socials";
import FooterLinks from "../component/FooterLinks";
import Links from "../component/Links";
export default function FooterOne() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <footer className="footer -type-1 bg-dark-1 -green-links">
      <div className="container">
        <div className="footer-header">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-auto">
              <div className="footer-header__logo">
                <Image
                  width={140}
                  height={50}
                  src="/assets/img/footer/footer-logo.svg"
                  alt="logo"
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="footer-header-socials">
                <div className="footer-header-socials__title text-white">
                  Suivez Nous sur les reseaux sociaux:
                </div>
                <div className="footer-header-socials__list">
                  <Socials />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-columns">
          <div className="row y-gap-30">
            <FooterLinks
              allClasses={"text-17 fw-500 text-white uppercase mb-25"}
            />

            <div className="col-xl-4 col-lg-4 col-md-6">
  <div className="text-17 fw-500 text-white uppercase mb-25">
    CONTACT
  </div>

  <div className="footer-columns-form">
    <address className="mb-0" style={{ color: "#fff" }}>
      <div>
        Boulevard Abdelkrim Khattabi,<br />
        BP 549, 40000 Marrakech
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Téléphone:&nbsp;</strong>
        <a
          href="tel:+212524434649"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          +212 524 43 46 49
        </a>
      </div>

      <div style={{ marginTop: 8 }}>
        <strong>Email:&nbsp;</strong>
        <a
          href="mailto:contact@fstg-marrakech.ac.ma"
          style={{ color: "#fff", textDecoration: "underline" }}
        >
          contact@fstg-marrakech.ac.ma
        </a>
      </div>
    </address>
  </div>
</div>

          </div>
        </div>

        <div className="py-30 border-top-light-15">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="d-flex items-center h-100 text-white">
                © {new Date().getFullYear()} FST Marrakech. Tous droits réservés.
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                <div>
                  <div className="d-flex x-gap-15 text-white">
                    <Links />
                  </div>
                </div>

                <div>
                  <Link
                    href="#"
                    className="button px-30 h-50 -dark-6 rounded-200 text-white"
                  >
                    <i className="icon-worldwide text-20 mr-15"></i>
                    <span className="text-15">English</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
