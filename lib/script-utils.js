import { promises as fs } from "fs";
import path from "path";

export async function getJavaScriptFiles(directory = "scripts") {
    const scriptsDir = path.join(process.cwd(), "public", directory);

    try {
        const files = await fs.readdir(scriptsDir);
        const jsFiles = files.filter((file) => file.endsWith(".js"));

        const fileContents = await Promise.all(
            jsFiles.map(async (filename) => {
                const filePath = path.join(scriptsDir, filename);
                const content = await fs.readFile(filePath, "utf8");
                return {
                    name: filename,
                    content: content,
                };
            })
        );

        return fileContents;
    } catch (error) {
        console.error(
            `Error reading JavaScript files from ${directory}:`,
            error
        );
        return [];
    }
}
