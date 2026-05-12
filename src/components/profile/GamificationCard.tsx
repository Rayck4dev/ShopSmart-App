import { View, Text } from "react-native";

interface GamificationCardProps {
  xp: number;
  level: number;
}

export function GamificationCard({ xp, level }: GamificationCardProps) {
  const progress = ((xp % 500) / 500) * 100;
  const xpNextLevel = 500 - (xp % 500);

  return (
    <View className="bg-orange-500 rounded-2xl p-5 mb-6 shadow-lg shadow-orange-300">
      <View className="flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">
            Seu Nível
          </Text>
          <Text className="text-white text-3xl font-black">
            Lvl {level || 1}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">
            Total XP
          </Text>
          <Text className="text-white text-xl font-bold">{xp || 0} pts</Text>
        </View>
      </View>

      <View className="h-2.5 bg-orange-700/30 rounded-full overflow-hidden">
        <View
          style={{ width: `${progress}%` }}
          className="h-full bg-white rounded-full"
        />
      </View>

      <Text className="text-white/70 text-[10px] mt-2 text-center italic">
        Faltam {xpNextLevel} XP para o próximo nível
      </Text>
    </View>
  );
}
