import { promises as fs } from "fs";
import path from "path";

const SUPPORTED_EXTENSIONS = [".js", ".jsx", ".html", ".css"];

async function readFilesFromDirectory(dirPath) {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    const fileContents = [];

    for (const file of files) {
        const fullPath = path.join(dirPath, file.name);

        if (file.isDirectory()) {
            const subDirContents = await readFilesFromDirectory(fullPath);
            fileContents.push(...subDirContents);
        } else if (
            SUPPORTED_EXTENSIONS.some((ext) => file.name.endsWith(ext))
        ) {
            const content = await fs.readFile(fullPath, "utf8");
            const extension = path.extname(file.name).slice(1);
            // Get relative path from base code directory
            const relativePath = path.relative(process.cwd(), dirPath);
            // Extract folder name (last part of the path)
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

export async function getCodeFiles(directory = "code", config = {}) {
    const codeDir = path.join(process.cwd(), "public", directory);
    const { folders = [] } = config;

    try {
        const allFiles = await readFilesFromDirectory(codeDir);

        // Filter files based on specified folders if provided
        const filteredFiles =
            folders.length > 0
                ? allFiles.filter((file) => folders.includes(file.folder))
                : allFiles;

        // Group files by folder first, then by type
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

        return groupedFiles;
    } catch (error) {
        console.error(`Error reading code files from ${directory}:`, error);
        return {};
    }
}

// Example folder structure:
/*
public/
  code/
    example1/
      script.js
      styles.css
      index.html
    example2/
      script.js
      styles.css
      index.html
*/

// Example usage:
/*
// Get all files from all folders
const allFiles = await getCodeFiles();

// Get files only from specific folders
const specificFiles = await getCodeFiles("code", {
    folders: ["example1", "example2"]
});
*/
