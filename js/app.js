const nombreMascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');

// Objeto de cita
const citaObj ={
    mascota: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
}

console.log(citaObj);

// Eventos
nombreMascotaInput.addEventListener('input', datosCita);
propietarioInput.addEventListener('input', datosCita);
emailInput.addEventListener('input', datosCita);
fechaInput.addEventListener('input', datosCita);
sintomasInput.addEventListener('input', datosCita);

formulario.addEventListener('submit', crearCita);


function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}

function crearCita(e) {
    e.preventDefault();

    // console.log("Creando cita...");
    // Validacion
    // const {mascota, propietario, email, fecha, sintomas} = citaObj;
    // if(mascota.trim() === '' || propietario.trim() === '' || email.trim() === '' || fecha.trim() === '' || sintomas.trim() === '') // trim() elimina los espacios en Blanco.
    // {
    //     console.log('Todos los campos son obligatorios');
    //     return;
    // }

    //  Alternativa de validacion mas corta.
    if(Object.values(citaObj).some(input => input.trim() === '')){
        // console.log('Todos los campos son obligatorios');
        new Notificacion({
            texto: 'Todos los campos son obligatorios',
            tipo: 'error'
        })
        // console.log(notificacion);
        return;
    }
}

class Notificacion{
    constructor({texto, tipo}){
        this.texto = texto;
        this.tipo = tipo;
        this.mostrarNotificacion();
    }

    mostrarNotificacion(){
        // Crear el div para mostrar la notificacion
        const alerta = document.createElement('div');
        alerta.classList.add('text-center','w-full','p-3','text-white','my-5','alert','uppercase','font-bold','tesxt-sm');
        // Eliminar la alerta previa
        const alertaPrevia = document.querySelector('.alert');
        // Forma normal
        // if(alertaPrevia){
        //     alertaPrevia.remove();
        // }
        // Utilizando optional chaining
        alertaPrevia?.remove();

        // Tipo de notificacion
        // if(this.tipo === 'error'){
        //     alerta.classList.add('bg-red-500');
        // }else{
        //     alerta.classList.add('bg-green-500');
        // }
        // Usando ternario
        this.tipo === 'error' ? alerta.classList.add('bg-red-500') : alerta.classList.add('bg-green-500');

        // Mensaje de la notificacion
        alerta.textContent = this.texto;

        // Insertar en el DOM
        formulario.parentElement.insertBefore(alerta, formulario);

        // Quitar la alerta despues de 3 segundos
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}


