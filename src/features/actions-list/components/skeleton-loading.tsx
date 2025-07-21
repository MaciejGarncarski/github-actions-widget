"use client";

export const SkeletonLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4].map((el) => {
        return (
          <article
            key={el}
            className={
              "flex flex-col gap-2 p-4 min-h-32 w-full border rounded-xl backdrop-blur-2xl backdrop-saturate-110 shadow border-white/30"
            }
          ></article>
        );
      })}
    </div>
  );
};
