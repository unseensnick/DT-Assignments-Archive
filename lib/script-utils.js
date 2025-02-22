export async function getCodeFiles(directory = "assignments", config = {}) {
    const { folders = [] } = config;

    try {
        const queryParams =
            folders.length > 0 ? `?folders=${folders.join(",")}` : "";
        const response = await fetch(`/api/assignments/files${queryParams}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch files: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching code files:`, error);
        return {};
    }
}
