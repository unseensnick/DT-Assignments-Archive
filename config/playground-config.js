export const DEFAULT_PLAYGROUND_CONFIG = {
    title: "Code Playground",
    previewTitle: "Preview",
    codeTitle: "Code Playground",
    codeHeight: 600,
    consoleWidth: 40,
    previewHeight: 750,
    initialExpanded: false,
    isExpanded: false, // For playground type
    codeExpanded: false, // For assignment viewer type
    enableRun: {
        html: true,
        css: true,
        javascript: true,
    },
    animation: {
        duration: 500,
        easing: "ease-in-out",
    },
};

export function createPlaygroundConfig(customConfig = {}) {
    const mergedConfig = {
        ...DEFAULT_PLAYGROUND_CONFIG,
        ...customConfig,
        enableRun: {
            ...DEFAULT_PLAYGROUND_CONFIG.enableRun,
            ...(customConfig.enableRun || {}),
        },
        animation: {
            ...DEFAULT_PLAYGROUND_CONFIG.animation,
            ...(customConfig.animation || {}),
        },
    };

    // Set initialExpanded based on the appropriate expansion setting
    mergedConfig.initialExpanded =
        customConfig.isExpanded || customConfig.codeExpanded || false;
        
    // Ensure we have fallback titles
    if (!mergedConfig.previewTitle && customConfig.title) {
        mergedConfig.previewTitle = customConfig.title + " Preview";
    }
    
    if (!mergedConfig.codeTitle && customConfig.title) {
        mergedConfig.codeTitle = customConfig.title;
    }

    return mergedConfig;
}

export function mergePlaygroundConfigs(...configs) {
    const mergedConfig = configs.reduce((merged, config) => {
        if (!config) return merged;

        return {
            ...merged,
            ...config,
            enableRun: {
                ...merged.enableRun,
                ...(config.enableRun || {}),
            },
            animation: {
                ...merged.animation,
                ...(config.animation || {}),
            },
        };
    }, DEFAULT_PLAYGROUND_CONFIG);

    // Ensure expansion states are properly merged
    mergedConfig.initialExpanded = configs.some(
        (config) => config?.isExpanded || config?.codeExpanded
    );

    return mergedConfig;
}

export function getTopicConfig(
    courseConfig,
    { course, module, section, topic }
) {
    const moduleConfig = courseConfig[course]?.modules[module];
    if (!moduleConfig) return null;

    // Get course level config
    const globalConfig = createPlaygroundConfig(
        courseConfig[course]?.playgroundConfig || {}
    );

    if (moduleConfig.type === "playground") {
        const topicConfig = moduleConfig.weeks[section]?.topics[topic];
        if (!topicConfig) return null;

        // Check if topic has its own type (iframe)
        if (topicConfig.type === "iframe") {
            // Handle iframe configuration
            const baseConfig = topicConfig.viewerConfig?.playground || {};
            
            // Create a combined config with titles
            const combinedConfig = {
                ...baseConfig,
                previewTitle: topicConfig.previewTitle,
                codeTitle: topicConfig.codeTitle,
                title: topicConfig.title || topic.replace(/-/g, " ")
            };
            
            // Merge global config with iframe-specific config
            return mergePlaygroundConfigs(globalConfig, combinedConfig);
        }

        // Standard playground behavior
        // Start with global config, then override with topic-specific settings
        return createPlaygroundConfig({
            ...globalConfig,
            ...topicConfig,
            title: topicConfig.title || topic.replace(/-/g, " "),
            previewTitle: topicConfig.previewTitle,
            codeTitle: topicConfig.codeTitle,
            enableRun: {
                ...globalConfig.enableRun,
                ...(topicConfig.enableRun || {}),
            },
            animation: {
                ...globalConfig.animation,
                duration:
                    topicConfig.animationDuration ||
                    globalConfig.animation.duration,
                easing:
                    topicConfig.animationEasing ||
                    globalConfig.animation.easing,
            },
        });
    }

    if (moduleConfig.type === "iframe") {
        const sectionConfig = moduleConfig.sections[section];
        if (!sectionConfig || !sectionConfig.topics.includes(topic))
            return null;

        const baseConfig = sectionConfig.viewerConfig?.playground || {};
        const topicConfig =
            sectionConfig.topicConfigs?.[topic]?.playground || {};
            
        // Get specific titles from the topic config if available
        const titles = sectionConfig.topicConfigs?.[topic] || {};

        // Create a config with titles
        const combinedConfig = {
            ...topicConfig,
            previewTitle: titles.previewTitle,
            codeTitle: titles.codeTitle,
            title: titles.title || topic.replace(/-/g, " ")
        };

        // Merge in order: global -> section -> topic
        return mergePlaygroundConfigs(globalConfig, baseConfig, combinedConfig);
    }

    return null;
}