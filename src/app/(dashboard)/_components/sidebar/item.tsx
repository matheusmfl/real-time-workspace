"use client";

import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import { Hint } from "../hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}
export function Item({ id, imageUrl, name }: ItemProps) {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };
  return (
    <div className="aspect-square relative">
      <Hint label={name} side="right" align="start" sideOffSet={18}>
        <Image
          src={imageUrl}
          onClick={onClick}
          fill
          alt={name}
          className={cn(
            "rounded-md cursor-pointer opacity-70 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
}
