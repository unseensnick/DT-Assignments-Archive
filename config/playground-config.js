// playground-config.js
export const DEFAULT_PLAYGROUND_CONFIG = {
    title: "Code Playground",
    codeHeight: 600,
    consoleWidth: 40,
    previewHeight: 750,
    initialExpanded: false,
    isExpanded: false, // For playground type
    codeExpanded: false, // For assignment viewer type (replaces htmlExpanded/cssExpanded)
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

        // Start with global config, then override with topic-specific settings
        return createPlaygroundConfig({
            ...globalConfig,
            ...topicConfig,
            title: topicConfig.title || topic,
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

        // Merge in order: global -> section -> topic
        return mergePlaygroundConfigs(globalConfig, baseConfig, topicConfig);
    }

    return null;
}
