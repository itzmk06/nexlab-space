"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysUrlQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import GlobalResult from "./GlobalResult";

// Fallback component for Suspense
const SearchFallback = () => (
  <div className="flex-center flex-col">
    <Image
      src="/assets/icons/loading-spinner.svg"
      width={24}
      height={24}
      alt="Loading"
      className="animate-spin"
    />
    <p className="text-dark-200_light-800 body-regular">Loading search results...</p>
  </div>
);

const GlobalSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("global");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, router, searchParams, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search"
          className="cursor-pointer"
        />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          type="text"
          placeholder="Search Globally"
          className="paragraph-regular no-focus text-dark400_light700 placeholder border-none bg-transparent shadow-none outline-none"
        />
      </div>

      {/* Wrap GlobalResult inside Suspense */}
      {isOpen && (
        <Suspense fallback={<SearchFallback />}>
          <GlobalResult />
        </Suspense>
      )}
    </div>
  );
};

export default GlobalSearch;
