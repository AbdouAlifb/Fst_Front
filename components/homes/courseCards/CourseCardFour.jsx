"use client";

import Image from "next/image";
import Link from "next/link";

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function CourceCardFour({ data }) {
  const href = `/courses-list-4?formation=${encodeURIComponent(data.slug || data._id)}`;

  const imgUrl = data?.cardImage?.url
    ? (data.cardImage.url.startsWith("http") ? data.cardImage.url : `${apiBase}${data.cardImage.url}`)
    : null;

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
            <p className="text-14 text-dark-1 mt-10">{data.subtitle}</p>
          ) : null}

          <div className="pt-15">
            <Link href={href} className="button -icon -purple-1 text-white">
              Découvrir <i className="icon-arrow-top-right text-13 ml-10" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
