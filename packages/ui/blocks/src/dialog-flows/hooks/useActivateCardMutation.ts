import { authApiClient, ErrorType } from "@metroid/api";
import { useMutation } from "@tanstack/react-query";

const ActivateCardAPI = async (cardID: string, otp: string) =>
  await authApiClient.get(
    `/card-management-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards/${cardID}/activate`,
    {
      headers: { otp },
    },
  );

export const useActivateCardMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: unknown) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: { cardId: string; otp: string }) =>
      ActivateCardAPI(params.cardId, params.otp),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data) {
      onSuccess?.(data);
    },
  });
