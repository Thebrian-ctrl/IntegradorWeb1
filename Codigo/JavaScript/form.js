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

    // Función para manejar la validación exitosa 
    const validacionOk = (input) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control ok';
    };

    // Función de validación de Email 
    const emailValida = (email) => { 
        return /^.+@.+\..{2,}$/.test(email);
    };

    // Función de validación de Usuario 
    const validaUsuario = (usuario) => {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_-]{6,20}$/.test(usuario);
    };
    
    //  FUNCIÓN PRINCIPAL DE VALIDACIÓN 
    const validacion = () => {
        const nombreValor = nombre.value.trim();
        const emailValor = email.value.trim();
        const usuarioValor = usuario.value.trim();
        const contraseñaValor = contraseña.value.trim();
        const confirmarValor = confirmar.value.trim();
        
        // Expresión regular para la contraseña (al menos 8, mayús, minús, número, especial)
        const contraExpresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

        //  Validación de nombre
        if (!nombreValor) {
            validacionFalla(nombre, 'Campo vacio');
        } else {
            validacionOk(nombre);
        }

        //  Validación de email
        if (!emailValor) {
            validacionFalla(email, 'Campo vacio');
        } else if (!emailValida(emailValor)) {
            validacionFalla(email, 'El e-mail no es valido');
        } else {
            validacionOk(email);
        }

        //  Validación de usuario
        if (!usuarioValor) {
            validacionFalla(usuario, 'Campo vacio'); 
        } else if (!validaUsuario(usuarioValor)) { 
            validacionFalla(usuario, 'Debe contener mayúsculas, minúsculas, números y tener entre 6 y 20 caracteres.'); 
        } else {
            validacionOk(usuario);
        }

        //  Validación de contraseña
        if (!contraseñaValor) { 
            validacionFalla(contraseña, 'Campo vacio');
        }       
        else if (!contraseñaValor.match(contraExpresion)) {
            validacionFalla(contraseña, 'Debe contener 8-20 caracteres, mayúscula, minúscula, número y un caracter especial.');
        } else {
            validacionOk(contraseña);
        }

        //  Validación de confirmación
        if (!confirmarValor) {
            validacionFalla(confirmar, 'Confirme su contraseña');
        } else if (contraseñaValor !== confirmarValor) {
            validacionFalla(confirmar, 'Las contraseñas deben coincidir');
        } else {
            validacionOk(confirmar);
        }
    };



    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        validacion();
    });

}); 