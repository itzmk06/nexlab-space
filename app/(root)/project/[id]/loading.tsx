import { Skeleton } from "@/components/ui/skeleton";

const LoadingProjectPage = () => {
  return (
    <div className="flex-start w-full flex-col">
      {/* Header Section */}
      <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="h-[24px] w-[24px] rounded-full" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-8 w-40" />
        </div>
      </div>
      <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
        <Skeleton className="h-14 w-full" />
      </h2>

      {/* Tags Section */}
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Main Content Section */}
      <div className="mt-14">
        <Skeleton className="h-screen w-full" />
      </div>

      {/* Collaborators Section */}
      <div className="mt-8 flex flex-row items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
};

export default LoadingProjectPage;
