'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create a context for API data
const ApiDataContext = createContext(null);

// Global cache that persists across navigation
let globalCache = {
  allFiles: null,
  folderFiles: {},
  lastFetchTime: 0
};

// Cache expiration time (10 minutes)
const CACHE_EXPIRY = 10 * 60 * 1000;

export function ApiDataProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Function to check if cache is expired
  const isCacheExpired = useCallback(() => {
    return Date.now() - globalCache.lastFetchTime > CACHE_EXPIRY;
  }, []);

  // Lazy load all files once on initial mount
  useEffect(() => {
    if (!initialized && !globalCache.allFiles) {
      fetchAllFiles();
    } else {
      setInitialized(true);
    }
  }, [initialized]);

  // Function to fetch all files (used for initial load and cache refresh)
  const fetchAllFiles = useCallback(async (force = false) => {
    // If we already have data and it's not forced, skip
    if (globalCache.allFiles && !force && !isCacheExpired()) {
      setInitialized(true);
      return globalCache.allFiles;
    }

    setLoading(true);
    console.log("Fetching all files (lazy loaded)");
    
    try {
      const response = await fetch('/api/assignments/files');
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      
      const data = await response.json();
      
      // Update global cache
      globalCache.allFiles = data;
      globalCache.lastFetchTime = Date.now();
      setInitialized(true);
      return data;
    } catch (error) {
      console.error('Error fetching all files:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [isCacheExpired]);

  // Function to get files for specific folders
  const getFilesByFolders = useCallback(async (folders) => {
    if (!folders || folders.length === 0) {
      // Return all files if no specific folders requested
      return globalCache.allFiles || await fetchAllFiles();
    }

    // Create a cache key from the folders array
    const cacheKey = folders.sort().join(',');
    
    // Check if we have this in the folder cache
    if (globalCache.folderFiles[cacheKey] && !isCacheExpired()) {
      console.log(`Using cached data for folders: ${cacheKey}`);
      return globalCache.folderFiles[cacheKey];
    }
    
    // If all files are in cache, filter them client-side instead of making an API call
    if (globalCache.allFiles && !isCacheExpired()) {
      console.log(`Filtering from cache for folders: ${cacheKey}`);
      
      // Filter the files
      const filteredFiles = {};
      
      for (const [folderName, folderContent] of Object.entries(globalCache.allFiles)) {
        if (folders.includes(folderName)) {
          filteredFiles[folderName] = folderContent;
        } else if (
          // Handle special case for variables-conditionals
          folders.includes('variables-conditionals') && 
          folderName === 'variables-and-conditionals'
        ) {
          filteredFiles[folderName] = folderContent;
        }
      }
      
      // Cache the filtered result
      globalCache.folderFiles[cacheKey] = filteredFiles;
      return filteredFiles;
    }
    
    // Fall back to API call if necessary
    console.log(`Making API call for folders: ${cacheKey}`);
    setLoading(true);
    
    try {
      const response = await fetch(`/api/assignments/files?folders=${cacheKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch files for folders');
      }
      
      const data = await response.json();
      
      // Cache the result
      globalCache.folderFiles[cacheKey] = data;
      return data;
    } catch (error) {
      console.error(`Error fetching files for folders ${cacheKey}:`, error);
      return {};
    } finally {
      setLoading(false);
    }
  }, [fetchAllFiles, isCacheExpired]);

  // Value to provide through context
  const contextValue = {
    loading,
    initialized,
    fetchAllFiles,
    getFilesByFolders,
    clearCache: () => {
      globalCache = {
        allFiles: null,
        folderFiles: {},
        lastFetchTime: 0
      };
      setInitialized(false);
    }
  };

  return (
    <ApiDataContext.Provider value={contextValue}>
      {children}
    </ApiDataContext.Provider>
  );
}

// Custom hook to use the API data
export function useApiData() {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error('useApiData must be used within an ApiDataProvider');
  }
  return context;
}