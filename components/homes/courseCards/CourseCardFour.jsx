"use client";

import Image from "next/image";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/config";

const apiBase = API_BASE_URL;

export default function CourceCardFour({ data }) {
  const href = `/courses-list-4?formation=${encodeURIComponent(data.slug || data._id)}`;

  const imgUrl = data?.cardImage?.url
    ? (data.cardImage.url.startsWith("http") ? data.cardImage.url : `${apiBase}${data.cardImage.url}`)
    : null;
    console.log("image debug" , imgUrl , apiBase)

  // helpful per-card console
  console.debug("[CourseCardFour] render", {
    id: data?._id,
    title: data?.title,
    href,
    imgUrl
  });

  return (
    <div className="" style={{ height: "fit-content" }}>
      <div className="coursesCard -type-1 shadow-3 rounded-8 bg-white">
        <div className="relative">
          <div className="coursesCard__image overflow-hidden rounded-8">
            {imgUrl ? (
              <Image
                width={600}
                height={360}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                className="w-1/1"
                src={imgUrl}
                alt={data.cardImage?.alt || data.title}
              />
            ) : (
              <div className="bg-light-4" style={{ width: "100%", paddingTop: "56.25%" }} />
            )}
            <div className="coursesCard__image_overlay rounded-8"></div>
          </div>
        </div>

        <div className="h-100 pt-20 pb-15 pl-30 pr-40">
          <div className="text-17 lh-15 fw-700 text-dark-1">
            <Link className="linkCustom" href={href}>
              {data.title}
            </Link>
          </div>

      {data.subtitle ? (
  <p className="text-14 text-dark-1 mt-10 clamped-2" title={data.subtitle}>
    {data.subtitle}
  </p>
) : null}


          <div className="pt-15">
            <Link href={href} className="button -icon -purple-1 text-white">
              Découvrir <i className="icon-arrow-top-right text-13 ml-10" />
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
  .clamped-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;          /* <-- clamp to 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    line-height: 1.6;               /* keep rhythm consistent */
    max-height: calc(1.6em * 2);    /* ensures equal card heights */
    word-break: break-word;         /* prevents overflow on long tokens */
  }
`}</style>

    </div>
    
  );
}
