import { Skeleton } from "@/components/ui/skeleton";

export function Info() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      TODO: Infos about the board
    </div>
  );
}

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 w-[300px] flex items-center shadow-md ">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
};