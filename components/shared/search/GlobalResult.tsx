"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ReloadIcon } from "@radix-ui/react-icons";

import { globalSearch } from "@/lib/actions/general.action";
import GlobalFilters from "./GlobalFilters";

// Fallback component during loading
const ResultFallback = () => (
  <div className="flex-center flex-col">
    <ReloadIcon className="my-2 h-10 w-10 animate-spin text-primary-500" />
    <p className="text-dark-200_light-800 body-regular">
      Browsing the entire database...
    </p>
  </div>
);

// Component that handles the global search results
const GlobalResultContent = () => {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<
    { type: string; id: string; title: string }[]
  >([]);
  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchResults = async () => {
      setResults([]);
      try {
        const res = await globalSearch({ query: global, type });
        setResults(JSON.parse(res));
      } catch (error) {
        console.error("Error fetching global search results:", error);
      }
    };

    if (global) fetchResults();
  }, [global, type]);

  const getLinkPath = (type: string, id: string) => {
    switch (type) {
      case "question":
      case "answer":
        return `/question/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;
      default:
        return "/";
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-dark-400_light-900 paragraph-semibold px-5">Top Match</p>
      {results.length > 0 ? (
        <div className="flex flex-col gap-2">
          {results.map((item, index) => (
            <Link
              href={getLinkPath(item.type, item.id)}
              key={`${item.type}-${item.id}-${index}`}
              className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
            >
              <Image
                src="/assets/icons/tag.svg"
                width={18}
                height={18}
                alt="icon"
                className="invert-colors mt-1 object-contain"
              />
              <div className="flex flex-col">
                <p className="body-medium text-dark-200_light-800 line-clamp-1">
                  {item.title}
                </p>
                <p className="text-light-400_light-500 small-medium font-bold capitalize">
                  {item.type}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex-center flex-col px-5">
          <p className="text-dark-200_light-800 body-regular px-5 py-2.5">
            Oops, no results found
          </p>
        </div>
      )}
    </div>
  );
};

// Main wrapper component for global result
const GlobalResult = () => (
  <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
    <GlobalFilters />
    <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />
    {/* Suspense boundary wrapping the component to handle async operations */}
    <Suspense fallback={<ResultFallback />}>
      <GlobalResultContent />
    </Suspense>
  </div>
);

export default GlobalResult;
