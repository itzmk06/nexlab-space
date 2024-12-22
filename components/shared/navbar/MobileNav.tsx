"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/constant";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";
import { useAuth } from "@clerk/nextjs";

const NavContent = () => {
  const { userId } = useAuth();
  const pathName = usePathname();

  const filteredLinks = userId
    ? sidebarLinks.map((link) =>
        link.route === "/profile"
          ? { ...link, route: `${link.route}/${userId}` }
          : link,
      )
    : sidebarLinks.filter((link) => link.route !== "/profile");

  return (
    <section className="flex flex-col gap-4 pt-6 md:pt-5">
      {filteredLinks.map((item) => {
        const isActive =
          (pathName.includes(item.route) && item.route.length > 1) ||
          pathName === item.route;

        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`flex rounded-lg items-center justify-start  gap-3 px-2 py-2 transition-all duration-300
                ${isActive ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white" : "text-gray-600 dark:text-gray-300"}
                rounded-lg hover:scale-105 hover:rounded-lg hover:bg-blue-200 dark:hover:bg-blue-500`}
            >
              <i
                className={`${item.icon} text-xl transition-transform duration-300`}
                style={{ color: isActive ? "#FFF" : item.color }}
              />
              <p className="text-base font-semibold">{item.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export default function MobileNav() {
  const { mode } = useTheme();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="sm:hidden cursor-pointer transition-all duration-300">
          <Image
            src="/assets/icons/hamburger.svg"
            alt="menu"
            width={35}
            height={35}
            className="transition-transform transform hover:rotate-90" 
            style={{
              filter: mode === "light" ? "invert(1)" : "invert(0)",
            }}
          />
        </div>
      </SheetTrigger>

      <SheetContent className="bg-white -mt-2 dark:bg-gray-800 border-none w-64 shadow-lg transition-all duration-300 ease-in-out">
        <SheetHeader>
          <Link href="/" className="flex items-center gap-1  py-1 ">
            <Image
              className="w-8 md:w-8 rounded-md"
              src={mode === "dark" ? "/assets/nexlab-light.png" : "/assets/nexlab.png"}
              width={28}
              height={28}
              alt="NexLab"
            />
            <p className="text-2xl -ml-1 font-extrabold text-gray-800 dark:text-gray-100">
              exLab
            </p>
          </Link>
        </SheetHeader>
        <div className="min-h-screen overflow-y-auto -mt-3">
          <NavContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
