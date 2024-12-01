import { Sidebar, type SidebarButton } from "@aurora/blocks";
import { View } from "@aurora/components";
import { Slot } from "expo-router";
import React from "react";

const buttons: SidebarButton[] = [
  {
    icon: "layout-dashboard",
    title: "Home",
    href: "/dashboard",
  },
  {
    icon: "card-add",
    title: "Add Card",
    href: "",
  },
  {
    icon: "arrow-swap-horizontal",
    title: "Transactions",
    href: "",
  },
  {
    icon: "group",
    title: "Transfers",
    href: "",
  },
  {
    icon: "setting",
    title: "Settings",
    href: "",
  },
];

function DashboardLayout() {
  return (
    <View flexDirection="row">
      <Sidebar buttons={buttons} />
      <Slot />
    </View>
  );
}

export default DashboardLayout;
