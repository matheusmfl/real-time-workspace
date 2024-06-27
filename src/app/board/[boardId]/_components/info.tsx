"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Hint } from "@/app/(dashboard)/_components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export function TabSeparator() {
  return <div className="bg-neutral-300 w-[1px] h-[60%] mx-1.5"></div>;
}

export function Info({ boardId }: InfoProps) {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Voltar aos quadros" side="bottom" sideOffSet={10}>
        <Button asChild className="px-2 transition" variant={"board"}>
          <Link href={"/"}>
            <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Renomear quadro" side="bottom" sideOffSet={10}>
        <Button
          onClick={() => onOpen(data._id, data.title)}
          variant={"board"}
          className="text-base font-normal px-2"
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Menu principal" side="bottom" sideOffSet={10}>
            <Button size={"icon"} variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
}

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 w-[300px] flex items-center shadow-md ">
      <Skeleton className="h-full w-full bg-muted-400" />
    </div>
  );
}
