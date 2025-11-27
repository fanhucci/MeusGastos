export default function aplicarMascaraDinheiro(texto: string):string{

    let numeros = texto.replace(/\D/g, "");
    let formatado = "";

    if (!numeros) {
        formatado = "R$0.00";
        return formatado;
    }


    let valor = Number(numeros) / 100;


    formatado = valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return formatado;
};