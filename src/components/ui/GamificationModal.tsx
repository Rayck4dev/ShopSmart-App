import React from 'react';
import { Modal, View, Text, TouchableOpacity, Animated } from 'react-native';
import { Trophy, Star } from 'lucide-react-native';

interface GamificationModalProps {
  visible: boolean;
  type: 'levelUp' | 'bonus';
  value: number | string;
  onClose: () => void;
}

export function GamificationModal({ visible, type, value, onClose }: GamificationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/60 px-6">
        <View className="bg-white w-full rounded-[40px] p-8 items-center shadow-2xl">
          
          <View className="bg-orange-500 w-24 h-24 rounded-full items-center justify-center -mt-20 border-8 border-[#F8F9FA]">
            {type === 'levelUp' ? (
              <Trophy color="white" size={45} />
            ) : (
              <Star color="white" size={45} fill="white" />
            )}
          </View>

          <Text className="text-orange-600 font-black text-3xl mt-4 uppercase text-center">
            {type === 'levelUp' ? 'Novo Nível!' : 'Bônus Extra!'}
          </Text>

          <Text className="text-gray-500 text-center text-lg mt-2">
            {type === 'levelUp' 
              ? `Parabéns! Você alcançou o nível` 
              : `Você finalizou a lista e ganhou`}
          </Text>

          <Text className="text-gray-900 font-black text-5xl my-4">
            {type === 'levelUp' ? value : `+${value} XP`}
          </Text>

          <TouchableOpacity 
            onPress={onClose}
            className="bg-orange-500 w-full py-4 rounded-2xl mt-4 shadow-md shadow-orange-300"
          >
            <Text className="text-white text-center font-bold text-xl">Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}