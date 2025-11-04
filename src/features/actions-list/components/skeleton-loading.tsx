"use client";

export const SkeletonLoading = () => {
  return (
    <>
      <div className="p-4 h-24 md:gap-4 gap-2 md:h-20 text-xl flex flex-col md:flex-row justify-center border bg-primary border-slate-400/20 items-center backdrop-blur-xl rounded-lg">
        Wait...
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3, 4].map((el) => {
          return (
            <article
              key={el}
              className={
                "flex flex-col gap-2 p-4 min-h-34 w-full border rounded-xl backdrop-blur-2xl backdrop-saturate-110 shadow bg-primary border-slate-400/20"
              }
            ></article>
          );
        })}
      </div>
    </>
  );
};
