"use client";

import bgPlaceholder from "@/assets/bg-placeholder.webp";
import bgGif from "@/assets/bg.gif";

import Image from "next/image";

export const BgImage = () => {
  return (
    <>
      <Image
        src={bgPlaceholder}
        width={1920}
        height={1080}
        alt=""
        quality={10}
        priority
        placeholder="blur"
        className="fixed blur-xs h-full lg:w-full -z-20 left-0 top-0 object-cover"
      />
      <Image
        src={bgGif}
        width={1920}
        height={1080}
        alt=""
        priority
        className="fixed blur-xs h-full lg:w-full -z-10 left-0 top-0 object-cover"
      />
    </>
  );
};
