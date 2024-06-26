"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({
  children,
  roomId,
  fallback,
}: {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_LBLfbmCMzwi-nc5s8oidteuIeM1qk8XqOQCAEj1eVtOtcgtL83dDJSWu_5-Pglcm"
      }
    >
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
