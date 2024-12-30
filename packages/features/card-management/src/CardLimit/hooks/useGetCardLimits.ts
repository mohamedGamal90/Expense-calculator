import { useQuery } from "@tanstack/react-query";
import { authApiClient, ErrorType } from "@metroid/api";
import { Currency } from "@aurora/utils";

const getCardLimits = async (cardId: string) => {
  const { data } = await authApiClient.post(
    `/cards-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards/card-limit`,
    { cardId, exception: false },
  );
  return data;
};

const useGetCardLimitsQuery = (cardId: string) =>
  useQuery<CARDLIMITS, ErrorType>({
    queryKey: ["cardLimits"],
    queryFn: async () => await getCardLimits(cardId),
  });

type CARDLIMITS = {
  limits: CARDLIMIT[];
};
type CARDLIMIT = {
  limitType: string;
  limitValue: number;
  dateFrom: null;
  dateTo: null;
  id: number;
  limitUsage: number;
  description: string;
  currency: Currency;
  cycleType: number;
  cycleTypeDescription: string;
  limitEntity: number;
  limitEntityDescription: string;
  exception: false;
};
export { useGetCardLimitsQuery, CARDLIMITS, CARDLIMIT };
