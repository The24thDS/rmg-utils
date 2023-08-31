import { Accordion, Flex, List, Text } from "@mantine/core";
import { IconFolder, IconPhoto } from "@tabler/icons";
import { partial } from "filesize";

import { UDDSDirectoryDDSFileType } from "../../utils/UDDSDirectory";

type File = Omit<UDDSDirectoryDDSFileType, "path">;

interface Folder {
  name: string;
  files: File[];
  folders: Folder[];
}

interface FileTreeProps {
  files: UDDSDirectoryDDSFileType[];
  rootFolderName: string;
}

const formatSize = partial({
  base: 2,
  round: 0,
  standard: "jedec",
  roundingMethod: "ceil",
});

export default function FileTree({ files, rootFolderName }: FileTreeProps) {
  const groupFilesInFolders = () => {
    const rootFolder: Folder = {
      name: rootFolderName,
      files: [],
      folders: [],
    };
    files.forEach(({ name, path, size }) => {
      let currentFolder = rootFolder;
      path.forEach((value) => {
        if (value === name) {
          currentFolder.files.push({ name, size });
        } else {
          const folder = currentFolder.folders.find(
            (folder) => folder.name === value
          );
          if (folder) {
            currentFolder = folder;
          } else {
            const newFolder: Folder = {
              name: value,
              files: [],
              folders: [],
            };
            currentFolder.folders.push(newFolder);
            currentFolder = newFolder;
          }
        }
      });
    });
    return rootFolder;
  };

  const renderFiles = (files: File[]) => {
    return (
      <List
        icon={<IconPhoto color="#ff6b6b" />}
        styles={{
          itemWrapper: { width: "100%" },
          item: { "& span:last-child": { flexGrow: 1 } },
        }}
      >
        {files.map((file) => (
          <List.Item key={file.name}>
            <Flex w="100%" justify={"space-between"}>
              <Text>{file.name}</Text>
              <Text>{formatSize(file.size)}</Text>
            </Flex>
          </List.Item>
        ))}
      </List>
    );
  };

  const renderFolder = (folder: Folder, path: string) => {
    const isRootFolder = path === rootFolderName;
    return (
      <Accordion
        variant="separated"
        chevronPosition="left"
        key={path}
        multiple
        defaultValue={[path]}
      >
        <Accordion.Item
          value={folder.name}
          mt={!isRootFolder ? "1rem" : undefined}
        >
          <Accordion.Control icon={<IconFolder />}>
            {folder.name}
          </Accordion.Control>
          <Accordion.Panel>
            {renderFiles(folder.files)}
            {folder.folders.map((folder) =>
              renderFolder(folder, path + folder.name)
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  };

  return <div>{renderFolder(groupFilesInFolders(), rootFolderName)}</div>;
}
