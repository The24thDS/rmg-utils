export class Nebula {
  static baseRegExp = new RegExp(`nebula\\s*=\\s*{`);
  static nameRegExp = new RegExp(`name\\s*=\\s*"(?<name>[^"]+)"`);
  static xPosRegExp = new RegExp(`x\\s*=\\s*(?<x>[-]?[0-9]+)`);
  static yPosRegExp = new RegExp(`y\\s*=\\s*(?<y>[-]?[0-9]+)`);
  static radiusRegExp = new RegExp(`radius\\s*=\\s*(?<radius>[0-9]+)`);

  #id: string;
  name!: string;
  x!: number;
  y!: number;
  radius!: number;
  #line: string;
  isNew = false;

  constructor(line: string | Partial<Nebula>, id?: string) {
    if (typeof line === "object") {
      this.#id = line.id ?? "nebula_" + this.#generateIdFromTimestamp();
      this.name = line.name ?? this.#id;
      this.x = line.x ?? 0;
      this.y = line.y ?? 0;
      this.radius = line.radius ?? 10;
      this.#line = `nebula = { name = "${this.name}" position = { x = ${
        this.x * -1
      } y = ${this.y * -1} } radius = ${this.radius} }`;
    } else {
      this.#id = id ?? "nebula_" + this.#generateIdFromTimestamp();
      this.#line = line;

      const baseMatch = Nebula.baseRegExp.exec(line);
      if (!baseMatch) {
        this.#throwConstructorError(
          line,
          "Failed to match baseRegExp. Is this a nebula line?"
        );
      }

      const nameMatch = Nebula.nameRegExp.exec(line)?.groups;
      if (nameMatch) {
        this.name = nameMatch.name;
      } else {
        this.#throwConstructorError(
          line,
          "Failed to match nameRegExp. Could not find 'name' value."
        );
      }

      const xPosMatch = Nebula.xPosRegExp.exec(line)?.groups;
      if (xPosMatch) {
        this.x = parseInt(xPosMatch.x) * -1;
      } else {
        this.#throwConstructorError(
          line,
          "Failed to match xPosRegExp. Could not find 'x' value."
        );
      }

      const yPosMatch = Nebula.yPosRegExp.exec(line)?.groups;
      if (yPosMatch) {
        this.y = parseInt(yPosMatch.y) * -1;
      } else {
        this.#throwConstructorError(
          line,
          "Failed to match yPosRegExp. Could not find 'y' value."
        );
      }

      const radiusMatch = Nebula.radiusRegExp.exec(line)?.groups;
      if (radiusMatch) {
        this.radius = parseInt(radiusMatch.radius);
      } else {
        this.#throwConstructorError(
          line,
          "Failed to match radiusRegExp. Could not find 'radius' value."
        );
      }
    }
  }

  get id() {
    return this.#id;
  }

  toString() {
    return this.#line
      .replace(Nebula.nameRegExp, `name = "${this.name}"`)
      .replace(Nebula.xPosRegExp, `x = ${this.x * -1}`)
      .replace(Nebula.yPosRegExp, `y = ${this.y * -1}`)
      .replace(Nebula.radiusRegExp, `radius = ${this.radius}`);
  }

  #generateIdFromTimestamp = () => {
    return new Date()
      .getTime()
      .toString()
      .split("")
      .map(Number)
      .map((s) => (Math.random() > 0.5 ? String.fromCharCode(s + 97) : s))
      .join("");
  };

  #throwConstructorError = (line: string, cause: string) => {
    throw new Error(`Nebula constructor failed to parse line: "${line}"`, {
      cause,
    });
  };
}
