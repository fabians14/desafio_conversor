let apiURL = "https://mindicador.cl/api/";
let codigoMonedas = ["dolar", "euro"];
let graficos;

let inputMontoPesos = document.querySelector("#montoPesos");
let selectMonedaCambio = document.querySelector("#monedaCambio");
let parrafoMensaje = document.querySelector("#mensaje");
let botonBuscar = document.querySelector("#botonBuscar");
let myChart = document.querySelector("#mychart");

renderSelect();
botonBuscar.addEventListener("click", async function(){
    let codigoMoneda = selectMonedaCambio.value;

    let moneda = await getMoneda(codigoMoneda);    

    renderGrafico(moneda)
});

async function renderSelect(){
    let monedas = await getMonedas(codigoMonedas);
    let html = "";

    for (const moneda of monedas) {
        let template = `
            <option value="${moneda.codigo}">${moneda.nombre}</option>
        `;

        html += template;
    }

    selectMonedaCambio.innerHTML += html;
}

async function getMonedas(arrayCodigos){
    let monedas = [];

    for (let i = 0; i < arrayCodigos.lenght; i++){
        let moneda = await getMoneda(arrayCodigos[i])
        monedas.push(moneda);
    }

    return monedas;
}

async function getMoneda(codigo) {

    try {
        const res = await fetch(apiURL + codigo);
        let moneda = await res.json();
        return moneda;    
    } catch (error) {
        parrafoMensaje.innerHTML = "Se produjo un error";
    }
    

}
function renderGrafico(moneda) {
    let serie10Ultimos = moneda.serie.slice(0, 10);

    const label = serie10Ultimos.map(serie => serie.fecha.slice(0, 10).reverse());

    const data = serie10Ultimos.map(serie => serie.valor.reverse());

    const dataset = [
        {
            label: "Historial ultimos 10 días",
            borderColor: "red",
            data
        }
    ];

    const conf = {
        type: "line",
        data: {
            labels,
            dataset
        }
    };

    myChart. innerHTML= "";

    if(grafico){
        grafico.destroy();
    }

    grafico = new Chart(myCHart, conf); 

}
