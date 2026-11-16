import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { checkExampleDependencies } from "./check-example-deps.mjs";

describe("example site dependency synchronization", () => {
  let directory;
  let root;

  const write = (path, value) => writeFileSync(new URL(path, root), JSON.stringify(value));
  const read = (path) => JSON.parse(readFileSync(new URL(path, root), "utf8"));

  beforeEach(() => {
    directory = mkdtempSync(join(tmpdir(), "hikaeme-example-deps-"));
    root = pathToFileURL(`${directory}/`);
    mkdirSync(new URL("exampleSite/packages/hugoautogen/", root), { recursive: true });
    const dependencies = { bootstrap: "^5.3.9", algoliasearch: "^5.64.0" };
    const devDependencies = { vitest: "^5.1.0" };
    const manifest = { dependencies, devDependencies };
    write("package.json", manifest);
    write("package-lock.json", { packages: { "": manifest } });
    write("exampleSite/packages/hugoautogen/package.json", manifest);
    write("exampleSite/package-lock.json", {
      packages: { "packages/hugoautogen": manifest },
    });
  });

  afterEach(() => {
    rmSync(directory, { recursive: true });
  });

  it("accepts synchronized metadata regardless of key order", () => {
    const path = "exampleSite/packages/hugoautogen/package.json";
    const manifest = read(path);
    manifest.dependencies = Object.fromEntries(Object.entries(manifest.dependencies).reverse());
    write(path, manifest);
    expect(() => checkExampleDependencies(root)).not.toThrow();
  });

  it.each([
    ["package-lock.json", ""],
    ["exampleSite/packages/hugoautogen/package.json", null],
    ["exampleSite/package-lock.json", "packages/hugoautogen"],
  ])("rejects stale dependencies in %s without modifying files", (path, key) => {
    const document = read(path);
    const manifest = key === null ? document : document.packages[key];
    manifest.dependencies.bootstrap = "^5.3.8";
    write(path, document);
    const before = readFileSync(new URL(path, root), "utf8");
    expect(() => checkExampleDependencies(root)).toThrow(path);
    expect(readFileSync(new URL(path, root), "utf8")).toBe(before);
  });

  it("rejects removed development dependencies still present in the example site", () => {
    write("package.json", { dependencies: read("package.json").dependencies });
    write("package-lock.json", { packages: { "": read("package.json") } });
    expect(() => checkExampleDependencies(root)).toThrow("devDependencies");
  });

  it("rejects missing workspace metadata", () => {
    write("exampleSite/package-lock.json", { packages: {} });
    expect(() => checkExampleDependencies(root)).toThrow("missing its dependency metadata");
  });
});
