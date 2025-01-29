import { useMutation } from "@tanstack/react-query";
import { authApiClient, ErrorType } from "@metroid/api";

type setCardLimitMutationParams = {
  cardId: string;
  newLimit: string;
  limitType: string;
};
const setLimit = async (cardId: string, newLimit: string, limitType: string) =>
  await authApiClient.post(
    `/card-management-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards/change-limit`,
    {
      cardId,
      newLimit,
      limitType,
    },
  );

export const useSetCardLimitMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: () => void;
} = {}) =>
  useMutation({
    mutationFn: (params: setCardLimitMutationParams) =>
      setLimit(params.cardId, params.newLimit, params.limitType),
    onError: error => onError?.(error as ErrorType),
    onSuccess: () => onSuccess?.(),
  });
