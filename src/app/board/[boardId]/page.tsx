import { Room } from "@/components/room";
import { Canvas } from "./_components/canvas";
import { CanvasLoading } from "./_components/canvasLoading";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default function Page({ params }: BoardIdPageProps) {
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
}
