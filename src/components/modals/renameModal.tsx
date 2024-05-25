"use client";
import { FormEventHandler, useEffect, useState } from "react";
import { useRenameModal } from "@/store/use-rename-modal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutations";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

interface RenameModalProps {}
export function RenameModal({}: RenameModalProps) {
  const { mutate, pending } = useApiMutation(api.board.update);
  const { isOpen, onClose, initialValues } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Quadro renomeado!");
        onClose();
      })
      .catch(() => {
        toast.error("Erro ao renomear o quadro");
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar título do quadro</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Escreva um novo título para esse quadro! ✅
        </DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={false}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do quadro"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Cancelar
              </Button>
            </DialogClose>
            <Button disabled={false} type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
