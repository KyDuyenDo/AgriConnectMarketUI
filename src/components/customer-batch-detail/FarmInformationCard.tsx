import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CheckCircle } from "lucide-react-native";

interface FarmInformationCardProps {
  id: string;
  verified?: boolean;
  name: string;
  variety: string;
  farmName: string;
  farmLogo?: any; 
  harvestDate: string;
  totalYield: string;
}

const FarmInformationCard: React.FC<FarmInformationCardProps> = ({
  id,
  verified = false,
  name,
  variety,
  farmName,
  farmLogo,
  harvestDate,
  totalYield,
}) => {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.idText}>#{id}</Text>
        {verified && (
          <View style={styles.verifiedRow}>
            <CheckCircle size={14} color="#22C55E" style={{ marginRight: 4 }} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.variety}>{variety}</Text>

      {/* Farm Info */}
      <View style={styles.farmRow}>
        {farmLogo && (
          <Image
            source={farmLogo}
            style={{ width: 20, height: 20, borderRadius: 10 }}
          />
        )}
        <Text style={styles.farmName}>{farmName}</Text>
        <CheckCircle size={14} color="#22C55E" style={{ marginLeft: 4 }} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Footer */}
      <View style={styles.footerRow}>
        <View>
          <Text style={styles.footerLabel}>Harvest Date</Text>
          <Text style={styles.footerValue}>{harvestDate}</Text>
        </View>

        <View>
          <Text style={styles.footerLabel}>Total Yield</Text>
          <Text style={styles.footerValue}>{totalYield}</Text>
        </View>
      </View>
    </View>
  );
};

export default FarmInformationCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  idText: {
    color: "#6B7280",
    fontWeight: "500",
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedText: {
    color: "#22C55E",
    fontWeight: "500",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  variety: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 8,
  },
  farmRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  farmName: {
    fontWeight: "600",
    color: "#111827",
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 2,
  },
  footerValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
});
