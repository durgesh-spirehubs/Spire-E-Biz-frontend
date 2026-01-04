import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
// ==============================|| MENU ITEMS ||============================== //

const useMenuItems = (menuItems: any) => {
  const { isLoggedIn, user }: any = useAuth();
  const filterMenuItems = (menuItems: any) => {
    if (menuItems?.children && menuItems.children.length > 0) {
      const filteredMenu = menuItems.children.filter((item: any) =>
        item?.role.includes(user?.userType || "Admin")
      );
      return filteredMenu;
    }
  };
  useEffect(() => {
    filterMenuItems(menuItems);
  }, [user]);
  return filterMenuItems(menuItems);
};

export default useMenuItems;
