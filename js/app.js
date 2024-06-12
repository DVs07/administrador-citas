const nombreMascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');

const contenedorCitas = document.querySelector('#citas');

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

class AdminCitas{
    constructor(){
        this.citas = [];

        // console.log(this.citas);
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];
        console.log(this.citas);

        this.mostrarCitas();
    }

    mostrarCitas(){
        // Limpiar HTML previo
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }

        // Generar las citas
        this.citas.forEach(cita => {
            const divCita = document.createElement('div');
            divCita.classList.add('mx-5', 'my-10', 'bg-white', 'shadow-md', 'px-5', 'py-10' ,'rounded-xl', 'p-3');
        
            const nombreMascota = document.createElement('p');
            nombreMascota.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            nombreMascota.innerHTML = `<span class="font-bold uppercase">Mascota: </span> ${cita.mascota}`;
        
            const propietario = document.createElement('p');
            propietario.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;
        
            const email = document.createElement('p');
            email.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;
        
            const fecha = document.createElement('p');
            fecha.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;
        
            const sintomas = document.createElement('p');
            sintomas.classList.add('font-normal', 'mb-3', 'text-gray-700', 'normal-case')
            sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;
        
            // Agregar al HTML
            divCita.appendChild(nombreMascota);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            contenedorCitas.appendChild(divCita);
        });   
    }
}
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}

const citas = new AdminCitas();
function crearCita(e) {
    e.preventDefault();

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
    citas.agregarCita({...citaObj});

    formulario.reset();

    reiniciarObjeto();
}

function reiniciarObjeto() {
    // Reiniciar objeto
    // citaObj.mascota = '';
    // citaObj.propietario = '';
    // citaObj.email = '';
    // citaObj.fecha = '';
    // citaObj.sintomas = '';

    // Alternativa de reiniciar objeto
    Object.assign(citaObj, {
        mascota: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    })
}



