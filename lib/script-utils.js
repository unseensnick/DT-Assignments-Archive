// lib/script-utils.js
import { getPossibleFolders } from "./file-mapping";

export async function getCodeFiles(directory = "assignments", config = {}) {
    const { folders = [] } = config;

    try {
        let queryParams = "";

        // If specific folders were provided, use them
        if (folders.length > 0) {
            // Map each folder to its possible variations
            const allPossibleFolders = folders.flatMap((folder) => {
                // If it's an empty string, we want to get everything
                if (folder === "") {
                    return [""];
                }
                return getPossibleFolders(folder);
            });

            // Join with commas to create the query parameter
            queryParams = `?folders=${allPossibleFolders.join(",")}`;
        }

        console.log(`Fetching files with query: ${queryParams}`);

        const response = await fetch(`/api/assignments/files${queryParams}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch files: ${response.statusText}`);
        }

        const data = await response.json();

        // If we received an empty result, try again without parameters
        if (Object.keys(data).length === 0 && folders.length > 0) {
            console.log(
                "No results found with specified folders, trying without filters"
            );
            return getCodeFiles(directory);
        }

        return data;
    } catch (error) {
        console.error(`Error fetching code files:`, error);
        return {};
    }
}
