import { CardType } from "@metroid/types";
import { create } from "zustand";

interface SelectedCardStore {
  selectedCard: CardType | null;
  actions: {
    setSelectedCard: (card: CardType) => void;
  };
}

const useSelectedCardStore = create<SelectedCardStore>(set => ({
  selectedCard: null,
  actions: {
    setSelectedCard: (card: CardType) =>
      set({
        selectedCard: card,
      }),
  },
}));

export const useSelectedCard = () =>
  useSelectedCardStore(state => {
    return state.selectedCard;
  });

export const useSelectedCardActions = () => useSelectedCardStore(state => state.actions);
