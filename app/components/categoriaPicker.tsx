import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { View } from 'react-native';

export default function CategoriaPicker({valor,setValor,categorias}) {
  

  return (
    <View style={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginVertical: 5,
        }}>
        <Picker
            selectedValue={valor}
            onValueChange={(itemValue) => setValor(itemValue)}
            style={{ color: "#333" }}
        >
            {categorias.map(categoria=>(
                <Picker.Item key={categoria} label={categoria} value={categoria} />
            ))}
        </Picker>
    </View>

  );
}
