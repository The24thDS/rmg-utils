import { Image } from "react-konva";
import useImage from "use-image";

interface CanvasImageProps {
  imageURL: string | null;
  canvasWidth: number;
  scale?: number;
}

export default function CanvasImage({
  imageURL,
  canvasWidth,
  scale = 1,
}: CanvasImageProps) {
  const [image] = useImage(imageURL ?? "");
  const imagePosition = canvasWidth / 2 - ((image?.width ?? 0) * scale) / 2;

  return (
    <Image
      x={imagePosition}
      y={imagePosition}
      image={image}
      scale={{ x: scale, y: scale }}
    />
  );
}
