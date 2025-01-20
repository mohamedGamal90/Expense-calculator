import { useMutation } from "@tanstack/react-query";

import { authApiClient, ErrorType } from "@metroid/api";

type sendOtpResponse = {
  status: string;
};
const resendOtp = async () =>
  await authApiClient.get<sendOtpResponse>(
    `/general-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/otp/resend-otp`,
  );

export const useResendOtpMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: sendOtpResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: () => resendOtp(),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
