import { getTokens, showAlert, StyledText } from "@aurora/components";
import { useEffect, useRef, useState } from "react";
import { Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useResendOtpMutation } from "../hooks/useResendOtpMutation";

export const ResendOtpBtn = () => {
  const [time, setTime] = useState(30);
  const { t } = useTranslation();
  const { space } = getTokens();
  const resendTime = useRef(1);

  const { mutateAsync: ResendOTP } = useResendOtpMutation({
    onError: () =>
      showAlert({
        title: t("server-error.an_error_has_occurred"),
        message: t("otp.max-resend-otp-reached-msg"),
      }),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) setTime(prev => prev - 1);
      else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const onResendOtp = async () => {
    if (resendTime.current < 3) {
      ResendOTP;
      resendTime.current++;
      setTime(30 * resendTime.current);
    } else
      showAlert({
        title: t("otp.max-resend-otp-reached-title"),
        message: t("otp.max-resend-otp-reached-msg"),
      });
  };

  return (
    <Pressable style={{ marginTop: space.l.val }} disabled={!!time} onPress={onResendOtp}>
      <StyledText variant="BodyBoldml" col={time ? "$neutral800" : "$primary800"}>
        {time ? t("otp.resend-otp-waiting-time", { time }) : t("otp.resend-otp")}
      </StyledText>
    </Pressable>
  );
};
