import { readdir, readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const SUPPORTED_EXTENSIONS = [".js", ".jsx", ".html", ".css"];

// Cache for file contents to prevent repeated reads
let fileCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

async function readFilesFromDirectory(dirPath) {
    try {
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
                    language: extension === "js" ? "javascript" : extension,
                    folder: folderName,
                    fullPath: relativePath,
                });

                console.log(`Read file: ${file.name} from ${folderName}`);
            }
        }

        return fileContents;
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error);
        return [];
    }
}

/**
 * Filter files based on requested folder
 */
function filterFiles(allFiles, requestedFolders) {
    if (!requestedFolders || requestedFolders.length === 0) {
        return allFiles;
    }

    // Create a dictionary for direct lookup
    const folderMap = {};
    requestedFolders.forEach((folder) => {
        folderMap[folder] = true;
    });

    return allFiles.filter((file) => {
        // Match exact folder name
        if (folderMap[file.folder]) {
            return true;
        }

        // For variables-conditionals handle the special case
        if (
            folderMap["variables-conditionals"] &&
            file.folder === "variables-and-conditionals"
        ) {
            return true;
        }

        return false;
    });
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const folders = searchParams.get("folders")?.split(",") || [];

    console.log("API Request for folders:", folders);

    try {
        const codeDir = path.join(process.cwd(), "public", "assignments");
        console.log("Base directory:", codeDir);

        // Check if cache is still valid
        const now = Date.now();
        if (!fileCache || now - lastCacheTime > CACHE_DURATION) {
            console.log(
                "Cache expired or not initialized, loading all files..."
            );
            fileCache = await readFilesFromDirectory(codeDir);
            lastCacheTime = now;
        } else {
            console.log("Using cached files");
        }

        // Filter files based on requested folders
        const filteredFiles = filterFiles(fileCache, folders);

        // Group files by folder and language
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

        console.log("Grouped files structure:", Object.keys(groupedFiles));

        return NextResponse.json(groupedFiles);
    } catch (error) {
        console.error("Error reading files:", error);
        return NextResponse.json(
            { error: "Failed to read files", details: error.message },
            { status: 500 }
        );
    }
}
