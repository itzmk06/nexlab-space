"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";

// Fallback component for Suspense
const FiltersFallback = () => (
  <div className="flex-center flex-col">
    <div className="animate-spin w-6 h-6 border-4 border-t-transparent border-light-500 rounded-full" />
    <p className="text-dark-200_light-800 body-regular">Loading Filters...</p>
  </div>
);

const GlobalFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParams = searchParams.get("type");

  const [active, setActive] = useState<string>(typeParams || "");

  const handleTypeClick = (type: string) => {
    const isActive = active === type;
    const newURL = formUrlQuery({
      params: searchParams.toString(),
      key: "type",
      value: isActive ? null : type,
    });

    setActive(isActive ? "" : type);
    router.push(newURL, { scroll: false });
  };

  return (
    <Suspense fallback={<FiltersFallback />}>
      <div className="flex items-center gap-5 px-5">
        <p className="text-dark-400_light-900 body-medium">Type:</p>
        <div className="flex gap-3">
          {GlobalSearchFilters.map((filter) => (
            <Button
              key={filter.value}
              type="button"
              onClick={() => handleTypeClick(filter.value)}
              className={`light-border-2 small-medium rounded-2xl px-5 py-2 capitalize transition-colors ${
                active === filter.value
                  ? "bg-primary-500 text-light-900 dark:hover:text-light-800"
                  : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-300"
              }`}
            >
              {filter.name}
            </Button>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default GlobalFilters;
