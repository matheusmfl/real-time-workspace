import Image from "next/image";
import React from "react";

export function EmptyFavorites() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src={"/empty-favorites.svg"}
        height={140}
        width={140}
        alt="empty-favorites"
      />
      <h2 className="text-2xl font-semibold mt-6">
        Você não possui favoritos 😭
      </h2>
      <p className="text-muted-foreground text-sm mt-2">
        Tente favoritar algo!
      </p>
    </div>
  );
}
