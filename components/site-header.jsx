"use client";

import { SidebarIcon } from "lucide-react";
import { useParams } from "next/navigation";

import { SearchForm } from "@/components/search-form";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { generateBreadcrumbs } from "@/lib/nav-utils";
import * as React from "react";

export function SiteHeader() {
    const { toggleSidebar } = useSidebar();
    const params = useParams();
    const breadcrumbs = generateBreadcrumbs(params);

    return (
        <header className="bg-white sticky top-0 z-50 flex w-full items-center border-b dark:bg-gray-950">
            <div className="flex h-(--header-height) w-full items-center gap-2 px-2">
                <Button
                    className="h-8 w-8 mr-4"
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                >
                    <SidebarIcon />
                </Button>
                <Breadcrumb className="hidden sm:block">
                    <BreadcrumbList>
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={crumb.href}>
                                <BreadcrumbItem>
                                    {crumb.current ? (
                                        <BreadcrumbPage>
                                            {crumb.title}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={crumb.href}>
                                            {crumb.title}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < breadcrumbs.length - 1 && (
                                    <BreadcrumbSeparator />
                                )}
                            </React.Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
                <SearchForm className="w-full transition-all duration-300 sm:ml-auto sm:w-64 sm:focus-within:w-96" />
                <ThemeSwitcher className="h-8 w-8 ml-4" />
            </div>
        </header>
    );
}
