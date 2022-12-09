import { Image } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { forwardRef } from "react";

interface ImagePreviewProps {
  file?: FileWithPath;
}

const ImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(
  ({ file }, ref) => {
    const imageUrl = file ? URL.createObjectURL(file) : null;
    return imageUrl ? (
      <Image
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        width="auto"
        maw={150}
        imageRef={ref}
        styles={{ image: { maxWidth: "100% !important" } }}
      />
    ) : null;
  }
);

export default ImagePreview;
