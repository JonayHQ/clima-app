import axios from 'axios';
import 'dotenv/config'


import { leerInput, inquirerMenu, pausa, listarLugares } from "./inquirer.js"
import {Busquedas} from './models/busqueda.js'



const  main = async()=>{

const busquedas = new Busquedas
let opt

//crear menu en consola.
        //usar inquirer para crear el menu
do {
    opt =  await inquirerMenu()

    switch(opt){
        case 1:
            const terminoBusqueda = await leerInput("Ciudad: ")
            //peticion a la API (peticion http:)
            const lugares = await busquedas.ciudad(terminoBusqueda)
            const id = await listarLugares(lugares)
            const lugarSeleccionado = lugares.find(lugar => lugar.id===id)
            
            if (id === "0") continue //pasa al otro ciclo
            
            busquedas.agregarHistorial(lugarSeleccionado.name)

            const tiempoLugarSel = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng)
            
            console.log(tiempoLugarSel)

           // console.clear()
            console.log(`\nInformacion del tiempo - ${lugarSeleccionado.name}`)
            console.log("=====================================\n".green)
            console.log("Ciudad: ", lugarSeleccionado.name )
            console.log("latitud: ", lugarSeleccionado.lat )
            console.log("longitud: ", lugarSeleccionado.lng )
            console.log("Temperatura: ", tiempoLugarSel.temp ) 
            console.log("Temperatura Min: ", tiempoLugarSel.min )
            console.log("Temperatura Max: ", tiempoLugarSel.max )
            console.log("Estado del tiempo: ", tiempoLugarSel.desc )
          

        break;
        case 2:
            busquedas.historialCapitalizado.forEach((busqueda, i) => {
                const idx = `${i+1}.`.green
                const lineaHistorial = `${idx}${busqueda}`
                console.log(lineaHistorial)
                
            });
        break;



    }

    await pausa()

} while (opt!==0);





}

main()