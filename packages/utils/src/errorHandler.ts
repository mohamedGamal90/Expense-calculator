import { showAlert } from "@aurora/components";
import { ErrorType } from "@metroid/api";
import { t } from "i18next";

export const errorHandler = (error: ErrorType) => {
  showAlert({
    title: t("server-error.an_error_has_occurred"),
    message: t(
      `server-error.${error?.response?.data?.message ? error.response.data.message.toLocaleLowerCase() : "an_error_has_occurred"}`,
    ),
  });
};
