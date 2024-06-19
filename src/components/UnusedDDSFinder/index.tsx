import { useState } from "react";
import {
  Button,
  Stack,
  Text,
  Alert,
  Loader,
  Center,
  Flex,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconAlertTriangle } from "@tabler/icons-react";

import { RequiresInstallation } from "../shared/RequiresInstallation";

import {
  UDDSDirectory,
  UDDSDirectoryDDSFileType,
  UDDSDirectoryMetadata,
} from "../../utils/UDDSDirectory";
import FileTree from "./FileTree";

export default function UnusedDDSFinder() {
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [files, setFiles] = useState<UDDSDirectoryDDSFileType[]>([]);
  const [metadata, setMetadata] = useState<UDDSDirectoryMetadata>();
  const [loading, setLoading] = useState(false);

  const readStream = async (stream: ReadableStream) => {
    const reader = stream.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          setLoading(false);
          break;
        }
        setFiles((files) => [...files, value]);
      }
    } finally {
      reader.releaseLock();
    }
  };

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
    const handle = await window.showDirectoryPicker();
    setFiles([]);
    setLoading(true);
    setSelectedFolder(handle.name);
    const directory = new UDDSDirectory(handle);
    await directory.parse();
    const stream = await directory.getUnusedDDSFilesStream();
    readStream(stream);
    setMetadata(directory.metadata);
  };

  return (
    <RequiresInstallation>
      <>
        <Stack>
          <Alert
            icon={<IconAlertTriangle size="1rem" />}
            title="Warning!"
            color="orange"
            variant="outline"
          >
            <Text>
              This tool can and will give <strong>false-positives</strong>. It
              is only checking if a DDS file is referenced in a .gfx or .asset
              file, but DDS files can still be used internally by meshes or the
              game.
            </Text>
            <Text>
              Please use this tool with caution and only delete files you are
              sure are not used by the game.
            </Text>
          </Alert>
          <Text>
            This tool will check if any DDS files in the selected folder are not
            referenced by any .gfx or .asset files. The recommended way to use
            it is to select the "gfx/models/ships" folder of your mod.
          </Text>
          <Flex gap={16} align="center">
            <Button maw={200} onClick={handleSelectFolder}>
              Select folder
            </Button>
            <Stack gap={0}>
              {selectedFolder && (
                <Text size="sm">Selected folder: {selectedFolder}</Text>
              )}
              {metadata && (
                <Text size="sm">
                  Parsed {metadata.directoriesNumber + 1} directories and found{" "}
                  {metadata.filesNumber} files
                </Text>
              )}
            </Stack>
          </Flex>
          {loading && (
            <Center>
              <Loader />
            </Center>
          )}
          {files.length > 0 && (
            <>
              <Text>
                Found {files.length} unused DDS files in the selected folder:
              </Text>
              <FileTree files={files} rootFolderName={selectedFolder} />
            </>
          )}
        </Stack>
      </>
    </RequiresInstallation>
  );
}
