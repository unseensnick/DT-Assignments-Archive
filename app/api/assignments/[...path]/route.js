import { getCodeFiles } from "@/lib/script-utils";
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(request, { params: paramsPromise }) {
    try {
        const params = await Promise.resolve(paramsPromise);
        const pathSegments = await Promise.resolve(params.path);
        const assignmentPath = pathSegments.join("/");

        // If requesting a specific file (like index.html or style.css)
        if (assignmentPath.includes(".")) {
            const filePath = path.join(
                process.cwd(),
                "public",
                "assignments",
                assignmentPath
            );
            try {
                const content = await fs.readFile(filePath, "utf-8");
                return new NextResponse(content);
            } catch (error) {
                return new NextResponse("File not found", { status: 404 });
            }
        }

        // If requesting folder contents
        const folderName = path.basename(assignmentPath);
        const files = await getCodeFiles("assignments", {
            folders: [folderName],
        });

        if (!files[folderName]) {
            return NextResponse.json(
                { error: "Assignment not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(files[folderName]);
    } catch (error) {
        console.error("Error fetching assignment:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
