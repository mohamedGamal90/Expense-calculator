import { useMutation } from "@tanstack/react-query";

import { authApiClient, ErrorType } from "@metroid/api";

const setPinForCard = async ({ cardId, otp }: { cardId: string; otp: string }) => {
  const data = await authApiClient.put(
    `/card-management-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards/${cardId}/pin`,
    {},
    {
      headers: { otp },
    },
  );

  return data;
};

type SetPinResponse = {
  url: string;
};

export const useSetPinMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: SetPinResponse) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: { cardId: string; otp: string }) =>
      setPinForCard({ cardId: params.cardId, otp: params.otp }),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
