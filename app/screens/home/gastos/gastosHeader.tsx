import { cores } from "@/app/theme/referencias/colors";
import { View, TextInput, StyleSheet, Platform, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

interface GastosHeaderProps {
  getter: string;
  setter: (text: string) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

export default function GastosHeader({
  getter,
  setter,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: GastosHeaderProps) {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  return (
    <View>

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


      <View style={{flexDirection:"column"}}>

        <View style={styles.datesRow}>
          <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowStartPicker(true)}
        >
          <Ionicons name="calendar" size={18} color={cores.textSecondary} />
          <Text style={styles.dateText}>
            {startDate
              ? startDate.toLocaleDateString("pt-BR")
              : "Início"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowEndPicker(true)}
        >
          <Ionicons name="calendar" size={18} color={cores.textSecondary} />
          <Text style={styles.dateText}>
            {endDate
              ? endDate.toLocaleDateString("pt-BR")
              : "Fim"}
          </Text>
        </TouchableOpacity>
        </View>

          {(startDate || endDate) && (
          <TouchableOpacity
            onPress={() => {
              setStartDate(null);
              setEndDate(null);
            }}
            style={styles.clearDatesButton}
          >
            <Ionicons name="close-circle" size={18} color={cores.danger} />
            <Text style={styles.clearDatesText}>Limpar datas</Text>
          </TouchableOpacity>
        )}


      </View>


      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) setEndDate(selectedDate);
          }}
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


  datesRow: {
    width: "90%",
    marginHorizontal: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -8,
    marginBottom:10
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    width: "48%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  dateText: {
    marginLeft: 6,
    color: cores.text,
    fontSize: 15,
  },
  clearDatesButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
  opacity: 0.8,
  marginBottom: 10,
  
  },
  clearDatesText: {
    color: cores.danger,
    marginLeft: 6,
    fontSize: 15,
    fontWeight:"bold"
  }
});
