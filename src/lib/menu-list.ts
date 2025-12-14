import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  Trash
} from "lucide-react";


type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "menu",
      menus: [
        {
          href: "/conversations",
          label: "conversations",
          icon: Bookmark
        },
        {
          href: "/settings",
          label: "Customers",
          icon: Bookmark
        },
        {
          href: "/appointments",
          label: "Appointments",
          icon: Bookmark
        },
        {
          href: "/email-marketing",
          label: "Email Marketing",
          icon: Bookmark
        }
      ]
    },
    {
      groupLabel: "Domians",
      menus: [
        {
          href: "/domain-1",
          label: "domain 1",
          icon: Users
        },
        {
          href: "/domain-2",
          label: "Domain 2",
          icon: Settings
        }
      ]
    }
  ];
}
