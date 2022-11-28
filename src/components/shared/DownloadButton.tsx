import { Button } from "@mantine/core";
import { Stage } from "konva/lib/Stage";
import { useState } from "react";

interface DownloadButtonProps {
  type: "PNG" | "DDS";
  stage: Stage | null;
  name: string;
}

export default function DownloadButton({
  type,
  stage,
  name,
}: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = stage === null;

  const onClick = async () => {
    if (stage) {
      setIsLoading(true);
      const dataURL = stage.toDataURL();
      const link = document.createElement("a");
      link.download = `trait_${name.length ? name : "generated_by_rmg_utils"}`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      fullWidth
      loading={isLoading}
      disabled={isDisabled}
      styles={{ root: { paddingRight: "9px", paddingLeft: "9px" } }}
      onClick={onClick}
    >
      Download {type}
    </Button>
  );
}
