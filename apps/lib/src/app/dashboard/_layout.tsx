import { Sidebar, type SidebarButton } from "@aurora/blocks";
import { ScrollView, View } from "@aurora/components";
import { Slot } from "expo-router";
import React from "react";

const buttons: SidebarButton[] = [
  {
    icon: "layout-dashboard",
    title: "Home",
    href: "/dashboard",
    disabled: false,
  },
  {
    icon: "card-add",
    title: "Add Card",
    href: "",
    disabled: true,
  },
  {
    icon: "arrow-swap-horizontal",
    title: "Transactions",
    href: "/dashboard/transaction",
    disabled: false,
  },
  {
    icon: "group",
    title: "Transfers",
    href: "",
    disabled: true,
  },
  {
    icon: "setting",
    title: "Settings",
    href: "",
    disabled: true,
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
