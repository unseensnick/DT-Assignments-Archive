import { readdir, readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const SUPPORTED_EXTENSIONS = [".js", ".jsx", ".html", ".css"];

async function readFilesFromDirectory(dirPath) {
    const files = await readdir(dirPath, { withFileTypes: true });
    const fileContents = [];

    for (const file of files) {
        const fullPath = path.join(dirPath, file.name);

        if (file.isDirectory()) {
            const subDirContents = await readFilesFromDirectory(fullPath);
            fileContents.push(...subDirContents);
        } else if (
            SUPPORTED_EXTENSIONS.some((ext) => file.name.endsWith(ext))
        ) {
            const content = await readFile(fullPath, "utf8");
            const extension = path.extname(file.name).slice(1);
            const relativePath = path.relative(process.cwd(), dirPath);
            const folderName = path.basename(dirPath);

            fileContents.push({
                name: file.name,
                content: content,
                language: extension,
                folder: folderName,
                fullPath: relativePath,
            });
        }
    }

    return fileContents;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const folders = searchParams.get("folders")?.split(",") || [];

    try {
        const codeDir = path.join(process.cwd(), "public", "assignments");
        const allFiles = await readFilesFromDirectory(codeDir);

        const filteredFiles =
            folders.length > 0
                ? allFiles.filter((file) => folders.includes(file.folder))
                : allFiles;

        const groupedFiles = filteredFiles.reduce((acc, file) => {
            const { folder, language } = file;

            if (!acc[folder]) {
                acc[folder] = {};
            }

            if (!acc[folder][language]) {
                acc[folder][language] = [];
            }

            acc[folder][language].push(file);
            return acc;
        }, {});

        return NextResponse.json(groupedFiles);
    } catch (error) {
        console.error("Error reading files:", error);
        return NextResponse.json(
            { error: "Failed to read files" },
            { status: 500 }
        );
    }
}
