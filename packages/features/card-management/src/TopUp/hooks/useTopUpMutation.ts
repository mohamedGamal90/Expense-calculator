import { authApiClient, ErrorType } from "@metroid/api";
import { useMutation } from "@tanstack/react-query";

type TopUpAccountParams = {
  paymentAmount: string;
  beneficiaryCardId: string;
  payerCardId: string;
  currencyCode: string;
};

async function topUpAccount({
  paymentAmount,
  beneficiaryCardId,
  payerCardId,
  currencyCode,
}: TopUpAccountParams) {
  const { data } = await authApiClient.post(
    `/fund-transfer-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/fund-transfer/internal-transfer`,
    {
      paymentAmount,
      beneficiaryCardId,
      payerCardId,
      currencyCode,
    },
  );
  return data;
}

export const useTopUpMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: unknown) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: TopUpAccountParams) => topUpAccount(params),
    onError: error => onError?.(error as ErrorType),
    onSuccess: data => onSuccess?.(data.data),
  });
