import { readFileSync } from "node:fs";
import { isDeepStrictEqual } from "node:util";

export function checkExampleDependencies(root = new URL("../", import.meta.url)) {
  const read = (path) => JSON.parse(readFileSync(new URL(path, root), "utf8"));
  const manifest = read("package.json");
  const snapshots = [
    ["package-lock.json", read("package-lock.json").packages?.[""]],
    [
      "exampleSite/packages/hugoautogen/package.json",
      read("exampleSite/packages/hugoautogen/package.json"),
    ],
    [
      "exampleSite/package-lock.json",
      read("exampleSite/package-lock.json").packages?.["packages/hugoautogen"],
    ],
  ];

  for (const [path, snapshot] of snapshots) {
    if (!snapshot) {
      throw new Error(`${path} is missing its dependency metadata.`);
    }
    for (const group of [
      "dependencies",
      "devDependencies",
      "optionalDependencies",
      "peerDependencies",
    ]) {
      if (!isDeepStrictEqual(manifest[group] ?? {}, snapshot[group] ?? {})) {
        throw new Error(`${path}: ${group} differ from package.json.`);
      }
    }
  }
}

if (import.meta.main) {
  try {
    checkExampleDependencies();
    console.log("Example site dependency definitions and lockfile metadata are synchronized.");
  } catch (error) {
    console.error(error.message);
    console.error("Run npm install if the root lockfile is stale, then npm run sync:example-deps.");
    console.error("Commit the updated dependency files before pushing.");
    process.exitCode = 1;
  }
}
