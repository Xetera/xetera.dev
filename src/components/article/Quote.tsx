import type { PropsWithChildren } from "react";
import type React from "react";

export function Quote({
  children,
  author,
}: PropsWithChildren<{ author: React.ReactNode }>) {
  return (
    <blockquote className="flex flex-col">
      <hr className="w-full my-4 mb-8 max-w-24 h-[1px] bg-body-700 mx-auto" />
      <div className="max-w-[40ch] mx-auto text-center font-article-title color-text-700">
        {children}
      </div>
      {author && (
        <div className="text-lg lg:text-xl mx-auto mt-8 color-text-500">
          -{author}
        </div>
      )}
      <hr className="w-full my-4 mt-8 max-w-24 h-[1px] bg-body-700 mx-auto" />
    </blockquote>
  );
}
