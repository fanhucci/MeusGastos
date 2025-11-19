import { cores } from "@/app/theme/referencias/colors";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface GastosHeaderProps {
  getter: string;
  setter: (text: string) => void;
}

export default function GastosHeader({ getter, setter }: GastosHeaderProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={22} color={cores.textSecondary} style={styles.icon} />
      
      <TextInput
        placeholder="Pesquisar gastos..."
        placeholderTextColor={cores.textSecondary}
        value={getter}
        onChangeText={setter}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing" 
        returnKeyType="search"
      />


      {getter.length > 0 && (
        <Ionicons
          name="close-circle"
          size={24}
          color={cores.textSecondary}
          onPress={() => setter("")}
          style={styles.clearIcon}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 56,
    marginVertical: 24,
    marginHorizontal: "5%",
    backgroundColor: cores.primary,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: cores.text,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    paddingVertical: 12,
  },
  clearIcon: {
    marginLeft: 8,
    opacity: 0.7,
  },
});