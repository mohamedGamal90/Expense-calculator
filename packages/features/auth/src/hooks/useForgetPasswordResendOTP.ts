import { apiClient, ErrorType } from "@metroid/api";
import { useMutation } from "@tanstack/react-query";

type ResendForgetPasswordOTPParams = {
  username: string;
};
async function resendForgetPasswordOTP(params: ResendForgetPasswordOTPParams) {
  const response = await apiClient.get(
    `/authentication-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/${params.username}/forget-password/resend-otp`,
  );

  return response.data;
}

export const useResendForgetPasswordOTPMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: unknown, variables: ResendForgetPasswordOTPParams) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: ResendForgetPasswordOTPParams) => resendForgetPasswordOTP(params),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data, variables) {
      onSuccess?.(data, variables);
    },
  });
