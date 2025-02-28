/**
 * This utility provides direct mapping between assignment names
 * and the actual folders/files in the file system
 */

// Direct mapping between topic slugs and folder names
export const FOLDER_MAPPING = {
    datatypes: "datatypes",
    functions: "functions",
    loops: "loops",
    methods: "methods",
    "objects-loops": "objects-loops",
    "variables-conditionals": "variables-and-conditionals",
    "code-along": "code-along",
    "dom-manipulation": "dom-manipulation",
};

/**
 * Get the correct folder name for a given topic slug
 */
export function getTopicFolder(topicSlug) {
    // If we have a direct mapping, use it
    if (FOLDER_MAPPING[topicSlug]) {
        return FOLDER_MAPPING[topicSlug];
    }

    // Default to the topic slug itself
    return topicSlug;
}

/**
 * Get a list of all possible folder names to try for a topic
 */
export function getPossibleFolders(topicSlug) {
    const folders = [];

    // Add the mapped folder if available
    if (FOLDER_MAPPING[topicSlug]) {
        folders.push(FOLDER_MAPPING[topicSlug]);
    }

    // Add the original topic slug as fallback
    if (!folders.includes(topicSlug)) {
        folders.push(topicSlug);
    }

    // Add variations for variables-conditionals
    if (topicSlug === "variables-conditionals") {
        folders.push("variables-and-conditionals");
    }

    // Return all possible folders
    return folders;
}
