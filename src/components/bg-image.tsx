"use client";

import bgPlaceholder from "@/assets/bg-placeholder.webp";
import bgGif from "@/assets/bg.gif";

import Image from "next/image";
import { useState } from "react";

export const BgImage = () => {
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false);

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
        onLoad={() => setPlaceholderLoaded(true)}
        className="fixed blur-xs h-[100dvh] lg:w-full -z-20 left-0 top-0 object-cover"
      />
      {placeholderLoaded && (
        <Image
          src={bgGif}
          width={1920}
          height={1080}
          alt=""
          priority
          className="fixed blur-xs h-[100dvh] lg:w-full -z-10 left-0 top-0 object-cover"
        />
      )}
    </>
  );
};
