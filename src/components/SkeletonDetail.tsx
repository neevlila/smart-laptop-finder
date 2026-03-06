import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDetail = () => (
  <div className="container py-12 max-w-4xl animate-fade-in">
    <div className="flex flex-col md:flex-row gap-8 mb-12">
      <div className="md:w-2/5">
        <Skeleton className="w-full aspect-square rounded-xl" />
      </div>
      <div className="md:w-3/5 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-24 rounded-xl" />
      ))}
    </div>
    <Skeleton className="h-8 w-40 mb-4" />
    <div className="rounded-xl border border-border overflow-hidden space-y-0">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="h-11 w-full rounded-none" />
      ))}
    </div>
  </div>
);

export default SkeletonDetail;
