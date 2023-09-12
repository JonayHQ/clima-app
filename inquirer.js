import inquirer from 'inquirer';
import colors from 'colors'
export { inquirerMenu, pausa, leerInput, listarLugares, confirm,
    listadoCheckList }


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Elija una opcion?',
        choices: [
            {
                value: 1,
                name: '1.'.green+ 'Buscar ciudad'
            },
            {
                value: 2,
                name: '2.'.green+ 'Historial'
            },
            {
                value: 0,
                name: '0.'.green+ 'Salir'
            },
            
        ]

    }
]


const inquirerMenu = async() => {

    //console.clear()
    console.log('======================='.green)
    console.log('Seleccione una opcion'.white)
    console.log('=======================\n'.green)

const {opcion} = await inquirer.prompt(preguntas)

return opcion
}  

const pauseMensaje = [
    {
        type: 'input',
        name: 'mensajeEnter',
        message: `\nPresione ${'ENTER'.green} para continuar\n`
    }
    ]

const pausa = async() => {

    //console.clear()
   
const {mensajeEnter} = await inquirer.prompt(pauseMensaje)

return mensajeEnter

}

const leerInput = async(mensaje)=>{

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            
            validate( value ){
                if(value.length === 0){
                    return "Por favor ingrese un valor"
                }
                return true;
            }
        }
    ];

const {desc} = await inquirer.prompt(question);

return desc

}


const listarLugares = async(lugares = [])=>{

let choices = []
lugares.forEach((lugar,i) => {
let idx = i+1
let linea = `${idx}.`.green + ` ${lugar.name}`

//esto es para que no me traiga mas de 5 resultados.
if(i<5){
let obj = {
    value: lugar.id,
    name: linea
}
choices.push(obj)
}

});
choices.unshift({value: "0", name: "0. Cancelar"})

    const listaLugares = [
        {
            type: 'list',
            name: 'id',
            message: '¿Mueve arriba abajo para selecionar?\n',
            choices: choices,//[{..1},{...2}]
        }   
            ]
    
    const {id} = await inquirer.prompt(listaLugares)
            return id
}


const confirm = async (mensaje)=> {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje,
        }   
            ]

            const {ok} = await inquirer.prompt(pregunta)
        return ok
}


const listadoCheckList = async(tareas = [])=>{

    let choices = []
    tareas.forEach((tarea,i) => {
    let idx = i+1
    let linea = `${idx}.`.green + ` ${tarea.desc}`
    
    let obj = {
        value: tarea.id,
        name: linea,
        checked: (tarea.completadoEn)?true:false
    }
    
    choices.push(obj)
    console.log(choices)
    
    });
        const lista = [
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Seleccione',
                choices,//[{..1},{...2}]
            }   
                ]
        
    const {ids} = await inquirer.prompt(lista)
     return ids
    }