"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import Image from "next/image";

export function EmptyOrg() {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center">
        <Image src={"/elements.svg"} alt="empty" height={200} width={200} />
        <h2 className="text-2xl font-semibold mt-6">Bem vindo ao Board!</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Crie uma organização para começar!
        </p>

        <div className="mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button size={"lg"}>Criar uma organização</Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
              <CreateOrganization routing="hash" />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
