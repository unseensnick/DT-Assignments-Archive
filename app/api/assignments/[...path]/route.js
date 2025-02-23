import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(request, { params: paramsPromise }) {
    try {
        const params = await Promise.resolve(paramsPromise);
        const pathSegments = await Promise.resolve(params.path);
        const assignmentPath = pathSegments.join("/");

        const fullPath = path.join(
            process.cwd(),
            "public",
            "assignments",
            assignmentPath
        );

        // If requesting a specific file
        if (assignmentPath.includes(".")) {
            try {
                const content = await fs.readFile(fullPath, "utf-8");
                return new NextResponse(content, {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                });
            } catch (error) {
                return NextResponse.json(
                    { error: "File not found" },
                    { status: 404 }
                );
            }
        }

        // If requesting directory contents
        try {
            const files = await fs.readdir(fullPath, { withFileTypes: true });
            const fileList = files
                .filter((file) => file.isFile())
                .reduce((acc, file) => {
                    const ext = path.extname(file.name).slice(1);
                    const language = ext === "js" ? "javascript" : ext;

                    if (!acc[language]) {
                        acc[language] = [];
                    }

                    acc[language].push({
                        name: file.name,
                        language: language,
                    });

                    return acc;
                }, {});

            return NextResponse.json(fileList);
        } catch (error) {
            return NextResponse.json(
                { error: "Assignment directory not found" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
