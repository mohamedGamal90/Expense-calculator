import { ScrollView, View } from "@aurora/components";
import { RootLayout } from "@aurora/home";
import { Slot } from "expo-router";
import React from "react";
RootLayout;
function DashboardLayout() {
  return (
    <RootLayout>
      <Slot />
    </RootLayout>
  );
}

export default DashboardLayout;
