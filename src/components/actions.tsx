"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutations";
import { api } from "../../convex/_generated/api";
import { ConfirmModal } from "./confirmModal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export function Actions({
  children,
  id,
  title,
  side,
  sideOffset,
}: ActionsProps) {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copiado com sucesso!"))
      .catch(() => toast.error("Erro ao copiar o link"));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Quadro deletado!"))
      .catch(() => toast.error("Erro ao deletar quadro"));
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem
          className="p-3 cursor-pointer group"
          onClick={onCopyLink}
        >
          <Link2 className="h-4 w-4 mr-2 group-hover:text-blue-600" />
          Copiar link do quadro
        </DropdownMenuItem>

        <ConfirmModal
          header="Deletar quadro"
          description="Isso vai deletar o quadro para sempre!"
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            className="p-3 cursor-pointer group text-sm w-full justify-start font-normal"
            variant={"ghost"}
          >
            <Trash2 className="h-4 w-4 mr-2  group-hover:text-red-500" />
            Deletar
          </Button>
        </ConfirmModal>

        <DropdownMenuItem
          className="p-3 cursor-pointer group"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="h-4 w-4 mr-2 group-hover:text-green-400" />
          Editar título
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
