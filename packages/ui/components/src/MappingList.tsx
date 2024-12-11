import { Children, ReactNode } from "react";

type Props<T> = {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export const MappingList = <T extends unknown>({ renderItem, data }: Props<T>) =>
  Children.toArray(data.map((item, index) => renderItem(item, index)));
