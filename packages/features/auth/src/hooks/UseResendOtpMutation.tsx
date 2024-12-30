import { useMutation } from "@tanstack/react-query";
import { apiClient, ErrorType } from "@metroid/api";

export type ResendOtp = {
  customerId: string;
};

type OnboardingResponseType = {
  phoneNumber: string;
  email: string;
  status: string;
};

const resendOtp = async (body: ResendOtp) => {
  return await apiClient.post(
    `/registration-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/card-number-registration/resend-otp`,
    body,
  );
};

export const UseResendOtpMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: OnboardingResponseType) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: ResendOtp) => resendOtp(params),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
