import { Sidebar, SidebarButton } from "@aurora/blocks";
import { RootView } from "@aurora/components";
import { useTranslation } from "react-i18next";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  const buttons: SidebarButton[] = [
    {
      icon: "layout-dashboard",
      title: t("titles.home"), // "Home" or "الرئيسية"
      href: "/dashboard",
      disabled: false,
    },
    // {
    //   icon: "card-add",
    //   title: t("titles.add_card"), // "Add Card" or "إضافة بطاقة"
    //   href: "",
    //   disabled: true,
    // },
    // {
    //   icon: "group",
    //   title: t("titles.transfers"), // "Transfers" or "التحويلات"
    //   href: "",
    //   disabled: true,
    // },
    // {
    //   icon: "setting",
    //   title: t("titles.settings"), // "Settings" or "الإعدادات"
    //   href: "",
    //   disabled: true,
    // },
  ];

  return (
    <RootView flex={1} flexDirection="row">
      <Sidebar buttons={buttons} />
      {children}
    </RootView>
  );
};
