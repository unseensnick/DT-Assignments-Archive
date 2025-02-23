"use client";

import { LifeBuoy, Send } from "lucide-react";
import * as React from "react";

import { NavHome } from "@/components/nav-home";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { generateNavigation } from "@/lib/nav-utils";

const { mainNavItems, projectItems } = generateNavigation();

const secondaryNavItems = [
    {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
    },
    {
        title: "Feedback",
        url: "#",
        icon: Send,
    },
];

export function AppSidebar({ ...props }) {
    return (
        <Sidebar
            className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
            collapsible="icon"
            {...props}
        >
            <SidebarContent>
                <NavHome />
                <NavMain items={mainNavItems} title="Courses" />
                <NavProjects projects={projectItems} />
                <NavSecondary items={secondaryNavItems} className="mt-auto" />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
