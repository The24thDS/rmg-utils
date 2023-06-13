export class Hyperlane {
  static baseRegExp = new RegExp(`add_hyperlane\\s*=\\s*{`);
  static fromRegExp = new RegExp(`from\\s*=\\s*"(?<from>[0-9]+)"`);
  static toRegExp = new RegExp(`to\\s*=\\s*"(?<to>[0-9]+)"`);

  #id: string;
  from!: number;
  to!: number;
  #line: string;

  constructor(line: string) {
    this.#line = line;

    const baseMatch = Hyperlane.baseRegExp.exec(line);
    if (!baseMatch) {
      this.#throwConstructorError(
        line,
        "Failed to match baseRegExp. Is this a hyperlane line?"
      );
    }

    const fromMatch = Hyperlane.fromRegExp.exec(line)?.groups;
    if (fromMatch) {
      this.from = parseInt(fromMatch.from);
    } else {
      this.#throwConstructorError(
        line,
        "Failed to match fromRegExp. Could not find 'from' value."
      );
    }

    const toMatch = Hyperlane.toRegExp.exec(line)?.groups;
    if (toMatch) {
      this.to = parseInt(toMatch.to);
    } else {
      this.#throwConstructorError(
        line,
        "Failed to match toRegExp. Could not find 'to' value."
      );
    }

    this.#id = `${this.from}->${this.to}`;
  }

  get id() {
    return this.#id;
  }

  toString() {
    return this.#line
      .replace(Hyperlane.fromRegExp, `from = "${this.from}"`)
      .replace(Hyperlane.toRegExp, `to = "${this.to}"`);
  }

  #throwConstructorError = (line: string, cause: string) => {
    throw new Error(`Hyperlane constructor failed to parse line: "${line}"`, {
      cause,
    });
  };
}
