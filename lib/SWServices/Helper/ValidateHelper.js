function validateCustomServiceV4(customServiceV4) {

    const defaults = { customId: false, pdf: false, email: false };
    customServiceV4 = { ...defaults, ...customServiceV4 };

    // Validar customId
    if (customServiceV4.customId && typeof customServiceV4.customId === 'string' && customServiceV4.customId.length > 100) {
        throw new Error("customId viene vacío o es mayor a 100 caracteres.");
    }

    // Validar pdf
    if (customServiceV4.pdf !== undefined && typeof customServiceV4.pdf !== 'boolean') {
        throw new Error("pdf debe ser booleano");
    }

    // Validar email
    if (customServiceV4.email) {
        let emails = [];

        if (typeof customServiceV4.email === 'string') {
            emails = customServiceV4.email.split(',').map(e => e.trim());
        } else if (Array.isArray(customServiceV4.email)) {
            emails = customServiceV4.email.map(e => e.trim());
        } else {
            throw new Error("email debe ser un string separado por comas o un array de correos.");
        }

        // Máximo 10 correos
        if (emails.length > 10) {
            throw new Error("Solo se permiten hasta 10 correos.");
        }

        // Validar formato de cada email
        const emailRegex = /\S+@\S+\.\S+/;
        for (const email of emails) {
            if (!emailRegex.test(email)) {
                throw new Error(`El correo '${email}' no es válido.`);
            }
        }

        customServiceV4.email = emails; // Normalizamos a array de correos
    }

    return customServiceV4;
}

module.exports = { validateCustomServiceV4 };