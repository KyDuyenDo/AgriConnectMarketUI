import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  onPress: () => void;
};

const ProceedButton: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-green-500 rounded-lg py-3 px-6 items-center"
    >
      <Text className="text-white text-base font-semibold">
        Proceed to Checkout
      </Text>
    </TouchableOpacity>
  );
};

export default ProceedButton;
