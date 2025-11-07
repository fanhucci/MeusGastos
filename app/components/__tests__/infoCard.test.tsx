import React from "react";
import InfoCard from "../infoCard";
import { fireEvent,render } from "@testing-library/react-native";

test('renderiza o card e chama a função ao ser pressionado',()=>{
    const funcaoTeste = jest.fn();

    const objTeste = {
        titulo:'tituloTeste',
        data:'dataTeste',
        valor:'valorTeste'
    }
    const {getByText} = render(
        <InfoCard obj={objTeste} funcao={funcaoTeste}/>
    );

    const card = getByText('tituloTeste');
    fireEvent.press(card);

    expect(funcaoTeste).toHaveBeenCalledTimes(1);
});