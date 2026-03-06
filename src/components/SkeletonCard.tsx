import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => (
  <div className="rounded-xl border border-border bg-card p-6 shadow-card space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-24 rounded-full" />
      <Skeleton className="h-5 w-16" />
    </div>
    <Skeleton className="w-full h-40 rounded-lg" />
    <Skeleton className="h-5 w-3/4 mx-auto" />
    <Skeleton className="h-7 w-1/2 mx-auto" />
    <div className="flex justify-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-4 rounded-full" />
      ))}
    </div>
    <Skeleton className="h-12 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-10 flex-1 rounded-lg" />
      <Skeleton className="h-10 flex-1 rounded-lg" />
    </div>
  </div>
);

export default SkeletonCard;
