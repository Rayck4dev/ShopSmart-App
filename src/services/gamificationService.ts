import { supabase } from "@/src/lib/supabaseClient";

export const GamificationAPI = {
  XP_PER_ITEM: 10,
  XP_PER_LIST: 100,
  XP_PER_LEVEL: 500,
  
  async addExperience(userId: string, amount: number) {
    const { data, error } = await supabase
      .from("profiles")
      .select("xp, level")
      .eq("id", userId)
      .single();

    if (error || !data) return null;

    const currentXP = data.xp || 0;
    const currentLevel = data.level || 1;

    const newXP = currentXP + amount;
    const newLevel = Math.floor(newXP / this.XP_PER_LEVEL) + 1;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        xp: newXP,
        level: newLevel,
      })
      .eq("id", userId);

    if (updateError) throw updateError;

    return {
      totalXP: newXP,
      level: newLevel,
      leveledUp: newLevel > currentLevel,
    };
  },
};