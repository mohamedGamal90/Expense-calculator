import { useMutation } from "@tanstack/react-query";
import { apiClient, ErrorType } from "@metroid/api";

export type registerCustomerType = {
  username: string;
  password: string;
  customerId: string;
  stepId: string;
};

export type registerCustomerResponseType = {
  timestamp: string;
};

const registerCustomer = async (data: registerCustomerType) => {
  const basicAuth = "Basic " + btoa(data.username + ":" + data.password);
  const body = { customerId: data.customerId, stepId: data.stepId };

  return await apiClient.post(
    `/registration-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/card-number-registration/step-three`,
    body,
    {
      headers: {
        Authorization: basicAuth,
      },
      maxBodyLength: Infinity,
    },
  );
};

export const useRegisterCustomerMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: registerCustomerResponseType) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: registerCustomerType) => registerCustomer(params),
    onError(error: ErrorType) {
      onError?.(error);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
