import { execSync } from "node:child_process";

if (process.env.WORKERS_CI === "1") {
  execSync("npx opennextjs-cloudflare build", { stdio: "inherit" });
}
