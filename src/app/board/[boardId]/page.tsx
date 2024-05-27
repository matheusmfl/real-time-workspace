import { Canvas } from "./_components/canvas";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

export default function Page({ params }: BoardIdPageProps) {
  return <Canvas />;
}
