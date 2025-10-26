window.addEventListener('load', () => { // Se agrega la función de inicio
    const formulario = document.getElementById('formulario');
    const nombre = document.getElementById('nom');
    const email = document.getElementById('mail');
    const usuario = document.getElementById('us');
    const contraseña = document.getElementById('pass');
    const confirmar = document.getElementById('confir');

    // === FUNCIONES AUXILIARES (DEBEN ESTAR FUERA DE validacion()) ===
    
    // Función para manejar el error de validación (Falla)
    const validacionFalla = (input, msje) => {
        // En tu HTML, el padre del input es 'div.form-control'
        const formControl = input.parentElement; 
        const aviso = formControl.querySelector('p');

        aviso.innerText = msje;
        formControl.className = 'form-control falla';
    };

    // Función para manejar la validación exitosa (Ok)
    const validacionOk = (input) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control ok';
    };

    // Función de validación de Email (RegEx)
    const emailValida = (email) => {           
        return /^.+@.+\..{2,}$/.test(email);
    };

    // Función de validación de Usuario (RegEx)
    const validaUsuario = (usuario) => {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9_-]{6,20}$/.test(usuario);
    };
    
    // === FUNCIÓN PRINCIPAL DE VALIDACIÓN ===
    const validacion = () => {
        const nombreValor = nombre.value.trim();
        const emailValor = email.value.trim();
        const usuarioValor = usuario.value.trim();
        const contraseñaValor = contraseña.value.trim();
        const confirmarValor = confirmar.value.trim();
        
        // Expresión regular para la contraseña (al menos 8, mayús, minús, número, especial)
        const contraExpresion = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

        // 1. Validación de nombre
        if (!nombreValor) {
            validacionFalla(nombre, 'Campo vacio');
        } else {
            validacionOk(nombre);
        }

        // 2. Validación de email
        if (!emailValor) {
            validacionFalla(email, 'Campo vacio');
        } else if (!emailValida(emailValor)) {
            validacionFalla(email, 'El e-mail no es valido');
        } else {
            validacionOk(email);
        }

        // 3. Validación de usuario
        if (!usuarioValor) {
            validacionFalla(usuario, 'Campo vacio'); 
        } else if (!validaUsuario(usuarioValor)) { // CORRECCIÓN 1: Se llama a la función con el valor del input.
            validacionFalla(usuario, 'Debe contener mayúsculas, minúsculas, números y tener entre 6 y 20 caracteres.'); // Se corrige el mensaje de error para ser más específico.
        } else {
            validacionOk(usuario);
        }

        // 4. Validación de contraseña
        if (!contraseñaValor) {            
            validacionFalla(contraseña, 'Campo vacio');
        } 
        /* CORRECCIÓN 2: Se eliminó la línea "contraseñaValor.length < 8" porque la RegEx ya lo valida. 
           Si se deja, puede interferir con el mensaje de error de la RegEx. */
        else if (!contraseñaValor.match(contraExpresion)) {
            validacionFalla(contraseña, 'Debe contener 8-20 caracteres, mayúscula, minúscula, número y un caracter especial.');
        } else {
            validacionOk(contraseña);
        }

        // 5. Validación de confirmación
        if (!confirmarValor) {
            validacionFalla(confirmar, 'Confirme su contraseña');
        } else if (contraseñaValor !== confirmarValor) {
            validacionFalla(confirmar, 'Las contraseñas deben coincidir');
        } else {
            validacionOk(confirmar);
        }
    };


    // === ESCUCHADOR DE EVENTOS ===
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        validacion();
    });

}); // Cierre de window.addEventListener('load')