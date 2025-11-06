import React, { useState } from "react";
import { View } from "react-native";
import { FarmCartGroupCard } from "./FarmCartGroupCard";

type Item = {
  id: string;
  image: string;
  name: string;
  farm: string;
  status: string;
  harvested: string;
  unit: string;
  price: string;
  total: string;
  quantity: number;
  tagColor?: string;
};

type Props = { items: Item[] };

export default function CartItemsSection({ items }: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // ✅ Group items by farm
  const groupedByFarm = items.reduce((groups: Record<string, Item[]>, item) => {
    if (!groups[item.farm]) groups[item.farm] = [];
    groups[item.farm].push(item);
    return groups;
  }, {});

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <View>
      {Object.entries(groupedByFarm).map(([farmName, farmItems]) => (
        <FarmCartGroupCard
          key={farmName}
          farmName={farmName}
          items={farmItems}
          selectedItems={selectedItems}
          onSelectItem={toggleSelect}
        />
      ))}
    </View>
  );
}
