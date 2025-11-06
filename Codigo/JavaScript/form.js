window.addEventListener('load', () => { // Se agrega la función de inicio
    const formulario = document.getElementById('formulario');
    const nombre = document.getElementById('nom');
    const email = document.getElementById('mail');
    const usuario = document.getElementById('us');
    const contraseña = document.getElementById('pass');
    const confirmar = document.getElementById('confir');


    const validacionFalla = (input, msje) => {        
        const formControl = input.parentElement; 
        const aviso = formControl.querySelector('p');

        aviso.innerText = msje;
        formControl.className = 'form-control falla';
    };

    // Funcion para manejar la validacion exitosa 
    const validacionOk = (input) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control ok';
    };

    // extpresion regular Función de validacion de Email 
    const emailValida = (email) => { 
        return /^.+@.+\..{2,}$/.test(email);
    };

    // expresion regular de validación de Usuario 
    const validaUsuario = (usuario) => {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_-]{6,20}$/.test(usuario);
    };
    
    


    //  FUNCION PRINCIPAL DE VALIDACIoN 
    const validacion = () => {
        const nombreValor = nombre.value.trim();
        const emailValor = email.value.trim();
        const usuarioValor = usuario.value.trim();
        const contraseñaValor = contraseña.value.trim();
        const confirmarValor = confirmar.value.trim();
        
        // Expresión regular para la contraseña (al menos 8, mayus, minus, numero)
        const contraExpresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;

        //  Validacion de nombre
        if (!nombreValor) {
            validacionFalla(nombre, 'Campo vacio');
        } else {
            validacionOk(nombre);
        }

        //  Validacion de email
        if (!emailValor) {
            validacionFalla(email, 'Campo vacio');
        } else if (!emailValida(emailValor)) {
            validacionFalla(email, 'El e-mail no es valido');
        } else {
            validacionOk(email);
        }

        //  Validacion de usuario
        if (!usuarioValor) {
            validacionFalla(usuario, 'Campo vacio'); 
        } else if (!validaUsuario(usuarioValor)) { 
            validacionFalla(usuario, 'Debe contener mayus, minus, numeros y tener entre 6 y 20 caracteres.'); 
        } else {
            validacionOk(usuario);
        }

        //  Validacion de contraseña
        if (!contraseñaValor) { 
            validacionFalla(contraseña, 'Campo vacio');
        }       
        else if (!contraseñaValor.match(contraExpresion)) {
            validacionFalla(contraseña, 'Debe contener 8-20 caracteres, mayúscula, minús y un número.');
        } else {
            validacionOk(contraseña);
        }

        //  Validacion de confirmación de contraseña
        if (!confirmarValor) {
            validacionFalla(confirmar, 'Confirme su contraseña');
        } else if (contraseñaValor !== confirmarValor) {
            validacionFalla(confirmar, 'Las contraseñas deben coincidir');
        } else {
            validacionOk(confirmar);
        }
    };


    const esFormularioValido = () => {
        const totalCampos = formulario.querySelectorAll('.form-control').length

        const camposOk = formulario.querySelectorAll('.form-control.ok').length

        return totalCampos === camposOk
    }

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        validacion();

        if(esFormularioValido()){
            const mensajePrevio = formulario.parentElement.querySelector('.mensaje-exito')

            if(mensajePrevio) {
                mensajePrevio.remove();
            }
            
            const nombreValor = nombre.value;
            const emailValor = email.value;
            const usuarioValor = usuario.value;

            const mensajeExito = document.createElement('div')
            mensajeExito.classList.add('mensaje-exito');

            mensajeExito.innerHTML = `
                <h4>¡Registro Exitoso!</h4>
                <p>Datos enviados:</p>
                <ul>
                    <li><strong>Nombre:</strong> ${nombreValor}</li>
                    <li><strong>Email:</strong> ${emailValor}</li>
                    <li><strong>Usuario:</strong> ${usuarioValor}</li>
                </ul>
            `;

            formulario.parentElement.appendChild(mensajeExito)
    }
        })
    });