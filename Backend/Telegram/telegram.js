const fetch = require("node-fetch");

const TOKEN = "AAEs0OF8v4kv6HMFrBQG_Iby4b6GpFCOp_o";
const CHAT_ID = "7305136526";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

module.exports = function enviarTelegram(mensaje) {
    fetch(TELEGRAM_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: mensaje
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log("Mensaje enviado correctamente.");
        } else {
            console.error("Error al enviar el mensaje:", data);
        }
    })
    .catch(error => console.error("Error en la solicitud:", error));
};