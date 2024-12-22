"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { formUrlQuery, removeKeysUrlQuery } from "@/lib/utils";

// Fallback component for Suspense
const SwitchFallback = () => (
  <div className="flex-center flex-col">
    <div className="animate-spin w-6 h-6 border-4 border-t-transparent border-light-500 rounded-full" />
    <p className="text-dark-200_light-800 body-regular">Updating...</p>
  </div>
);

interface Props {
  query: string;
  label: string;
}

const Switcher = ({ query, label }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramFilter = searchParams.get(query);

  const handleUpdateParams = (checked: boolean) => {
    const newUrl = checked
      ? formUrlQuery({
          params: searchParams.toString(),
          key: query,
          value: "true",
        })
      : removeKeysUrlQuery({
          params: searchParams.toString(),
          keysToRemove: [query],
        });

    router.push(newUrl, { scroll: false });
  };

  return (
    <Suspense fallback={<SwitchFallback />}>
      <div className="flex items-center">
        <Switch
          id={`${query}-switcher`}
          className="ml-4 mr-2"
          checked={paramFilter === "true"}
          onCheckedChange={handleUpdateParams}
        />
        <Label htmlFor={`${query}-switcher`} className="text-light-500">
          {label}
        </Label>
      </div>
    </Suspense>
  );
};

export default Switcher;
