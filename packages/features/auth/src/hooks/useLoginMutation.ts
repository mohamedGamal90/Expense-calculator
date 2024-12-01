import { apiClient, ErrorType } from "@metroid/api";
import { useMutation } from "@tanstack/react-query";

type LoginMutationParams = {
  username: string;
  password: string;
};

type LoginResponse = {
  upgraded: boolean;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  token_type: string;
  id_token: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
  active_sessions: number;
};

const loginUser = async ({ username, password }: LoginMutationParams) => {
  const basicAuth = "Basic " + btoa(username + ":" + password);
  return await apiClient.get<LoginResponse>(
    `/authentication-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/auth`,
    {
      headers: {
        Authorization: basicAuth,
        clientId: "1234",
        "g-recaptcha-response": "100",
      },
      maxBodyLength: Infinity,
    },
  );
};

export const useLoginMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: LoginResponse, variables: LoginMutationParams) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: LoginMutationParams) => loginUser(params),
    onError(error: ErrorType) {
      onError?.(error);
    },
    onSuccess(data, variables) {
      onSuccess?.(data.data, variables);
    },
  });
