"use client";

import bgImage from "@/assets/bg.jpg";

import Image from "next/image";

export const BgImage = () => {
  return (
    <>
      <Image
        src={bgImage}
        width={1920}
        height={1080}
        quality={100}
        alt=""
        placeholder="blur"
        priority
        className="fixed h-[100svh] lg:w-full -z-10 left-0 top-0 object-cover"
      />
    </>
  );
};
