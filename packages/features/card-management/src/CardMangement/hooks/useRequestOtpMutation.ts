import { useMutation } from "@tanstack/react-query";

import { authApiClient, ErrorType } from "@metroid/api";

export type sendOtpResponse = {
  phoneNumber: string;
  email: string;
  status: string;
};
const requestOtp = async () =>
  await authApiClient.get<sendOtpResponse>(
    `/general-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/otp/request-otp`,
  );

export const useRequestOtpMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: sendOtpResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: () => requestOtp(),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
