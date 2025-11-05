import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ShieldCheck, ExternalLink } from "lucide-react-native";
import TimelineList from "./TimelineList";

const VerifiedProcessCard = () => {
  return (
    <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mt-3">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-gray-900 text-lg font-semibold">
          Verified Growing Process
        </Text>
        <View className="flex-row items-center">
          <ShieldCheck size={16} color="#F97316" />
          <Text className="text-orange-500 ml-1 font-medium text-sm">
            Blockchain Verified
          </Text>
        </View>
      </View>

      {/* Timeline */}
      <TimelineList />

      {/* Footer link */}
      <TouchableOpacity className="flex-row items-center mt-2">
        <Text className="text-orange-500 font-semibold">
          View Full Care Log
        </Text>
        <ExternalLink size={16} color="#F97316" className="ml-1" />
      </TouchableOpacity>
    </View>
  );
};

export default VerifiedProcessCard;
