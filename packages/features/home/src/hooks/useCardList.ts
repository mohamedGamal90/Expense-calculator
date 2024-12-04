import { useQuery } from "@tanstack/react-query";
import { authApiClient, ErrorType } from "@metroid/api";

import { CardType } from "../types/cardType";

const getCardsList = async () => {
  const { data } = await authApiClient.get(
    `/cards-service/api/v1/${process.env.EXPO_PUBLIC_REALM_ID}/cards`,
    { timeout: 45000 },
  );
  return data;
};

export const useGetCardsQuery = () =>
  useQuery<CardType[], ErrorType>({
    queryKey: ["cardList"],
    queryFn: async () => {
      return await getCardsList();
    },
  });
