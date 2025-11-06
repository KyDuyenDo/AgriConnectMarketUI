import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ShieldCheck, ExternalLink } from "lucide-react-native";
import TimelineList from "./TimelineList";

const VerifiedProcessCard = () => {
  return (
    <View className="bg-white rounded-3xl p-4 shadow shadow-gray-200 mt-3">
      {/* Timeline */}
      <TimelineList />

      {/* Footer link */}
      <TouchableOpacity className="flex-row items-center gap-2 mt-2">
        <Text className="text-[#4CAF50] font-semibold">
          View Full Care Log
        </Text>
        <ExternalLink size={16} color="#4CAF50" className="ml-1" />
      </TouchableOpacity>
    </View>
  );
};

export default VerifiedProcessCard;
