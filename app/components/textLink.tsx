import { StyleSheet, Text } from "react-native";
import { cores } from "../theme/referencias/colors";

type TextLinkProps = {
    texto: string;
    rota: () => void;
    cor?: string; // opcional
};

export default function TextLink({ texto, rota, cor }: TextLinkProps) {
    return (
        <Text
            onPress={rota}
            style={[estilo.text, { color: cores[cor] }]}
        >
            {texto}
        </Text>
    );
}

const estilo = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 16
    }
});