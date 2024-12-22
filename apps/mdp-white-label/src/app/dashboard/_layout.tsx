import { Sidebar, type SidebarButton } from "@aurora/blocks";
import { ScrollView, View } from "@aurora/components";
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
    href: "/dashboard/transaction",
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
    <ScrollView>
      <View flexDirection="row">
        <Sidebar buttons={buttons} />
        <Slot />
      </View>
    </ScrollView>
  );
}

export default DashboardLayout;
