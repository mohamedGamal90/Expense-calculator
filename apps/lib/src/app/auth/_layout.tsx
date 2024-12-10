import { AuthLayout } from "@aurora/auth";
import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  return (
    <Stack
      screenLayout={({ children }) => <AuthLayout>{children}</AuthLayout>}
      screenOptions={{ headerShown: false }}
    />
  );
}
