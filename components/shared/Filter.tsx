"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  jobFilter?: boolean;
}

const FilterContent = ({ filters, otherClasses, containerClasses }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get("filter");

  const handleFilters = (filter: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: filter,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        onValueChange={handleFilters}
        defaultValue={paramFilter || undefined}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="text-dark500_light700 small-regular border-none bg-light-900 dark:bg-dark-300">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem
                key={filter.value}
                value={filter.value}
                className="cursor-pointer focus:bg-light-800 dark:focus:bg-dark-400"
              >
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const Filter = (props: Props) => (
  <Suspense fallback={<div>Loading filter options...</div>}>
    <FilterContent {...props} />
  </Suspense>
);

export default Filter;
