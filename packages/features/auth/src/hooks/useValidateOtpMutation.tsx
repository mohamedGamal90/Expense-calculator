import { useMutation } from "@tanstack/react-query";
import { apiClient, ErrorType } from "@metroid/api";

export type ValidateOtpType = {
  stepId: string;
  customerId: string;
  otp: string;
};

export type ValidateOtpResponseType = {
  stepId: string;
};

const validateOtp = async (data: ValidateOtpType) => {
  return await apiClient.post(
    `/registration-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/card-number-registration/step-two`,
    data,
  );
};

export const useValidateOtpMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: ValidateOtpResponseType) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: ValidateOtpType) => validateOtp(params),
    onError(error: ErrorType) {
      onError?.(error);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
