import { NextResponse } from "next/server";
import { execFile } from "child_process";
import { promisify } from "util";
import { randomUUID } from "crypto";

const execAsync = promisify(execFile);

const ALLOWED_LANGUAGES = {
  javascript: {
    command: "docker",
    args: (code: string, id: string) => [
      "run",
      "--rm",
      "--network=none",
      "--memory=256m",
      "--cpus=0.5",
      `--name=exec-${id}`,
      "node:20-alpine",
      "node",
      "-e",
      code,
    ],
  },

};

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    if (!code || typeof code !== "string" || code.length > 10000) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    if (!(language in ALLOWED_LANGUAGES)) {
      return NextResponse.json(
        { error: "Unsupported language" },
        { status: 400 }
      );
    }

    const executionId = randomUUID();

    const config =
      ALLOWED_LANGUAGES[language as keyof typeof ALLOWED_LANGUAGES];

    const { stdout, stderr } = await execAsync(
      config.command,
      config.args(code, executionId),
      {
        timeout: 5000,
        encoding: "utf-8",
        shell: false,
      }
    );

    const cleanOutput = (stdout || stderr || "")
      .replace(
        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
        ""
      )
      .slice(0, 1000);

    return NextResponse.json({ output: cleanOutput });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
 const errorMessage =
      error.code === "ETIMEDOUT" ? "Execution timed out" : "Execution failed";

    console.error(`Execution error: ${error.message}`);
    return NextResponse.json({ output: errorMessage }, { status: 500 });
  }
}
