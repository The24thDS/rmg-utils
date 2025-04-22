export class System {
  static baseRegExp = new RegExp(
    `system\\s*=\\s*{\\s*id\\s*=\\s*"(?<id>[0-9]+)"\\s*name\\s*=\\s*"(?<name>[A-Za-z0-9' _.-]*)"`
  );
  static xPosRegExp = new RegExp(`x\\s*=\\s*(?<x>[-]?[0-9]+)`);
  static yPosRegExp = new RegExp(`y\\s*=\\s*(?<y>[-]?[0-9]+)`);
  static initRegExp = new RegExp(`initializer\\s*=\\s*(?<init>[A-Za-z0-9_]*)`);

  #id!: number;
  name!: string;
  x!: number;
  y!: number;
  #line: string;
  init: string;
  isNew = false;

  constructor(line: string | Partial<System>, id?: number) {
    if (typeof line === "object") {
      if (!line.id && !id) {
        this.#throwConstructorError(
          "object constructor",
          "Failed to find id. Please provide an `id` or pass an `id` to the constructor."
        );
      }

      this.#id = line.id ?? id ?? 0;
      this.name = line.name ?? "";
      this.x = line.x ?? 0;
      this.y = line.y ?? 0;
      this.init = line.init ?? "";
      this.#line = line.toString!();
    } else {
      this.#line = line;
      const baseMatch = System.baseRegExp.exec(line)?.groups;
      if (baseMatch) {
        this.#id = parseInt(baseMatch.id);
        this.name = baseMatch.name;
      } else {
        this.#throwConstructorError(
          line,
          "Failed to match baseRegExp. Is this a system line?"
        );
      }

      const xPosMatch = System.xPosRegExp.exec(line)?.groups;
      if (xPosMatch) {
        this.x = parseInt(xPosMatch.x) * -1;
      } else {
        this.#throwConstructorError(
          line,
          "Failed to match xPosRegExp. Could not find 'x' value."
        );
      }

      const yPosMatch = System.yPosRegExp.exec(line)?.groups;
      if (yPosMatch) {
        this.y = parseInt(yPosMatch.y) * -1;
      } else {
        this.#throwConstructorError(
          line,
          "Failed to match yPosRegExp. Could not find 'y' value."
        );
      }

      const initMatch = System.initRegExp.exec(line)?.groups;
      if (initMatch) {
        this.init = initMatch.init;
      } else {
        this.init = "";
      }
    }
  }

  get id() {
    return this.#id;
  }

  toString() {
    return (
      this.#line
        .replace(
          System.baseRegExp,
          `system = { id = "${this.#id}" name = "${this.name}"`
        )
        .replace(System.xPosRegExp, `x = ${this.x * -1}`)
        .replace(System.yPosRegExp, `y = ${this.y * -1}`)
        // TODO: will not work if there's no initializer to match and replace
        .replace(System.initRegExp, `initializer = ${this.init}`)
    );
  }

  #throwConstructorError = (line: string, cause: string) => {
    throw new Error(`System constructor failed to parse line: "${line}"`, {
      cause,
    });
  };
}
