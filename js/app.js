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
        console.log('Todos los campos son obligatorios');
        return;
    }

    console.log("Afuera del if");
}


