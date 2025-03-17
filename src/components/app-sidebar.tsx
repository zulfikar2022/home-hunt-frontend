"use client";

import * as React from "react";
import { Handshake, House, KeyIcon, PlusIcon, UsersIcon } from "lucide-react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { CustomJwtPayload, tokenDecoder } from "../../utils/auth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [payload, setPayload] = React.useState<CustomJwtPayload | undefined>(
    undefined
  );
  React.useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setPayload(tokenDecoder(token));
    }
  }, []);

  const landlordData = {
    navMain: [
      {
        title: "My Rentals",
        url: "?value=my-rentals",
        icon: House,
        isActive: true,
      },
      {
        title: "Add Rental",
        url: "?value=add-rental",
        icon: PlusIcon,
      },
      {
        title: "Rental Requests",
        url: "?value=rental-requests",
        icon: Handshake,
      },
      {
        title: "Change Password",
        url: "?value=change-password",
        icon: KeyIcon,
      },
    ],
    user: {
      name: payload?.name || "loading...",
      email: payload?.email || "loading...",
      avatar: payload?.profileImage || "/avatars/shadcn.jpg",
    },
  };
  const tenantData = {
    navMain: [
      {
        title: "Rental Requests",
        url: "?value=rental-requests",
        icon: House,
        isActive: true,
      },
      {
        title: "Change Password",
        url: "?value=change-password",
        icon: KeyIcon,
      },
    ],
    user: {
      name: payload?.name || "loading...",
      email: payload?.email || "loading...",
      avatar: payload?.profileImage || "/avatars/shadcn.jpg",
    },
  };

  const adminData = {
    navMain: [
      {
        title: "All Users",
        url: "?value=all-users",
        icon: UsersIcon,
        isActive: true,
      },
      {
        title: "All Rentals",
        url: "?value=all-rentals",
        icon: House,
      },
      {
        title: "Change Password",
        url: "?value=change-password",
        icon: KeyIcon,
      },
    ],
    user: {
      name: payload?.name || "loading...",
      email: payload?.email || "loading...",
      avatar: payload?.profileImage || "/avatars/shadcn.jpg",
    },
  };

  let applicableData: {
    navMain: {
      title: string;
      url: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon?: any;
      isActive?: boolean;
      items?: { title: string; url: string }[];
    }[];
    user: { name: string; email: string; avatar: string };
  } = { navMain: [], user: { name: "", email: "", avatar: "" } };

  if (payload?.role === "landlord") {
    applicableData = landlordData;
  }
  if (payload?.role === "tenant") {
    applicableData = tenantData;
  }
  if (payload?.role === "admin") {
    applicableData = adminData;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={applicableData?.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={applicableData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
