import { authApiClient, ErrorType } from "@metroid/api";
import { useMutation } from "@tanstack/react-query";

type FetchCardAccountNameParams = {
  cardNumber: string;
};

type Response = {
  customerName: string;
};

export async function fetchCardAccountName({ cardNumber }: FetchCardAccountNameParams) {
  console.log("cardNumber", cardNumber);

  const response = await authApiClient.post(
    `/cards-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards/masked-customer-name`,
    {
      cardNumber,
    },
  );

  return response.data;
}
export const useCardholderNameMutation = ({
  onError,
  onSuccess,
}: {
  onError?: (error: ErrorType) => void;
  onSuccess?: (data: Response) => void;
} = {}) =>
  useMutation<Response, unknown, FetchCardAccountNameParams>({
    mutationFn: (params: FetchCardAccountNameParams) => fetchCardAccountName(params),
    onError(error) {
      onError?.(error as ErrorType);
    },
    onSuccess(data) {
      onSuccess?.(data);
    },
  });
