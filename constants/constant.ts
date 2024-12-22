import { SidebarLink } from "@/types";

export const sidebarLinks: SidebarLink[] = [
    // Main Navigation
    {
        icon: "fi fi-ss-home",
        route: "/",
        label: "Home",
        color: "#2196F3", // Blue shade for a modern look
        hoverColor: "hover:bg-[#2196F3] hover:bg-opacity-30",
    },
    {
        icon: "fi fi-sr-users",
        route: "/community",
        label: "Community",
        color: "#4CAF50", // Green shade for a fresh look
        hoverColor: "hover:bg-[#4CAF50] hover:bg-opacity-30",
    },
    {
        icon: "fi fi-ss-bookmark",
        route: "/collection",
        label: "Collections",
        color: "#FFC107", // Warm yellow for a vibrant feel
        hoverColor: "hover:bg-[#FFC107] hover:bg-opacity-30",
    },
    {
        icon: "fi fi-sr-tags",
        route: "/tags",
        label: "Tags",
        color: "#FF5722", // Rich orange for energy
        hoverColor: "hover:bg-[#FF5722] hover:bg-opacity-30",
    },

    // Profile & Personal
    {
        icon: "fi fi-ss-user",
        route: "/profile",
        label: "Profile",
        color: "#E91E63", // Bold pink for a dynamic look
        hoverColor: "hover:bg-[#E91E63] hover:bg-opacity-30",
    },

    // Work & Projects
    {
        icon: "fi fi-sr-briefcase",
        route: "/jobs",
        label: "Find Jobs",
        color: "#9C27B0", // Purple shade for a unique touch
        hoverColor: "hover:bg-[#9C27B0] hover:bg-opacity-30",
    },
    {
        icon: "fi fi-sr-briefcase",
        route: "/feed",
        label: "Projects",
        color: "#FF9800", // Bright orange for enthusiasm
        hoverColor: "hover:bg-[#FF9800] hover:bg-opacity-30",
    },

    // External Links
    {
        icon: "fi fi-sr-paper-plane",
        route: "https://chatappnew-kappa.vercel.app/",
        label: "Messages",
        color: "#00BCD4", // Cyan for a calm and professional look
        hoverColor: "hover:bg-[#00BCD4] hover:bg-opacity-30",
    },
    {
        icon: "fi fi-ss-comment-alt-check",
        route: "https://todo-list-project-five-sigma.vercel.app/",
        label: "Todo",
        color: "#607D8B", // Slate grey for a clean, minimal vibe
        hoverColor: "hover:bg-[#607D8B] hover:bg-opacity-30",
    },
];
