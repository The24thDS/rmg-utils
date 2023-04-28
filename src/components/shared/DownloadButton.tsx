import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Stage } from "konva/lib/Stage";
import { useState } from "react";
import * as Sentry from "@sentry/browser";
import { IconX } from "@tabler/icons";

declare global {
  interface Window {
    magick: any;
  }
}

const BASE64_MARKER = ";base64,";

interface DownloadButtonProps {
  type: "PNG" | "DDS";
  stage: Stage | null;
  name: string;
  triggerAnalytics?: (type: "PNG" | "DDS") => void;
}

export default function DownloadButton({
  type,
  stage,
  name,
  triggerAnalytics,
}: DownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = stage === null;

  const onClick = async () => {
    if (stage) {
      try {
        setIsLoading(true);
        const fileName = `trait_${
          name.length ? name : "generated_by_rmg_utils"
        }`;
        const dataURL = stage.toDataURL();
        const link = document.createElement("a");
        if (type === "DDS") {
          const base64Index =
            dataURL.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
          const base64 = dataURL.substring(base64Index);
          const pngBytes = Uint8Array.from(window.atob(base64), (c) =>
            c.charCodeAt(0)
          );
          const inputFiles = [{ name: `${fileName}.png`, content: pngBytes }];
          const command = [
            "convert",
            `${fileName}.png`,
            "-define",
            "dds:compression=none",
            `${fileName}.dds`,
          ];
          const processedFiles = await window.magick.Call(inputFiles, command);
          const firstOutputImage = processedFiles[0];
          const urlObject = URL.createObjectURL(firstOutputImage["blob"]);
          link.download = `${fileName}.dds`;
          link.href = urlObject;
        } else {
          link.download = `${fileName}.png`;
          link.href = dataURL;
        }
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
        setIsLoading(false);
        if (triggerAnalytics) {
          triggerAnalytics(type);
        }
      } catch (e) {
        notifications.show({
          title: "An error occured",
          message:
            "It seems like we ran into an error while generating your trait. We've been notified about this and we will take the necessary measures to fix it. Please wait a few moments before trying again.",
          color: "red",
          icon: <IconX />,
          autoClose: false,
        });
        Sentry.captureException(e);
      } finally {
        setIsLoading(false);
      }
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
