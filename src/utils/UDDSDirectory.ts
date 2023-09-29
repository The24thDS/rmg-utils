export interface UDDSDirectoryDDSFileType {
  name: string;
  path: string[];
  size: number;
}

export interface UDDSDirectoryMetadata {
  filesNumber: number;
  directoriesNumber: number;
  textContentLength: number;
}

/**
 * Represents a directory containing DDS files, .gfx and .asset files.
 */
export class UDDSDirectory {
  /**
   * The handle to the directory.
   */
  handle: FileSystemDirectoryHandle;
  /**
   * The handle to the root directory.
   */
  rootHandle: FileSystemDirectoryHandle;
  /**
   * An array of handles to text files in the directory.
   */
  textFiles: FileSystemFileHandle[] = [];
  /**
   * An array of UDDSDirectoryDDSFileType objects representing the DDS files in the directory.
   */
  ddsFiles: UDDSDirectoryDDSFileType[] = [];
  /**
   * The number of files in the directory.
   */
  #filesNumber: number = 0;
  /**
   * The number of directories in the directory.
   */
  #directoriesNumber: number = 0;
  /**
   * An array of strings representing the text content of the text files in the directory.
   */
  #textContent: string[] = [];
  /**
   * The total length of the text content of the text files in the directory.
   */
  #textContentLength: number = 0;

  /**
   * Creates a new UDDSDirectory object.
   * @param directoryHandle - The handle to the directory.
   */
  constructor(
    directoryHandle: FileSystemDirectoryHandle,
    rootHandle?: FileSystemDirectoryHandle
  ) {
    this.handle = directoryHandle;
    this.rootHandle = rootHandle || directoryHandle;
  }

  /**
   * Returns an object containing metadata about the directory.
   * @returns An object containing metadata about the directory.
   */
  get metadata() {
    return {
      filesNumber: this.#filesNumber,
      directoriesNumber: this.#directoriesNumber,
      textContentLength: this.#textContentLength,
    };
  }

  /**
   * Returns an array of UDDSDirectoryDDSFileType objects representing the unused DDS files in the directory.
   * @returns An array of UDDSDirectoryDDSFileType objects representing the unused DDS files in the directory.
   */
  async getUnusedDDSFiles() {
    const files: UDDSDirectoryDDSFileType[] = [];
    await this.#readFiles();
    for (const ddsFile of this.ddsFiles) {
      const isUsed = this.#textContent.some((text) =>
        text.includes(ddsFile.name)
      );
      if (!isUsed) {
        files.push(ddsFile);
      }
    }

    return files;
  }

  /**
   * Returns a ReadableStream that emits UDDSDirectoryDDSFileType objects representing the unused DDS files in the directory.
   * @returns A ReadableStream that emits UDDSDirectoryDDSFileType objects representing the unused DDS files in the directory.
   */
  async getUnusedDDSFilesStream(): Promise<ReadableStream<any>> {
    const stream = new ReadableStream({
      start: async (controller) => {
        await this.#readFiles();
        for (const ddsFile of this.ddsFiles) {
          const isUsed = this.#textContent.some((text) =>
            text.includes(ddsFile.name)
          );
          if (!isUsed) {
            controller.enqueue(ddsFile);
          }
        }
        controller.close();
      },
    });

    return stream;
  }

  /**
   * Parses the directory and populates the textFiles and ddsFiles arrays.
   */
  async parse() {
    for await (const entry of this.handle.values()) {
      if (entry.kind === "file") {
        this.#filesNumber++;
        if (entry.name.endsWith(".dds")) {
          const path = await this.rootHandle.resolve(entry);
          if (path) {
            this.ddsFiles.push({
              name: entry.name,
              path,
              size: (await entry.getFile()).size,
            });
          }
        } else if (
          entry.name.endsWith(".gfx") ||
          entry.name.endsWith(".asset")
        ) {
          this.textFiles.push(entry);
        }
      } else if (entry.kind === "directory") {
        this.#directoriesNumber++;
        const subDirectory = new UDDSDirectory(entry, this.rootHandle);
        await subDirectory.parse();
        this.ddsFiles.push(...subDirectory.ddsFiles);
        this.textFiles.push(...subDirectory.textFiles);
        this.#filesNumber += subDirectory.#filesNumber;
        this.#directoriesNumber += subDirectory.#directoriesNumber;
      }
    }
  }

  /**
   * Reads the text content of the text files in the directory and populates the #textContent and #textContentLength properties.
   */
  async #readFiles() {
    for (const file of this.textFiles) {
      const fileContent = await file.getFile();
      const content = await fileContent.text();
      this.#textContentLength += content.length;
      console.log(content.length);
      this.#textContent.push(content);
    }
  }
}
