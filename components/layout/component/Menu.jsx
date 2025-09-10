"use client";

import React, { useState, useEffect ,useMemo} from "react";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import { menuList } from "@/data/menu";
import { usePathname } from "next/navigation";
import { fetchFormations } from "@/services/formationService";
const DEGREE_LABEL = {
  licence: "Licence",
  master: "Master",
  "cycle-ingenieur": "Cycle Ingénieur",
  doctorat: "Doctorat",
  "tronc-commun": "Tronc commun",
};

const DEGREE_ORDER = ["tronc-commun", "licence", "master", "cycle-ingenieur", "doctorat"];

export default function Menu({ allClasses, headerPosition }) {
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const pathname = usePathname();
    const [loading, setLoading] = useState(true);
  const [formations, setFormations] = useState([]);
 useEffect(() => {
    let on = true;
    (async () => {
      try {
        const { items } = await fetchFormations({
          status: "published",
          sort: "-order,-publishedAt",
          limit: 100,
        });
        if (on) setFormations(items || []);
      } catch (e) {
        console.error("Failed to load formations:", e);
        if (on) setFormations([]);
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => {
      on = false;
    };
  }, []);

  // Highlight top menu by current path
  useEffect(() => {
    if (
      pathname.startsWith("/formations") ||
      pathname.startsWith("/courses-single-2")
    ) {
      setMenuItem("Formations");
      setSubmenu("");
    }
  }, [pathname]);

 const linkFor = (f) =>
    `/courses-list-4?formation=${encodeURIComponent(f?.slug || f?._id || "")}`;

// Flat, blog-style list ordering (degree order, then by 'order')
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

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split('/')[1]  == pathname.split('/')[1] ) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split('/')[1]  == pathname.split('/')[1] ) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        {/* <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link href="/login" className="text-dark-1">
            Log in
          </Link>
          <Link href="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div> */}

        <div className="menu js-navList">
          <ul className={`${allClasses ? allClasses : ""}`}>
            <li className="menu-item-has-children">
              <Link
                data-barba
               href="/"
                className={menuItem == "Home" ? "activeMenu" : ""}
              >
                Accueil 
              </Link>

              {/* <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Home
                  </Link>
                </li>

                {menuList[0].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split('/')[1] == elm.href.split('/')[1] ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    <Link href={elm.href}>{elm.label}</Link>
                  </li>
                ))}
              </ul> */}
            </li>
    <li className="menu-item-has-children">
              <Link
                data-barba
                href="#"
                className={menuItem === "Formations" ? "activeMenu" : ""}
              >
                Formations <i className="icon-chevron-right text-13 ml-10" />
              </Link>

              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#"><i className="icon-chevron-left text-13 mr-10" /> Formations</Link>
                </li>

                {/* Skeletons while loading (same structure as blog) */}
                {loading &&
                  Array.from({ length: 8 }).map((_, i) => (
                    <li key={i} className="inActiveMenu">
                      <span className="sk-line" />
                    </li>
                  ))}

                {/* All formations, flat list */}
                {!loading &&
                  sortedFormations.map((f) => {
                    const href = linkFor(f);
                    const isActive =
                      pathname === href || pathname.startsWith(href + "/");
                    return (
                      <li key={f._id || f.slug} className={isActive ? "activeMenu" : "inActiveMenu"}>
                        <Link data-barba href={href}>{f.title}</Link>
                      </li>
                    );
                  })}

                {!loading && sortedFormations.length === 0 && (
                  <li className="inActiveMenu"><span>Aucune formation publiée.</span></li>
                )}
              </ul>
            </li>


            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/event-list-2"
                className={menuItem == "Events" ? "activeMenu" : ""}
              >
                Actualiés 
              </Link>
              {/* <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Events
                  </Link>
                </li>

                {menuList[2].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split('/')[1]  == elm.href.split('/')[1]  ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    <Link data-barba href={elm.href}>
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </li>

            {/* <li className="menu-item-has-children">
              <Link
                data-barba
                href="#"
                className={menuItem == "Blogs" ? "activeMenu" : ""}
              >
                Blog <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>
              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Blog
                  </Link>
                </li>

                {menuList[3].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split('/')[1]  == elm.href.split('/')[1]  ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    <Link data-barba href={elm.href}>
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li> */}

            <li className="menu-item-has-children">
              <Link
                data-barba
                href="/about-1"
                className={menuItem == "Pages" ? "activeMenu" : ""}
              >
               À Propos
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>

              {/* <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link href="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Pages
                  </Link>
                </li>
                <li className="menu-item-has-children">
                  <Link
                    href="#"
                    className={
                      submenu == "About Us" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    About Us<div className="icon-chevron-right text-11"></div>
                  </Link>

                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link href="#">
                        <i className="icon-chevron-left text-13 mr-10"></i>
                        About Us
                      </Link>
                    </li>

                    {menuList[4].links[0].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split('/')[1]  == elm.href.split('/')[1]  ? "activeMenu" : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba href={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item-has-children">
                  <Link
                    href="#"
                    className={
                      submenu == "Contact" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    Contact<div className="icon-chevron-right text-11"></div>
                  </Link>
                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link href="#">
                        <i className="icon-chevron-left text-13 mr-10"></i>
                        Contact
                      </Link>
                    </li>

                    {menuList[4].links[1].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split('/')[1]  == elm.href.split('/')[1]  ? "activeMenu" : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba href={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item-has-children">
                  <Link
                    href="#"
                    className={
                      submenu == "Shop" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    Shop<div className="icon-chevron-right text-11"></div>
                  </Link>
                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link href="#">
                        <i className="icon-chevron-left text-13 mr-10"></i> Shop
                      </Link>
                    </li>

                    {menuList[4].links[2].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split('/')[1]  == elm.href.split('/')[1]  ? "activeMenu" : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba href={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {menuList[4].links
                  .filter((el) => el.href)
                  .map((elm, i) => (
                    <li
                      key={i}
                      className={
                        pathname.split('/')[1]  == elm.href.split('/')[1]  ? "activeMenu" : "inActiveMenu"
                      }
                    >
                      <Link key={i} data-barba href={elm.href}>
                        {elm.label}
                      </Link>
                    </li>
                  ))}
              </ul> */}
            </li>

            {/* <li
              
            >
              <Link data-barba href="/contact-1"  className={
                pathname == "/contact-1" ? "activeMenu" : "inActiveMenuTwo"
              }>
                Contact
              </Link>
            </li> */}
          </ul>
        </div>

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}
