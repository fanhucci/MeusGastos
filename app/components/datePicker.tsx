import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // ícones do expo

export default function DatePicker({valor,setValor}) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.inputContainer,
          pressed && styles.inputPressed
        ]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.label}>{valor.toLocaleDateString('pt-br')}</Text>
        <Ionicons name="calendar-outline" size={20} color="#333" />
      </Pressable>

      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={(selectedDate) => {
          setValor(selectedDate);
          setIsVisible(false);
        }}
        onCancel={() => setIsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputPressed: {
    backgroundColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
});
