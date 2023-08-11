export const parseDirectoryHandle = async (
  handle: FileSystemDirectoryHandle
) => {
  const entries: (FileSystemDirectoryHandle | FileSystemFileHandle)[] = [];
  const ddsFiles: FileSystemFileHandle[] = [];
  const gfxFiles: FileSystemFileHandle[] = [];
  let filesNumber = 0;
  let directoriesNumber = 0;

  for await (const entry of handle.values()) {
    if (entry.kind === "file") {
      filesNumber++;
      entries.push(entry);
      if (entry.name.endsWith(".dds")) {
        ddsFiles.push(entry);
      } else if (entry.name.endsWith(".gfx")) {
        gfxFiles.push(entry);
      }
    } else if (entry.kind === "directory") {
      directoriesNumber++;
      const subResults = await parseDirectoryHandle(entry);
      entries.push(...subResults.entries);
      ddsFiles.push(...subResults.ddsFiles);
      gfxFiles.push(...subResults.gfxFiles);
      filesNumber += subResults.metadata.filesNumber;
      directoriesNumber += subResults.metadata.directoriesNumber;
    }
  }

  return {
    entries,
    ddsFiles,
    gfxFiles,
    metadata: { filesNumber, directoriesNumber },
  };
};

export const readFilesToBigString = async (
  fileHandles: FileSystemFileHandle[]
) => {
  let data: string = "";
  for (const fileHandle of fileHandles) {
    const file = await fileHandle.getFile();
    const content = await file.text();
    data += content;
  }
  return data;
};
