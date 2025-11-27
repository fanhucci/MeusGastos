import { ActivityIndicator, Text, View } from "react-native";

export default function CarregamentoModal(){
    return(
        <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff"
            }}>
            <ActivityIndicator size="large" color="#0066ff" />
            <Text style={{ marginTop: 20, fontSize: 16, color: "#666" }}>Carregando seus dados...</Text>
        </View>
    );
};