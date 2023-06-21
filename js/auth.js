async function login(event) {
    event.preventDefault();
    const email = $('#email-login').val();
    const senha = $('#password-login').val();

    var hashedPass = '46070d4bf934fb0d4b06d9e2c46e346944e322444900a435d7d9a95e6d7435f5';

    //criptografa a senha
    await hashPassword(senha).then(hash => {
        console.log('Senha criptografada:', hash)
    })
        .catch(error => console.error('Erro ao criptografar senha:', error));


    //compara a senha e o hash para ver se combinam
    await comparePasswords(senha, hashedPass)
        .then(match => {
            if (match) {
                console.log('A senha está correta.');
            } else {
                console.log('A senha está incorreta.');
            }
        })
        .catch(error => console.error('Erro ao comparar senhas:', error));

}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

async function comparePasswords(password, storedHash) {
    const hashedPassword = await hashPassword(password);
    return hashedPassword === storedHash;
}