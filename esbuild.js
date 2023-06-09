require("esbuild")
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outdir: "./build",
    platform: "node",
    loader: { ".ts": "ts" },
    minify: process.env.NODE_ENV !== "development",
    external: ["fs", "path"],
  })
  .catch(() => process.exit(1));
