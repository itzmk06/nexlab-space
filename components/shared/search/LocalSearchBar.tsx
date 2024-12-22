"use client";

import { Suspense, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysUrlQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    <p className="text-dark-200_light-800 body-regular">Loading...</p>
  </div>
);

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <Suspense fallback={<SearchFallback />}>
      <div
        className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
      >
        {iconPosition === "left" && (
          <Image
            src={imgSrc}
            alt="search Icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value={search}
          className="paragraph-regular no-focus text-dark100_light900 placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        {iconPosition === "right" && (
          <Image
            src={imgSrc}
            alt="search Icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        )}
      </div>
    </Suspense>
  );
};

export default LocalSearchBar;
