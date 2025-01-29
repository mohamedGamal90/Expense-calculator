import { StyledButton, StyledText } from "@aurora/components";
import { Icon } from "@aurora/icons";
import { deleteValue, StoreKey } from "@aurora/utils";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export function LogoutButton() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleOnLogout = () => {
    deleteValue(StoreKey.AccessToken);
    router.replace("/");
  };
  return (
    <StyledButton
      icon={<Icon name="logout" />}
      onPress={handleOnLogout}
      variant="outlined"
      borderColor="$error600"
      mt="$auto">
      <StyledText variant="BodySemiBoldm" color="$error600">
        {t("buttons.logout")}
      </StyledText>
    </StyledButton>
  );
}
