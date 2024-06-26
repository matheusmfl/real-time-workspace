import { Skeleton } from "@/components/ui/skeleton";

export function Participants() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      Participants
    </div>
  );
}

export function ParticipantsSkeleton() {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 w-[100px] flex items-center shadow-md">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
}
