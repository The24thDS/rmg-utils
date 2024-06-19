import { FileWithPath } from "@mantine/dropzone";
import { forwardRef } from "react";

interface ImagePreviewProps {
  file?: FileWithPath;
}

const ImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(
  ({ file }, ref) => {
    const imageUrl = file ? URL.createObjectURL(file) : null;
    return imageUrl ? (
      <img
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        width="auto"
        ref={ref}
        style={{ maxWidth: "150px" }}
      />
    ) : null;
  }
);

export default ImagePreview;
