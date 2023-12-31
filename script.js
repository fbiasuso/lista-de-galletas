const listaGalletas = () => {

const galletas = [  "-Traviata-", 
                    "-Sonrisas-", 
                    "---Maná---", 
                    "Surtido-B.",
                    "--Oreos---",  
                    "-Pepitos--", 
                    "--Rumba---", 
                    "--Opera---",
                 ]
const unidades = [  5, 
                    3, 
                    3, 
                    1,
                    3,  
                    3, 
                    3, 
                    4,
                ]

const precio = [  921, 
                  982, 
                  887, 
                  971,
                  1650,  
                  1456, 
                  1077, 
                  814,
              ]


const gramos = [    505, 
                    324, 
                    393, 
                    398,
                    354,  
                    357, 
                    324, 
                    220,
                ]

/* console.table(galletas) */

console.log("\n Lista de Galletas:");
console.log("%c|    Galletas   |  Unidades x Pack | Precio x Pack  | Peso Neto |","background-color:#1B2631; color:#fff; padding: 5px 10px;");
 
 mostrarTabla(galletas,unidades,precio,gramos)
 console.log("\n");

const posicionCara = relaciónValorPrecio(precio,1)
console.log("La galleta más cara es ",galletas[posicionCara]," que cuesta $",precio[posicionCara])
 
const posicionBarata = relaciónValorPrecio(precio,0)
console.log("La galleta más barata es ",galletas[posicionBarata]," que cuesta $",precio[posicionBarata])

const masBaratoPorUnidad = relaciónValorPrecio(precio,0,unidades)
console.log("La galleta más barata por unidad es ",galletas[masBaratoPorUnidad]," que cuesta $",precio[masBaratoPorUnidad]/unidades[masBaratoPorUnidad]," cada unidad.")

const masBaratoPorGramos = relaciónValorPrecio(precio,0,gramos)
console.log("La galleta más barata por gramos es ",galletas[masBaratoPorGramos]," que cuesta $",(precio[masBaratoPorGramos]/gramos[masBaratoPorGramos]).toPrecision(3)," por gramo.")


console.log("\n Lista de precios en Dólares de fecha 18/10/2023:");
console.log("%c|    Galletas   |  Unidades x Pack | Dólar Oficial  | Dólar Blue |","background-color:#1B2631; color:#fff; padding: 5px 10px;");

mostrarTabla(galletas,unidades,precio,precio,1,0,2023,1,2023)

 console.log("\n Lista de precios en Pesos de hace 5 y 10 años:");
console.log("%c|    Galletas   |  Unidades x Pack | Precio 2013  | Precio 2018 |","background-color:#1B2631; color:#fff; padding: 5px 10px;");

mostrarTabla(galletas,unidades,precio,precio,2,0,2013,0,2018)

}

const mostrarTabla = (array,array2,array3,array4,convertir=0,tipo1=0,periodo1=0,tipo2=0,periodo2=0)=>{
    
    periodo1 === 0 && periodo2 === 0 ? (periodo1 = 2023, periodo2 = 2023) 
    : periodo2 !== 0 && periodo1 === 0 ? (periodo2 = periodo2, periodo1 = 2023) 
    : periodo1 !== 0 && periodo2 === 0 && (periodo1 = periodo1, periodo2 = 2023) 

    tipo1 !== 1 && (tipo1 = 0)
    tipo2 !== 1 && (tipo2 = 0)
   
    indice = 0

    let array3Convertido = []
    let array4Convertido = []
      
    while (indice < array.length) {

     convertir === 0 ? (array3Convertido =array3[indice], array4Convertido =array4[indice])
    : convertir === 1 
    ? (array3Convertido = conversion(array3[indice],tipo1,periodo1).toPrecision(3), array4Convertido = conversion(array4[indice],tipo2,periodo2).toPrecision(3))
    : convertir === 2 
    && (array3Convertido = conversion(conversion(array3[indice]),tipo1,periodo1).toPrecision(3),array4Convertido = conversion(conversion(array4[indice]),tipo2,periodo2).toPrecision(3));
    
    indice%2==0? (css="background-color:#1F618D; color:#fff; padding: 5px 10px;")
    : (css="background-color:#2874A6 ; color:#fff; padding: 5px 10px;")

    console.log("%c|   "+array[indice]+
                "  |          "+array2[indice]+
                "       |       "+array3Convertido+
                "     |     "+array4Convertido+
                "   |",css
                );
    
    indice++  
 }
 
}


const relaciónValorPrecio = (precio,operacion=0,array = [])=>{
    operacion !== 1 &&
    operacion !== 0 && (operacion = 0)

    let contador = 0;
    let posicion = 0;
    let valor = 0;
    let datosArray = 0;
    while (contador < precio.length) {
        
        array.length !== 0 ? (datosArray = precio[contador]/array[contador])
        : (datosArray =  precio[contador]);
        
        operacion === 1 
        ? valor < datosArray && (valor = datosArray, posicion = contador)
        : valor === 0 ? (valor = datosArray, posicion = contador) 
        : valor > datosArray && (valor = datosArray, posicion = contador);
        
        contador++
    }
    return posicion;
}

const conversion = (precio,tipo = 0, periodo = 2023) => {
    let precioDolar = 0
    let dolar = 365.50
    
    tipo !== 1 ? (tipo = 0)
    : (dolar = 905)
    
    periodo === 2018 ? dolar = 37.54 
    : periodo === 2013 ? dolar = 5.86 :
    (periodo = 2023);

    periodo == 2023 ? (operacion = precio / dolar)
    :  (operacion = precio * dolar)
    
    tipo === 0 ? (precioDolar = operacion)
    : tipo === 1 && (precioDolar = operacion)

    return precioDolar;
}

listaGalletas()