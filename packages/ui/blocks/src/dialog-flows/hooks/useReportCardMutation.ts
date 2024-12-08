import { useMutation } from "@tanstack/react-query";

import { authApiClient, ErrorType } from "@metroid/api";

type ReportCardMutationParams = {
  cardId: string;
  otp: string;
};
const reportCard = async (cardId: string, otp: string) => {
  return await authApiClient.post(
    `/card-management-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards/${cardId}/stolen-lost`,
    {},
    { headers: { otp } },
  );
};

export const useReportCardMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: () => void;
} = {}) =>
  useMutation({
    mutationFn: (params: ReportCardMutationParams) => reportCard(params.cardId, params.otp),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess() {
      onSuccess?.();
    },
  });
