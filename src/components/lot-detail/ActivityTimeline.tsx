import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Scissors, Bug, Droplets, Leaf, Edit, Trash2 } from 'lucide-react-native';

export const ActivityTimeline = () => {
    return (
        <View className="px-4 mb-4">
            <Text className="text-[#2D2D2D] text-base font-semibold mb-3">Activity Timeline</Text>

            <TimelineItem
                icon={Scissors}
                iconColor="#6BCF5F"
                iconBg="#E8F9E6"
                title="Harvest"
                date="August 15, 2024 - 9:00 AM"
                description="First harvest completed. Excellent quality tomatoes with good size and color. Weather conditions optimal."
                image="https://static.paraflowcontent.com/public/resource/image/c25a3a5b-c92e-46db-b8f2-e1067890f2b8.jpeg"
            />

            <TimelineItem
                icon={Bug}
                iconColor="#F39C12"
                iconBg="#FEF5E7"
                title="Pest Control"
                date="August 10, 2024 - 6:00 AM"
                description="Applied organic pest control treatment for aphid prevention. Used neem oil solution as per organic certification requirements."
            />

            <TimelineItem
                icon={Droplets}
                iconColor="#3498DB"
                iconBg="#EBF5FB"
                title="Watering"
                date="August 8, 2024 - 7:00 AM"
                description="Deep watering session completed. Soil moisture levels optimal. Drip irrigation system working efficiently."
            />

            <TimelineItem
                icon={Leaf}
                iconColor="#7EC850"
                iconBg="#E8F8E5"
                title="Fertilizing"
                date="August 5, 2024 - 8:30 AM"
                description="Applied organic compost fertilizer around plant base. Nutrient boost for final growth phase before harvest."
                image="https://static.paraflowcontent.com/public/resource/image/d33de1af-348c-42a9-8a88-d56624e05df4.jpeg"
            />
        </View>
    );
};

const TimelineItem = ({
    icon: Icon,
    iconColor,
    iconBg,
    title,
    date,
    description,
    image
}: {
    icon: any,
    iconColor: string,
    iconBg: string,
    title: string,
    date: string,
    description: string,
    image?: string
}) => {
    return (
        <View className="bg-white p-4 rounded-2xl shadow-sm mb-3">
            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 mr-2">
                    <View className="flex-row items-center mb-2">
                        <View className="w-8 h-8 justify-center items-center rounded-lg mr-3" style={{ backgroundColor: iconBg }}>
                            <Icon size={18} color={iconColor} />
                        </View>
                        <View>
                            <Text className="text-[#2D2D2D] text-sm font-semibold">{title}</Text>
                            <Text className="text-[#5C5C5C] text-xs">{date}</Text>
                        </View>
                    </View>

                    <Text className="text-[#5C5C5C] text-xs mb-2 leading-5">{description}</Text>

                    {image && (
                        <Image
                            source={{ uri: image }}
                            className="w-full h-24 rounded-lg mb-2"
                            resizeMode="cover"
                        />
                    )}
                </View>

                <View className="flex-row gap-2">
                    {/* Buttons are actually in a row in HTML, but visually might be tight. 
              The HTML has them in a div with row-gap and col-gap.
              I'll put them in a column if space is tight, or row.
              Let's try row first but wrap.
          */}
                </View>
            </View>

            {/* Moving buttons to bottom for better mobile layout? 
          The HTML has them on the right (flex row). 
          But looking at the HTML structure again:
          Line 162: flex justify-between.
          If I put them on the right, they might squish the text.
          However, the HTML has them there.
          Let's look at the HTML screenshot logic again.
          If the text wraps, the buttons stay on the right.
          I will implement them as a row below the content if it's too cramped, 
          BUT the HTML has them on the right.
          Actually, looking at line 178: It's a sibling of the content div.
          I'll put them at the bottom of the card for better UX on mobile, 
          OR I can try to match the HTML exactly.
          HTML: Content (Left) | Buttons (Right).
          The buttons are "Edit" and "Delete" with text. They are wide.
          If I put them on the right, the content width is reduced significantly.
          Maybe the HTML design is for a wider screen? 
          "width: 390px" in body tag suggests mobile.
          Okay, if it's 390px, and buttons are ~60-70px each?
          Let's look at the buttons: Icon + Text.
          Maybe I should stack them vertically on the right?
          The HTML has `display: flex; row-gap: 0.5rem; column-gap: 0.5rem;`.
          If they wrap, they stack.
          I'll put them in a View that wraps.
      */}
            <View className="flex-row gap-2 justify-end mt-2">
                <TouchableOpacity className="bg-[#FFF5EB] flex-row items-center px-3 py-2 rounded-lg">
                    <Edit size={14} color="#FF8C42" className="mr-1" />
                    <Text className="text-[#FF8C42] text-xs font-medium ml-1">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-[#FDECEA] flex-row items-center px-3 py-2 rounded-lg">
                    <Trash2 size={14} color="#E74C3C" className="mr-1" />
                    <Text className="text-[#E74C3C] text-xs font-medium ml-1">Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
