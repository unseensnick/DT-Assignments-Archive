import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import {
    Braces,
    CheckCheck,
    ChevronDown,
    ChevronUp,
    Copy,
    Download,
    FileCode,
    Languages,
    Maximize2,
    Minimize2,
    Play,
    RefreshCw,
    Settings,
    Terminal,
    Upload,
    X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Highlight, themes } from "prism-react-renderer";
import React, { useEffect, useRef, useState } from "react";

// Language definitions and settings for different file types
const LANGUAGE_DEFINITIONS = {
    js: {
        name: "JavaScript",
        icon: <Braces className="w-4 h-4" />,
        extension: ".js",
        language: "javascript",
        defaultFileName: "script.js",
        defaultContent:
            '// Write your JavaScript code here\n\nconsole.log("Hello world!");',
        supportRun: true,
    },
    jsx: {
        name: "React JSX",
        icon: <Braces className="w-4 h-4" />,
        extension: ".jsx",
        language: "jsx",
        defaultFileName: "component.jsx",
        defaultContent:
            'import React from "react";\n\nfunction MyComponent() {\n  return <div>Hello World</div>;\n}\n\nexport default MyComponent;',
        supportRun: false,
    },
    html: {
        name: "HTML",
        icon: <FileCode className="w-4 h-4" />,
        extension: ".html",
        language: "html",
        defaultFileName: "index.html",
        defaultContent:
            "<!DOCTYPE html>\n<html>\n<head>\n  <title>My HTML Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
        supportRun: true,
    },
    css: {
        name: "CSS",
        icon: <Languages className="w-4 h-4" />,
        extension: ".css",
        language: "css",
        defaultFileName: "styles.css",
        defaultContent:
            "/* Write your CSS styles here */\n\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  color: #333;\n}",
        supportRun: true,
    },
    python: {
        name: "Python",
        icon: <Braces className="w-4 h-4" />,
        extension: ".py",
        language: "python",
        defaultFileName: "script.py",
        defaultContent:
            '# Write your Python code here\n\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Python"))',
        supportRun: false,
    },
    json: {
        name: "JSON",
        icon: <Braces className="w-4 h-4" />,
        extension: ".json",
        language: "json",
        defaultFileName: "data.json",
        defaultContent:
            '{\n  "name": "John Doe",\n  "age": 30,\n  "isStudent": false,\n  "courses": ["Web Development", "UX Design"],\n  "address": {\n    "city": "New York",\n    "country": "USA"\n  }\n}',
        supportRun: false,
    },
};

// Function to get file extension from filename
function getFileExtension(filename) {
    const parts = filename.split(".");
    if (parts.length > 1) {
        return parts[parts.length - 1];
    }
    return "";
}

// Function to get language from file extension
function getLanguageFromExtension(extension) {
    const key = Object.keys(LANGUAGE_DEFINITIONS).find(
        (key) => LANGUAGE_DEFINITIONS[key].extension === `.${extension}`
    );
    return key ? LANGUAGE_DEFINITIONS[key] : LANGUAGE_DEFINITIONS.js;
}

const DEFAULT_HTML_TEMPLATE = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    /* CSS will be injected here */
  </style>
</head>
<body>
  <!-- HTML content will be injected here -->
  <script>
    // Console override to capture logs in the parent window
    (function() {
      const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info
      };
      
      // Create a proxy console that sends messages to parent
      console.log = function() {
        const args = Array.from(arguments).map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        );
        window.parent.postMessage({ 
          type: 'console',
          method: 'log',
          args: args.join(' ')
        }, '*');
        originalConsole.log.apply(console, arguments);
      };
      
      console.error = function() {
        const args = Array.from(arguments).map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        );
        window.parent.postMessage({ 
          type: 'console',
          method: 'error',
          args: args.join(' ')
        }, '*');
        originalConsole.error.apply(console, arguments);
      };
      
      console.warn = function() {
        const args = Array.from(arguments).map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        );
        window.parent.postMessage({ 
          type: 'console',
          method: 'warn',
          args: args.join(' ')
        }, '*');
        originalConsole.warn.apply(console, arguments);
      };
      
      console.info = function() {
        const args = Array.from(arguments).map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        );
        window.parent.postMessage({ 
          type: 'console',
          method: 'info',
          args: args.join(' ')
        }, '*');
        originalConsole.info.apply(console, arguments);
      };
      
      // Handle runtime errors
      window.addEventListener('error', function(event) {
        var errorMsg = event.message + ' at line ' + event.lineno + ':' + event.colno;
        window.parent.postMessage({ 
          type: 'console',
          method: 'error',
          args: errorMsg
        }, '*');
      });
    })();
    
    // JavaScript will be injected here
  </script>
