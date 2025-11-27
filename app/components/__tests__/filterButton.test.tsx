import React from "react";
import FilterButton from "../filterButton";
import { fireEvent, render } from "@testing-library/react-native";


test('renderiza o botao filtro e chama a funcao quando pressionado',()=>{
    const funcaoTeste = jest.fn();

    const {getByText} = render(
        <FilterButton texto="filtroTeste" filtro="teste" funcao={funcaoTeste} valor="teste"/>
    );

    const filtro = getByText('filtroTeste');
    fireEvent.press(filtro);


    expect(funcaoTeste).toHaveBeenCalledTimes(1);

});

