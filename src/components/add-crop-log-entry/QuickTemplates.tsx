import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Droplets, Leaf, Search, Bug } from "lucide-react-native"
import { useEventTypes } from "@/hooks/useCareEvents"
import { useMemo, useState } from "react"
import { EVENT_ICONS } from "@/constants/care-event-icons"

interface QuickTemplatesProps {
  onSelectTemplate: (eventTypeId: string, eventTypeName: string) => void
}

const TEMPLATE_TO_EVENT_TYPE: Record<string, string[]> = {
  watering: [
    "Watering",
    "Irrigation",
    "Drainage/De-watering",
  ],

  fertilizer: [
    "Fertilizing",
    "Fertilizer Application",
    "Nutrient Application",
    "Bio-fertilizer Application",
    "Soil Refill",
  ],

  inspection: [
    "Inspection",
    "Field Inspection",
    "Plant Inspection",
    "Pest Inspection",
  ],

  "pest-control": [
    "Pesticide Spraying",
    "Pest Control",
    "Disease Control",
    "Pest Management",
  ],

  pruning: ["Pruning"],

  weeding: ["Weeding"],

  harvesting: ["Harvesting"],

  seeding: ["Additional Seeding"],

  weather: [
    "Sunshade Setup",
    "Frost Protection",
  ],
}


export const QuickTemplates: React.FC<QuickTemplatesProps> = ({ onSelectTemplate }) => {
  const { data: eventTypes } = useEventTypes()
  const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null)

  const getEventTypeForTemplate = (templateKey: string) => {
    const possibleNames = TEMPLATE_TO_EVENT_TYPE[templateKey] || []
    return eventTypes?.find((et) => possibleNames.includes(et.eventTypeName))
  }

  const setActiveTemplate = (template: string) => {
    const templateKey = Object.keys(TEMPLATE_TO_EVENT_TYPE).find((key) =>
      TEMPLATE_TO_EVENT_TYPE[key].includes(selectedActivityType || "")
    )

    if (templateKey == template) {
      return {
        color: "#4CAF50",
        bgColor: "#F5F7F5",
        borderColor: "#4CAF50",
        borderWidth: 2,
      }
    }
    return {
      color: "#8A8A8A",
      bgColor: "#F5F5F5",
      borderColor: "#E8E8E8",
      borderWidth: 1,
    }
  }

  const templates = useMemo(() => [
    {
      id: "watering",
      label: "Watering",
      icon: EVENT_ICONS['Watering'] || Droplets,
      ...setActiveTemplate("watering"),
    },
    {
      id: "fertilizer",
      label: "Fertilizing",
      icon: EVENT_ICONS['Fertilizing'] || Leaf,
      ...setActiveTemplate("fertilizer"),
    },
    {
      id: "inspection",
      label: "Inspection",
      icon: EVENT_ICONS['Inspection'] || Search,
      ...setActiveTemplate("inspection"),
    },
    {
      id: "pest-control",
      label: "Pest Control",
      icon: EVENT_ICONS['Pest Control'] || Bug,
      ...setActiveTemplate("pest-control"),
    },
  ], [selectedActivityType])

  const handleTemplatePress = (templateId: string) => {
    const eventType = getEventTypeForTemplate(templateId)
    if (eventType) {
      onSelectTemplate(eventType.id, eventType.eventTypeName)
    }
  }

  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm mb-4">
      <Text className="text-base font-semibold text-[#2D2D2D] mb-3">Quick Templates</Text>
      <View className="flex-row flex-wrap justify-between">
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            onPress={() => {
              handleTemplatePress(template.id)
              setSelectedActivityType(template.label)
            }}
            className="w-[48%] items-center justify-center p-3 rounded-xl mb-3"
            style={{
              backgroundColor: template.bgColor,
              borderColor: template.borderColor,
              borderWidth: template.borderWidth,
            }}
          >
            <View className="w-8 h-8 items-center justify-center mb-2">
              <template.icon size={20} color={template.color} />
            </View>
            <Text className="text-xs font-semibold text-center" style={{ color: template.color }}>
              {template.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
