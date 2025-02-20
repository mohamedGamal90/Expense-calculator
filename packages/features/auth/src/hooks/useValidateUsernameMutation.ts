import { ErrorType, apiClient } from "@metroid/api";
import { useMutation } from "@tanstack/react-query";

type validateUserMutationParams = {
  username: string;
};

type validateUserResponse = {
  email: string;
  phoneNumber: string;
  status: string;
};

const validateUsernameApi = async ({ username }: validateUserMutationParams) => {
  const { data } = await apiClient.post(
    `authentication-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/forget-password/validate-username`,
    {
      username,
    },
  );
  return data;
};

export const useValidateUsernameMutation = ({
  onError,
  onSuccess,
  onSettled,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: validateUserResponse, variables: validateUserMutationParams) => void;
  onSettled?: (data: validateUserResponse, variables: validateUserMutationParams) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: validateUserMutationParams) => validateUsernameApi(params),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data, variables) {
      onSuccess?.(data, variables);
    },
    onSettled(data, _error, variables) {
      onSettled?.(data, variables);
    },
  });
