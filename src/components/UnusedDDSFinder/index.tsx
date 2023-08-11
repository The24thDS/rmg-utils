import { Button, Stack, Text } from "@mantine/core";
import { RequiresInstallation } from "../shared/RequiresInstallation";
import { showNotification } from "@mantine/notifications";
import {
  parseDirectoryHandle,
  readFilesToBigString,
} from "../../utils/directory";
import { useState } from "react";

export default function UnusedDDSFinder() {
  const [unusedDDSFiles, setUnusedDDSFiles] = useState<
    { name: string; path: string[] | null }[]
  >([]);

  const handleSelectFolder = async () => {
    if (!window.showDirectoryPicker) {
      showNotification({
        title: "Not supported",
        message:
          "The directory picker API is only supported by installed PWAs.",
        color: "red",
      });
      return;
    }
    const dirHandle = await window.showDirectoryPicker();
    setUnusedDDSFiles([]);
    const { gfxFiles, ddsFiles, metadata } = await parseDirectoryHandle(
      dirHandle
    );
    const gfxContents = await readFilesToBigString(gfxFiles);
    // check for unused DDS files
    const unusedDDSFiles = (
      await Promise.all(
        ddsFiles.map(async (ddsFile) => ({
          name: ddsFile.name,
          path: await dirHandle.resolve(ddsFile),
        }))
      )
    ).filter((ddsFile) => {
      return ddsFile.path && !gfxContents.includes(ddsFile.path.join("/"));
    });
    setUnusedDDSFiles(unusedDDSFiles);
  };

  return (
    <RequiresInstallation>
      <>
        <Text size="lg" mb="sm">
          TBD
        </Text>
        <Stack>
          <Button maw={200} onClick={handleSelectFolder}>
            Select folder
          </Button>
          {unusedDDSFiles.map((ddsFile) => (
            <li key={ddsFile.path?.join("/")}>{ddsFile.path?.join("/")}</li>
          ))}
        </Stack>
      </>
    </RequiresInstallation>
  );
}
