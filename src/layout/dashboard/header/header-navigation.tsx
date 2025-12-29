import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useMenuItems from "@/hooks/useMenuItems";
import { menuItem } from "../sidebar/menu-item";
import Link from "next/link";

const HeaderNavigation = () => {
  const filterPages = useMenuItems(menuItem);
  return (
    <Card className="h-full w-full flex items-center gap-3 p-2">
      <NavigationMenu>
        <NavigationMenuList>
          {filterPages &&
            filterPages.map((menuItem: any, index: number) => menuItem.type !=='label' &&(
              <>
                {menuItem?.children && menuItem?.children.length > 0 ? (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      {menuItem?.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="p-3 flex flex-col max-w-max">
                      {menuItem.children.map((subMenu: any, index: number) => subMenu.type !=='label' && (
                        <Link
                          href={subMenu?.url || ""}
                          legacyBehavior
                          passHref
                          key={index}
                        >
                          <NavigationMenuLink className="whitespace-nowrap max-w-max p-1">
                            {subMenu?.title}
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem>
                    <Link href={menuItem?.url || ""} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {menuItem?.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )}
              </>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </Card>
  );
};

export default HeaderNavigation;
