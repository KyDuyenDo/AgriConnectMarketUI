import React from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { ShieldCheck, ExternalLink } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import TimelineList from "./TimelineList";
import { useCareEventsByBatch } from "@/hooks/useCareEvents";

const VerifiedProcessCard = ({ batchId }: { batchId?: string }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { data: events, isLoading, error } = useCareEventsByBatch(batchId || '');

  const sortedEvents = events ? [...events].sort((a, b) =>
    new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime()
  ) : [];

  const displayedEvents = sortedEvents.slice(0, 5);
  const hasMore = sortedEvents.length > 5;

  return (
    <View className="bg-white rounded-3xl p-4 shadow shadow-gray-200 mt-3">
      {/* Timeline */}
      <TimelineList events={displayedEvents} isLoading={isLoading} error={error} />

      {/* Footer link */}
      {hasMore && (
        <TouchableOpacity
          className="flex-row items-center gap-2 mt-2"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-[#4CAF50] font-semibold">
            View Full Care Log
          </Text>
          <ExternalLink size={16} color="#4CAF50" className="ml-1" />
        </TouchableOpacity>
      )}

      {/* Full Log Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-white">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <Text className="text-lg font-bold text-gray-900">Full Care Log</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="p-2 bg-gray-100 rounded-full"
            >
              <Ionicons name="close" size={24} color="#1B1F24" />
            </TouchableOpacity>
          </View>
          <ScrollView className="flex-1 p-4">
            <TimelineList events={sortedEvents} error={error} />
            <View className="h-8" />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default VerifiedProcessCard;
