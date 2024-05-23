import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export function EmptyBoards() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/note.svg"} height={110} width={110} alt="empty-favorites" />
      <h2 className="text-2xl font-semibold mt-6">Criar seu primeiro quadro</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Comece criando um quadro para sua organização
      </p>
      <div className="mt-6">
        <Button size={"lg"}>Criar quadro</Button>
      </div>
    </div>
  );
}