</body>
</html>`;

const IsolatedCodeEditor = ({
    title = "Code Editor",
    initialFiles = [],
    height = 500,
    previewHeight = 300,
    isExpanded = true,
    animationDuration = 300,
    animationEasing = "ease",
    onChange,
    className,
    ...props
}) => {
    // Generate default files if none provided
    const defaultFiles =
        initialFiles.length > 0
            ? initialFiles
            : [
                  {
                      id: "file-1",
                      name: "index.html",
                      content: LANGUAGE_DEFINITIONS.html.defaultContent,
                      language: "html",
                  },
                  {
                      id: "file-2",
                      name: "styles.css",
                      content: LANGUAGE_DEFINITIONS.css.defaultContent,
                      language: "css",
                  },
                  {
                      id: "file-3",
                      name: "script.js",
                      content: LANGUAGE_DEFINITIONS.js.defaultContent,
                      language: "javascript",
                  },
              ];

    // State
    const [files, setFiles] = useState(defaultFiles);
    const [activeFileId, setActiveFileId] = useState(files[0]?.id);
    const [output, setOutput] = useState([]);
    const [isConsoleOpen, setIsConsoleOpen] = useState(false);
    const [editorExpanded, setEditorExpanded] = useState(isExpanded);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [tabSize, setTabSize] = useState(2);
    const [isCreatingFile, setIsCreatingFile] = useState(false);
    const [newFileName, setNewFileName] = useState("");
    const [newFileType, setNewFileType] = useState("js");
    const [isRunning, setIsRunning] = useState(false);

    const editorRef = useRef(null);
    const iframeRef = useRef(null);
    const { resolvedTheme } = useTheme();
    const currentTheme =
        resolvedTheme === "dark" ? themes.nightOwl : themes.github;
    const activeFile = files.find((file) => file.id === activeFileId);

    // Transition style
    const transitionStyle = `all ${animationDuration}ms ${animationEasing}`;

    // Handle messages from the iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === "console") {
                setOutput((prev) => [
                    ...prev,
                    {
                        type: event.data.method,
                        content: event.data.args,
                    },
                ]);
            }
        };

        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    // Generate sandbox content
    const generateSandboxHtml = () => {
        // Find the HTML, CSS, and JS files
        const htmlFile = files.find((file) => file.language === "html");
        const cssFiles = files.filter((file) => file.language === "css");
        const jsFiles = files.filter((file) => file.language === "javascript");

        let template = DEFAULT_HTML_TEMPLATE;

        // Insert HTML content
        if (htmlFile) {
            // Extract body content
            let bodyContent = htmlFile.content;

            // Very simple body extraction - in a real implementation, use an HTML parser
            const bodyStartMatch = bodyContent.match(/<body[^>]*>/i);
            const bodyEndMatch = bodyContent.match(/<\/body>/i);

            if (bodyStartMatch && bodyEndMatch) {
                const bodyStartIdx =
                    bodyStartMatch.index + bodyStartMatch[0].length;
                const bodyEndIdx = bodyEndMatch.index;
                bodyContent = bodyContent.substring(bodyStartIdx, bodyEndIdx);
            }

            template = template.replace(
                "<!-- HTML content will be injected here -->",
                bodyContent
            );
        }

        // Insert CSS content
        if (cssFiles.length > 0) {
            const cssContent = cssFiles
                .map((file) => `/* ${file.name} */\n${file.content}`)
                .join("\n\n");
            template = template.replace(
                "/* CSS will be injected here */",
                cssContent
            );
        }

        // Insert JavaScript content
        if (jsFiles.length > 0) {
            const jsContent = jsFiles
                .map((file) => `/* ${file.name} */\n${file.content}`)
                .join("\n\n");
            template = template.replace(
                "// JavaScript will be injected here",
                jsContent
            );
        }

        return template;
    };

    // Copy code to clipboard
    const copyCode = async () => {
        if (!activeFile) return;

        try {
            await navigator.clipboard.writeText(activeFile.content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
            toast({
                title: "Code copied",
                description: `${activeFile.name} copied to clipboard`,
                duration: 2000,
            });
        } catch (err) {
            console.error("Failed to copy code:", err);
            toast({
                title: "Failed to copy",
                description: "Could not copy code to clipboard",
                variant: "destructive",
                duration: 2000,
            });
        }
    };

    // Run code
    const runCode = () => {
        if (!activeFile) return;

        setIsRunning(true);
        setOutput([]);
        setIsConsoleOpen(true);

        // Update iframe with latest content
        if (iframeRef.current) {
            const content = generateSandboxHtml();
            iframeRef.current.srcdoc = content;
        }

        setIsRunning(false);
    };

    // Handle code change
    const handleCodeChange = (newContent) => {
        if (!activeFile) return;

        const updatedFiles = files.map((file) =>
            file.id === activeFile.id ? { ...file, content: newContent } : file
        );

        setFiles(updatedFiles);

        // Call onChange callback if provided
        if (onChange) {
            onChange(updatedFiles);
        }
    };

    // Create a new file
    const createNewFile = () => {
        if (!newFileName) return;

        const fileType = LANGUAGE_DEFINITIONS[newFileType];
        const extension = fileType.extension;

        // Add extension if not already present
        const fileName = newFileName.includes(".")
            ? newFileName
            : `${newFileName}${extension}`;

        // Check if file already exists
        if (files.some((file) => file.name === fileName)) {
            toast({
                title: "File already exists",
                description: `A file with the name "${fileName}" already exists.`,
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        const newFile = {
            id: `file-${Date.now()}`,
            name: fileName,
            content: fileType.defaultContent,
            language: fileType.language,
        };

        setFiles([...files, newFile]);
        setActiveFileId(newFile.id);
        setIsCreatingFile(false);
        setNewFileName("");

        toast({
            title: "File created",
            description: `Created ${fileName}`,
            duration: 2000,
        });
    };

    // Delete a file
    const deleteFile = (fileId) => {
        // Don't allow deleting the last file
        if (files.length <= 1) {
            toast({
                title: "Cannot delete file",
                description: "You must have at least one file.",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        const fileToDelete = files.find((file) => file.id === fileId);

        // Update files state
        const updatedFiles = files.filter((file) => file.id !== fileId);
        setFiles(updatedFiles);

        // If the active file was deleted, set a new active file
        if (activeFileId === fileId) {
            setActiveFileId(updatedFiles[0].id);
        }

        toast({
            title: "File deleted",
            description: `Deleted ${fileToDelete.name}`,
            duration: 2000,
        });
    };

    // Handle editor key commands like tab
    const handleKeyDown = (e) => {
        // Tab key for indentation
        if (e.key === "Tab") {
            e.preventDefault();
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            // Insert spaces for indentation
            const spaces = " ".repeat(tabSize);
            const newValue =
                textarea.value.substring(0, start) +
                spaces +
                textarea.value.substring(end);

            // Update textarea value and selection
            textarea.value = newValue;
            textarea.selectionStart = textarea.selectionEnd = start + tabSize;

            // Update file content state
            handleCodeChange(newValue);
        }
    };

    // Download the current file
    const downloadFile = () => {
        if (!activeFile) return;

        const blob = new Blob([activeFile.content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = activeFile.name;
        document.body.appendChild(a);
        a.click();

        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);

        toast({
            title: "File downloaded",
            description: `Downloaded ${activeFile.name}`,
            duration: 2000,
        });
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const extension = getFileExtension(file.name);
            const language = getLanguageFromExtension(extension);

            // Check if file already exists
            if (files.some((f) => f.name === file.name)) {
                // If exists, update its content
                const updatedFiles = files.map((f) =>
                    f.name === file.name
                        ? { ...f, content: event.target.result }
                        : f
                );
                setFiles(updatedFiles);
            } else {
                // If new file, add it
                const newFile = {
                    id: `file-${Date.now()}`,
                    name: file.name,
                    content: event.target.result,
                    language: language.language,
                };
                setFiles([...files, newFile]);
                setActiveFileId(newFile.id);
            }

            toast({
                title: "File uploaded",
                description: `${file.name} has been added to the editor`,
                duration: 2000,
            });
        };

        reader.readAsText(file);
    };

    // Render output in console
    const renderOutput = (item) => {
        return (
            <div
                className={`leading-relaxed whitespace-pre-wrap ${
                    item.type === "error"
                        ? "text-red-500"
                        : item.type === "warn"
                        ? "text-amber-500"
                        : item.type === "info"
                        ? "text-blue-500"
                        : "text-foreground"
                }`}
            >
                <span className="text-muted-foreground mr-4">
                    {item.type === "error"
                        ? "❌"
                        : item.type === "warn"
                        ? "⚠️"
                        : item.type === "info"
                        ? "ℹ️"
                        : ">"}
                </span>
                {item.content}
            </div>
        );
    };

    return (
        <div
            className={cn(
                "code-editor-container rounded-lg border shadow-sm",
                isFullscreen && "fixed inset-0 z-50 bg-background",
                className
            )}
            ref={editorRef}
            {...props}
        >
            <div className="border-b flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                    <FileCode className="text-primary w-5 h-5" />
                    <h2 className="text-lg font-medium">{title}</h2>
                </div>

                <div className="flex items-center gap-1">
                    {/* Settings button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowSettings(!showSettings)}
                        className={showSettings ? "bg-muted" : ""}
                    >
                        <Settings className="h-4 w-4" />
                    </Button>

                    {/* Console toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                        className={isConsoleOpen ? "bg-muted" : ""}
                    >
                        <Terminal className="h-4 w-4" />
                    </Button>

                    {/* Run code button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={runCode}
                        disabled={isRunning}
                    >
                        {isRunning ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Fullscreen toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                        {isFullscreen ? (
                            <Minimize2 className="h-4 w-4" />
                        ) : (
                            <Maximize2 className="h-4 w-4" />
                        )}
                    </Button>

                    {/* Expand/collapse toggle */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditorExpanded(!editorExpanded)}
                    >
                        {editorExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>

            {showSettings && (
                <div className="border-b p-2 bg-muted/30">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">
                                Font Size:
                            </label>
                            <Select
                                value={fontSize.toString()}
                                onValueChange={(val) =>
                                    setFontSize(Number(val))
                                }
                            >
                                <SelectTrigger className="w-16 h-8">
                                    <SelectValue placeholder="14px" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[12, 14, 16, 18, 20].map((size) => (
                                        <SelectItem
                                            key={size}
                                            value={size.toString()}
                                        >
                                            {size}px
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium">
                                Tab Size:
                            </label>
                            <Select
                                value={tabSize.toString()}
                                onValueChange={(val) => setTabSize(Number(val))}
                            >
                                <SelectTrigger className="w-16 h-8">
                                    <SelectValue placeholder="2" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[2, 4, 8].map((size) => (
                                        <SelectItem
                                            key={size}
                                            value={size.toString()}
                                        >
                                            {size}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={downloadFile}
                                disabled={!activeFile}
                            >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                            </Button>

                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    accept=".js,.jsx,.ts,.tsx,.html,.css,.json,.md,.py"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                                <Button variant="outline" size="sm" asChild>
                                    <span>
                                        <Upload className="h-4 w-4 mr-1" />
                                        Upload
                                    </span>
                                </Button>
                            </label>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex" style={{ transition: transitionStyle }}>
                <div className="file-tabs w-full">
                    <div className="flex items-center pl-2 bg-muted/30 border-b overflow-x-auto">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className={`group flex items-center gap-1 px-3 py-2 text-sm font-medium border-r cursor-pointer ${
                                    activeFileId === file.id
                                        ? "border-b-2 border-b-primary -mb-[2px] text-primary bg-background"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                                onClick={() => setActiveFileId(file.id)}
                            >
                                {(() => {
                                    const ext = getFileExtension(file.name);
                                    const langDef =
                                        getLanguageFromExtension(ext);
                                    return langDef.icon;
                                })()}
                                <span className="truncate max-w-[120px]">
                                    {file.name}
                                </span>
                                {files.length > 1 && (
                                    <button
                                        className="opacity-0 group-hover:opacity-100 hover:text-destructive"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteFile(file.id);
                                        }}
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            className="p-2 text-muted-foreground hover:text-primary"
                            onClick={() => setIsCreatingFile(true)}
                        >
                            +
                        </button>
                    </div>

                    <div
                        className={`code-container ${
                            editorExpanded ? "overflow-auto" : "overflow-hidden"
                        }`}
                        style={{
                            maxHeight: editorExpanded ? `${height}px` : 0,
                            transition: transitionStyle,
                        }}
                    >
                        {activeFile && (
                            <div className="relative">
                                <Highlight
                                    theme={currentTheme}
                                    code={activeFile.content}
                                    language={activeFile.language}
                                >
                                    {({
                                        className,
                                        style,
                                        tokens,
                                        getLineProps,
                                        getTokenProps,
                                    }) => (
                                        <pre
                                            className={`p-4 font-mono ${
                                                resolvedTheme === "dark"
                                                    ? "bg-muted/50"
                                                    : "bg-muted/30"
                                            }`}
                                            style={{
                                                ...style,
                                                fontSize: `${fontSize}px`,
                                                position: "relative",
                                            }}
                                        >
                                            <div className="absolute top-2 right-2 z-10 flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={copyCode}
                                                    className="h-7 w-7 p-0 rounded-full opacity-70 hover:opacity-100 bg-background/50"
                                                >
                                                    {isCopied ? (
                                                        <CheckCheck className="h-3.5 w-3.5 text-green-500" />
                                                    ) : (
                                                        <Copy className="h-3.5 w-3.5" />
                                                    )}
                                                </Button>
                                            </div>
                                            <div className="flex">
                                                <div className="line-numbers text-muted-foreground pr-4 select-none">
                                                    {tokens.map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="text-right tabular-nums"
                                                        >
                                                            {i + 1}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="code-content flex-1">
                                                    <textarea
                                                        spellCheck="false"
                                                        className="absolute inset-0 w-full h-full opacity-0 resize-none outline-none tab-size-4 p-4 pl-0 font-mono"
                                                        style={{
                                                            fontSize: `${fontSize}px`,
                                                            tabSize: tabSize,
                                                        }}
                                                        value={
                                                            activeFile.content
                                                        }
                                                        onChange={(e) =>
                                                            handleCodeChange(
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyDown={
                                                            handleKeyDown
                                                        }
                                                    />
                                                    {tokens.map((line, i) => (
                                                        <div
                                                            key={i}
                                                            {...getLineProps({
                                                                line,
                                                            })}
                                                            className="leading-relaxed"
                                                        >
                                                            {line.map(
                                                                (
                                                                    token,
                                                                    key
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            key
                                                                        }
                                                                        {...getTokenProps(
                                                                            {
                                                                                token,
                                                                            }
                                                                        )}
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </pre>
                                    )}
                                </Highlight>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Preview section */}
            {editorExpanded && (
                <div className="border-t">
                    <div className="flex items-center px-4 py-2 border-b bg-muted/30">
                        <h3 className="text-sm font-medium">Preview</h3>
                    </div>
                    <div
                        className="preview-container"
                        style={{
                            height: `${previewHeight}px`,
                            overflow: "auto",
                        }}
                    >
                        {/* Fully sandboxed iframe */}
                        <iframe
                            ref={iframeRef}
                            srcDoc={generateSandboxHtml()}
                            title="Preview"
                            className="w-full h-full border-0"
                            sandbox="allow-scripts"
                        />
                    </div>
                </div>
            )}

            {/* Console output section */}
            {isConsoleOpen && editorExpanded && (
                <div className="border-t">
                    <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
                        <h3 className="text-sm font-medium">Console</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setOutput([])}
                            className="h-6 text-xs"
                        >
                            Clear
                        </Button>
                    </div>
                    <div
                        className="console-output p-4 font-mono text-sm overflow-auto"
                        style={{
                            maxHeight: `${height / 2}px`,
                            backgroundColor:
                                resolvedTheme === "dark"
                                    ? "hsl(215 27.9% 16.9% / 0.5)"
                                    : "hsl(220 14.3% 95.9% / 0.7)",
                        }}
                    >
                        {output.length > 0 ? (
                            output.map((item, index) => (
                                <div key={index} className="mb-2">
                                    {renderOutput(item)}
                                </div>
                            ))
                        ) : (
                            <div className="text-muted-foreground italic">
                                No output to display. Run your code to see
                                results here.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* New File Dialog */}
            <Dialog open={isCreatingFile} onOpenChange={setIsCreatingFile}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New File</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label
                                htmlFor="name"
                                className="text-right font-medium"
                            >
                                Name
                            </label>
                            <input
                                id="name"
                                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={newFileName}
                                onChange={(e) => setNewFileName(e.target.value)}
                                placeholder="e.g. main.js"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label
                                htmlFor="filetype"
                                className="text-right font-medium"
                            >
                                Type
                            </label>
                            <Select
                                value={newFileType}
                                onValueChange={setNewFileType}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="JavaScript" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(LANGUAGE_DEFINITIONS).map(
                                        ([key, value]) => (
                                            <SelectItem key={key} value={key}>
                                                <div className="flex items-center gap-2">
                                                    {value.icon}
                                                    <span>{value.name}</span>
                                                </div>
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={createNewFile}
                            disabled={!newFileName}
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default IsolatedCodeEditor;
