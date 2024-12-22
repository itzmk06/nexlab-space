import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingFeedPage = () => {
  return (
    <section>
      {/* Header and Button */}
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Project Feed</h1>

        <Link href="/create-project" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Create a Project
          </Button>
        </Link>
      </div>

      {/* Skeleton for Project Header/Filter */}
      <div className="mb-12 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-14 flex-1" />
        <div className="hidden max-md:block">
          <Skeleton className="h-14 w-28" />
        </div>
      </div>

      {/* Skeleton for Sorting/Filter Buttons */}
      <div className="my-10 hidden flex-wrap gap-3 md:flex">
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </div>

      {/* Skeleton for Project Cards in Feed */}
      <div className="flex flex-col gap-6">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default LoadingFeedPage;
