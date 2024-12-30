import { useMutation } from "@tanstack/react-query";
import { apiClient, ErrorType } from "@metroid/api";

export type registerCardNumberType = {
  cardNumber: string;
};

export type registerCardNumberResponseType = {
  phoneNumber: string;
  email: string;
  customerId: string;
  stepId: string;
};

const registerCardNumber = async (data: registerCardNumberType) => {
  return await apiClient.post(
    `registration-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/card-number-registration/step-one`,
    data,
  );
};

export const useRegisterCardNumberMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: registerCardNumberResponseType) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: registerCardNumberType) => registerCardNumber(params),
    onError(error: ErrorType) {
      onError?.(error);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
