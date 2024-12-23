import { useMutation } from "@tanstack/react-query";

import { authApiClient, ErrorType } from "@metroid/api";
import { getNextWeek, getTommorowDate } from "@aurora/utils";

type setCardLimitMutationParams = {
  cardId: string;
  newLimit: string;
};
const setLimit = async (cardId: string, newLimit: string) => {
  return await authApiClient.post(
    `/card-management-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards/change-limit`,
    {
      cardId,
      newLimit,
      limitType: "LMTP0107",
      dateFrom: getTommorowDate(),
      dateTo: getNextWeek(),
    },
  );
};

export const useSetCardLimitMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: () => void;
} = {}) =>
  useMutation({
    mutationFn: (params: setCardLimitMutationParams) => setLimit(params.cardId, params.newLimit),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess() {
      onSuccess?.();
    },
  });
