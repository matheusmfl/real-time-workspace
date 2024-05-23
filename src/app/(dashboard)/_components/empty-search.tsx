import Image from "next/image";
import React from "react";

export function EmptySearch() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src={"/empty-search.svg"}
        height={140}
        width={140}
        alt="empty-search"
      />
      <h2 className="text-2xl font-semibold mt-6">
        Nenhum resultado encontrado!
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Tente buscar por algo diferente.
      </p>
    </div>
  );
}
