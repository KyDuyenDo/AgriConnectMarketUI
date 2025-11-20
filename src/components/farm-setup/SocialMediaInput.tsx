import { View, TextInput, TextInputProps } from 'react-native';
import { Facebook, Instagram } from 'lucide-react-native';

type SocialPlatform = 'facebook' | 'instagram' | 'twitter';

interface SocialMediaInputProps extends Omit<TextInputProps, 'style'> {
    platform: SocialPlatform;
    value: string;
    onChangeText: (text: string) => void;
}

export function SocialMediaInput({ platform, value, onChangeText, ...props }: SocialMediaInputProps) {
    const getIcon = () => {
        switch (platform) {
            case 'facebook':
                return <View className="w-6 h-6 rounded bg-[#1877F2] items-center justify-center">
                    <Facebook size={14} color="#FFFFFF" />
                </View>;
            case 'instagram':
                return <View className="w-6 h-6 rounded bg-gradient-to-br from-[#F77737] to-[#E1306C] items-center justify-center">
                    <Instagram size={14} color="#FFFFFF" />
                </View>;
            case 'twitter':
                return <View className="w-6 h-6 rounded bg-[#000000] items-center justify-center">
                    <View className="w-3 h-3 bg-white" style={{ transform: [{ rotate: '45deg' }] }} />
                </View>;
            default:
                return null;
        }
    };

    return (
        <View className="flex-row items-center gap-3 mb-3">
            <View className="w-10 h-10 items-center justify-center">
                {getIcon()}
            </View>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                className="flex-1 text-base border border-solid rounded-[20px] py-3 px-4"
                style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E8EAEB',
                    color: '#1B1F24',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 4,
                    elevation: 1
                }}
                placeholderTextColor="#9DA3A8"
                {...props}
            />
        </View>
    );
}
