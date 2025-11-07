import React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import SubmitButton from "../submitButton";

jest.mock('../../theme/referencias/colors', ()=>({
    cores:{
        primary:'cor1', 
        secundary:'cor2', 
        tertiary:'cor3'
    },
}));

jest.mock('../../theme/tema',()=>({
    submitButtonStyle:{
        button:{},
        buttonPressed:{},
        text:{}
    }
}));

test('renderiza o botão e chama a função quando pressionado', ()=>{
    const funcaoTeste = jest.fn();

    const { getByText } = render(
        <SubmitButton titulo="botaoTeste" tipo="primary" funcao={funcaoTeste}/>
    );

    const botao = getByText('botaoTeste');
    fireEvent.press(botao);

    expect(funcaoTeste).toHaveBeenCalledTimes(1);

});