import React, { useState } from "react";
import { View, Text } from "react-native";
import DeliveryOptionItem from "./DeliveryOptionItem";

export default function DeliveryOptionsCard() {
  const [selected, setSelected] = useState("address");

  return (
    <View className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      {/* Header */}
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        Delivery Options
      </Text>

      {/* Address */}
      <DeliveryOptionItem
        icon="map"
        title="123 Main Street"
        subtitle="Apartment 4B, San Francisco, CA"
        selected={selected === "address"}
        onPress={() => setSelected("address")}
      />

      {/* Standard Delivery */}
      <DeliveryOptionItem
        icon="clock"
        title="Tomorrow 2–4 PM"
        subtitle="Standard delivery"
        selected={selected === "standard"}
        onPress={() => setSelected("standard")}
      />

      {/* Express Delivery */}
      <DeliveryOptionItem
        icon="zap"
        title="Express Delivery"
        subtitle="Today 6–8 PM (+$4.99)"
        selected={selected === "express"}
        onPress={() => setSelected("express")}
      />
    </View>
  );
}
