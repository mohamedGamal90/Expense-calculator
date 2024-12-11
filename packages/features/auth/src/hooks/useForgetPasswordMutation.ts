import { ErrorType, apiClient } from "@metroid/api";
import { useMutation } from "@tanstack/react-query";

type ForgetPasswordParams = {
  otp: string;
  username: string;
  password: string;
};

const forgotPasswordApi = async ({ username, otp, password }: ForgetPasswordParams) => {
  const basicAuth = "Basic " + btoa(username + ":" + password);
  const { data } = await apiClient.post(
    `/authentication-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/forget-password/change-user-password`,
    { otp: otp },
    {
      headers: {
        Authorization: basicAuth,
      },
    },
  );
  return data;
};

export const useForgetPasswordMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: unknown, variables: ForgetPasswordParams) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: ForgetPasswordParams) => forgotPasswordApi(params),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data, variables) {
      onSuccess?.(data, variables);
    },
  });
