import React from "react";
import SidebarOption from "@/components/admin/sidebar_options";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Server,
  LandPlot,
  ShieldCheck,
  HardDriveDownload,
  Copyright,
  FolderOpen,
  BarChart3,
  LockKeyhole,
  PanelLeftClose,
  PanelLeftOpen,
  Airplay,
} from "lucide-react";
import UserDropDown from "@/components/admin/user_dropdown";
import { useToggleSidebar } from "@/utils/states";
import { GearIcon } from "@radix-ui/react-icons";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const sidebarState = useToggleSidebar((state) => state.isOpen);
  const sidebarToggle = useToggleSidebar((state) => state.toggleSidebar);

  const sidebarLinks = [
    {
      name: "Nodes",
      icon: Server,
      options: [
        {
          name: "All",
          link: "/admin/node",
          icon: Airplay,
        },
        {
          name: "Node Type",
          link: "/admin/node/type",
          icon: Airplay,
        },
      ],
    },
    {
      name: "User Management",
      icon: Server,
      options: [
        {
          name: "Users",
          link: "/admin/user",
          icon: Airplay,
        },
        {
          name: "Roles",
          link: "/admin/user/roles",
          icon: Airplay,
        },
      ],
    },
    {
      name: "Material Management",
      icon: ShieldCheck,
      options: [
        {
          name: "Categories",
          link: "/admin/categories",
          icon: Airplay,
        },

        {
          name: "Items",
          link: "/admin/items",
          icon: Airplay,
        },
      ],
    },
  ];

  return (
    <div
      id="logo-sidebar"
      className="absolute top-0 left-0 z-40 w-auto h-screen transition-transform border-r border-border translate-x-0 bg-background "
    >
      <div className="h-full flex flex-col justify-between pr-2 pl-3.5 py-5  overflow-y-scroll bg-background">
        <div className="">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-border">
            {!sidebarState && (
              <div className="flex items-center gap-2">
                <Image
                  priority
                  className="h-8 w-auto"
                  src="/admin_logo.png"
                  width={50}
                  height={50}
                  alt="logo"
                />
                <div className="block">
                  <p className="whitespace-nowrap text-xs">Dashboard</p>
                  <p className="text-muted-foreground text-xs whitespace-nowrap  overflow-hidden">
                    {pathname.split("/")[pathname.split("/").length - 1]}
                  </p>
                </div>
              </div>
            )}
            <div
              className={`gap-2 flex items-center ${sidebarState && "mx-auto"}`}
            >
              {!sidebarState && <UserDropDown />}
              {sidebarState ? (
                <Button
                  variant={"ghost"}
                  onClick={sidebarToggle}
                  className="p-2"
                >
                  <PanelLeftOpen className="w-5 h-5" />
                </Button>
              ) : (
                <Button
                  variant={"ghost"}
                  onClick={sidebarToggle}
                  className="p-2"
                >
                  <PanelLeftClose className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
          <ul className="space-y-2 font-normal">
            {sidebarLinks.map((link, _) => (
              <SidebarOption
                key={_}
                id={_}
                name={link.name}
                options={link.options}
                icon={link.icon}
              />
            ))}
          </ul>
        </div>
        <div className="border-t border-border pt-2 space-y-2">
          <Link href={"/admin/dashboard/settings"}>
            <Button
              className="w-full"
              variant={pathname === "/dashboard/settings" ? "default" : "ghost"}
            >
              <div className="w-full text-left flex items-center justify-start gap-2">
                <Settings className="h-4 w-4" />
                {!sidebarState && "Settings"}
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
