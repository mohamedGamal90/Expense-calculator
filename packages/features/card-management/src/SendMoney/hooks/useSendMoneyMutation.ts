import { authApiClient, ErrorType } from "@metroid/api";
import { useMutation } from "@tanstack/react-query";

type SendMoneyAccountParams = {
  paymentAmount: string;
  beneficiaryCardNumber: string;
  payerCardId: string;
  currencyCode: string;
  otp: string;
};

async function SendMoneyAccount({
  paymentAmount,
  beneficiaryCardNumber,
  payerCardId,
  currencyCode,
  otp,
}: SendMoneyAccountParams) {
  const response = await authApiClient.post(
    `/fund-transfer-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/fund-transfer/external-transfer?=`,
    {
      paymentAmount,
      beneficiaryCardNumber,
      payerCardId,
      currencyCode,
    },
    { headers: { otp } },
  );

  return response.data;
}

export const useSendMoneyMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: unknown) => void;
} = {}) =>
  useMutation({
    mutationFn: (params: SendMoneyAccountParams) => SendMoneyAccount(params),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data) {
      onSuccess?.(data.data);
    },
  });
