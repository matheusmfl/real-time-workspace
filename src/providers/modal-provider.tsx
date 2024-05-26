"use client";

import { RenameModal } from "@/components/modals/renameModal";
import { useEffect, useState } from "react";

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <RenameModal />
    </>
  );
}
