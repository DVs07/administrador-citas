const nombreMascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#formulario-cita');
const btnFormualario = document.querySelector('#formulario-cita input[type="submit"]');

const contenedorCitas = document.querySelector('#citas');

// Objeto de cita
const citaObj = {
    id: generarId(),
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

let modoEdicion = false;

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

        // Utilizando optional chaining
        alertaPrevia?.remove();

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

    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
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

            // Agregando los botones de eliminar y editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2', 'btn-editar');

            // Copia de la cita usando structured clone, para no modificar la original
            const copia = structuredClone(cita);
            // Añadiendo el evento de editar. Usando event handlers de JS...
            btnEditar.onclick = () => cargarEdicion(copia);

            btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
            
            btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            
            // Contenedor de los botones
            const contenedorBotones = document.createElement('div');
            contenedorBotones.classList.add('flex', 'justify-between', 'items-center', 'mt-10');
            contenedorBotones.appendChild(btnEditar);
            contenedorBotones.appendChild(btnEliminar);

            // Agregar al HTML
            divCita.appendChild(nombreMascota);
            divCita.appendChild(propietario);
            divCita.appendChild(email);
            divCita.appendChild(fecha);
            divCita.appendChild(sintomas);
            divCita.appendChild(contenedorBotones);
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
    if(modoEdicion) {
        // console.log('Editando...');
        citas.editarCita({...citaObj});
        new Notificacion({
            texto: 'Guardado Correctamente',
            tipo: 'correcto'
        })
    }else{
        // console.log('Registro nuevo...');
        citas.agregarCita({...citaObj});
        new Notificacion({
        texto: 'Guardado Correctamente',
        tipo: 'correcto'
        })
    }

    formulario.reset();
    reiniciarObjeto();
    btnFormualario.value = 'Registrar Paciente';
    modoEdicion = false;
}

function reiniciarObjeto() {

    // Alternativa de reiniciar objeto
    Object.assign(citaObj, {
        id: generarId(),
        mascota: '',
        propietario: '',
        email: '',
        fecha: '',
        sintomas: ''
    })
}

function generarId() {
    return Math.random().toString(36).substring(2) + Date.now();
}
function cargarEdicion(cita) {
    // console.log(cita);
    Object.assign(citaObj, cita);
    nombreMascotaInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    modoEdicion = true;

    btnFormualario.value = 'Guardar Cambios';
}



