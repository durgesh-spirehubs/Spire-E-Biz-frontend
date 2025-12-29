"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import useMenuItems from "@/hooks/useMenuItems";
import { menuItem } from "./menu-item";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  CogIcon,
  MessageCircleQuestionIcon,
} from "lucide-react";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MenuItem {
  id: string;
  title: string;
  url?: string;
  icon?: React.ReactNode;
  type: "collapse" | "item" | "label";
  children?: MenuItem[];
}

export function Sidebar() {
  const filterPages = useMenuItems(menuItem);
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = useState<string | undefined>(
    undefined
  );

  const handleCollapseClick = (id: string) => {
    setExpandedMenu(expandedMenu === id ? undefined : id);
  };

  // RENDER LABEL
  const renderLabel = (title: string, isChildren: boolean) => (
    <h3
      className={cn(
        "font-semibold text-muted-foreground duration-100 px-4",
        isChildren ? "text-[12px]" : "text-sm pb-2"
      )}
    >
      {title}
    </h3>
  );

  // RENDER MENU BUTTON
  const renderMenuItemButton = (menuItem: MenuItem, isChildren: boolean) => (
    <Link href={menuItem.url!} key={menuItem.id}>
      <Button
        variant={pathname === menuItem.url ? "secondary" : "ghost"}
        className={cn(
          "font-normal w-full justify-start flex gap-2 mb-2",
          isChildren ? "text-[13px]" : "text-sm",
          { "border-l-2 border-primary": pathname === menuItem.url }
        )}
        onClick={() => setExpandedMenu(undefined)}
      >
        {isChildren && <div className="border-b-2 w-3 -ml-4 -mt-[2px]" />}
        <div className="text-muted-foreground -ml-1">
          {menuItem.icon ? menuItem.icon : <GoDotFill />}
        </div>
        {menuItem.title}
      </Button>
    </Link>
  );

  // RENDER COLLAAPSABLE MENU
  const renderCollapseButton = (menuItem: MenuItem) => (
    <div className="duration-100" key={menuItem.id}>
      <Button
        variant={pathname === menuItem.url ? "secondary" : "ghost"}
        className={cn("font-normal w-full justify-start flex gap-2 mb-2", {
          "border-l-2 rounded-tl-lg rounded-bl-none -ml-[2px]":
            expandedMenu === menuItem.id,
        })}
        onClick={() => handleCollapseClick(menuItem.id)}
      >
        <div className="text-muted-foreground">{menuItem.icon}</div>
        {menuItem.title}
        {expandedMenu !== menuItem.id ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronUp size={16} />
        )}
      </Button>
      {expandedMenu === menuItem.id && (
        <div className="border-l-2 rounded-bl-lg -ml-[2px]">
          {menuItem.children?.map((submenuItem, index) =>
            renderMenuItem(submenuItem, true)
          )}
        </div>
      )}
    </div>
  );

  const renderMenuItem = (menuItem: MenuItem, isChildren: boolean = false) => {
    switch (menuItem.type) {
      case "collapse":
        return renderCollapseButton(menuItem);
      case "label":
        return renderLabel(menuItem.title, isChildren);
      case "item":
        return renderMenuItemButton(menuItem, isChildren);
      default:
        return null;
    }
  };

  return (
    <div className="h-full pb-3 pt-2 mt-1">
      <div className="bg-white dark:bg-slate-950 rounded-lg shadow-custom h-full flex flex-col justify-between space-y-4 py-4">
        <ScrollArea>
          <div className="px-3 py-2">
            <div className="space-y-1">
              {filterPages &&
                filterPages.map((menuItem: MenuItem) =>
                  renderMenuItem(menuItem)
                )}
            </div>
          </div>
        </ScrollArea>
        <div className="p-3 pb-0 border-t flex justify-between">
          <Link href="/setting">
            <Button
              variant={pathname === "/setting" ? "secondary" : "ghost"}
              className="w-full justify-start gap-1 mb-1"
            >
              <CogIcon size={16} />
              Settings
            </Button>
          </Link>
          <Link href="/setting">
            <Button
              variant={pathname === "/setting" ? "secondary" : "ghost"}
              className="w-full justify-start gap-1 mb-1"
            >
              <MessageCircleQuestionIcon size={16} />
              Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
