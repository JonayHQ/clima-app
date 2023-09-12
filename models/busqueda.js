import axios, { Axios } from 'axios';
import fs from 'fs'
//import 'dotenv/config'

export { Busquedas }


class Busquedas {
    
    historial=[];
    dbPath = './db/database.json'

    constructor(){
        this.leerDB()
    }

    get historialCapitalizado(){

        return this.historial.map(lugar => {
                let palabras = lugar.split(' ')
                palabras = palabras.map(p=> p[0].toUpperCase()+ p.substring(1))
                return palabras.join(' ')

                })

    }

async ciudad(lugar = ''){
try {
    let key = process.env.API_KEY
    const instance = axios.create({
        baseURL: `https://eu1.locationiq.com/v1/search?key=${key}&q=${lugar}&format=json`,
        
    })
    
    const resp = await instance.get()
   
   
return resp.data.map(lugar =>({
    id: lugar.place_id,
    name: lugar.display_name,
    lng: lugar.lon, 
    lat: lugar.lat,

}))
    
}catch(error){
    return []
}
    

}

async climaLugar (lat , lon){

try {
    let key = process.env.OPEN_WEATHER
    const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=es`,
        
    })
    
    const resp = await instance.get()
    
return {
    desc: resp.data.weather[0].description,
    min: resp.data.main.temp_min,
    max: resp.data.main.temp_max,
    temp: resp.data.main.temp,

}
   
} catch (error) {
    console.log(error)
}

}

agregarHistorial (lugar = ''){
console.log("hola",this.historial)

if(this.historial.includes(lugar.toLocaleLowerCase())){
    return;
}

this.historial.unshift(lugar.toLocaleLowerCase() )

this.guardarDB()

}

guardarDB(){
    fs.writeFileSync(this.dbPath, JSON.stringify({historial: this.historial}))
}

leerDB(){
    if(!fs.existsSync(this.dbPath)) return;

    const info =  fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
    const data = JSON.parse(info)

    this.historial = data.historial
console.log("Rastreo", this.historial)
}


}