"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { api } from "../../../../convex/_generated/api";

import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutations";
import { toast } from "sonner";

export function EmptyBoards() {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Quadro criado com sucesso!");
        // TODO: Redirect to board
      })
      .catch(() => toast.error("Putz, algo deu errado!"));
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={"/note.svg"} height={110} width={110} alt="empty-favorites" />
      <h2 className="text-2xl font-semibold mt-6">Criar seu primeiro quadro</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Comece criando um quadro para sua organização
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size={"lg"}>
          Criar quadro
        </Button>
      </div>
    </div>
  );
}
