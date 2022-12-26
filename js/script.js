function generateKey(){
    let salt = CryptoJS.lib.WordArray.random(128 / 8);
    return CryptoJS.PBKDF2('EuAmoBatatas', salt, {
        keySize: 128 / 32
    });
}

function encryptMessage(message, key){
    return CryptoJS.AES.encrypt(message, key.toString()).toString();
}

function decryptMessage(message, key){
    let bytes = CryptoJS.AES.decrypt(message, key.toString());
    return bytes.toString(CryptoJS.enc.Utf8);
}

function clickEncryptBtn(){
    const inputText = document.getElementById('texto-entrada');
    if(!isEmpty(inputText.value)){
        let key = generateKey();
        let encryptedMessage = encryptMessage(inputText.value, key);
        refreshOutput(encryptedMessage);
        refreshKey(key);
    }
}

function clickDecryptBtn(){
    const inputText = document.getElementById('texto-entrada');
    const screenKey = document.getElementById('chave');
    if(!isEmpty(inputText.value) && !isEmpty(screenKey.value)){
        let message = decryptMessage(inputText.value, screenKey.value);
        refreshOutput(message);
    }
}

function refreshOutput(text){
    const outputText = document.getElementById('texto-saida');
    outputText.value = text;
}

function refreshKey(key){
    const screenKey = document.getElementById('chave');
    screenKey.value = key;
}

function logTest(){
    let key = generateKey();
    console.log('Chave gerada: ' + key);
    let messageEncrypted = encryptMessage('Olá', key);
    console.log('Mensagem criptogradafa: ' + messageEncrypted);
    let messageDecrypted = decryptMessage(messageEncrypted, key);
    console.log('Mensagem descriptografada: ' + messageDecrypted);
}

function copyContent(){
    const outputText = document.getElementById('texto-saida');
    navigator.clipboard.writeText(outputText.value);
    alert('Texto copiado');
}

function isEmpty(value){
    if(value === null || value === undefined || value == ''){
        return true;
    }
    return false;
}