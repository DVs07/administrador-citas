const nombreMascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

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


function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
    console.log(citaObj);
}


