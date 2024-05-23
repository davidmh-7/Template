var Pais = document.getElementById('pais');
var telNumero = document.getElementById('telNumero');


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '31e014dbf2msh7dfbd3e9312cda5p158aadjsn49c0d74aef02',
        'X-RapidAPI-Host': 'virtual-number.p.rapidapi.com'
    }
};
var contador = 0;

// Paises + Emojis

const contenidoPaises = [
    {
        pais: "Rusia",
        emoji: "🇷🇺",
        prefijo: "7"
    },

    {
        pais: "España",
        emoji: "🇪🇸",
        prefijo: "34"
    }

];

document.addEventListener("DOMContentLoaded", function () {
    const botonesContainer = document.getElementById('botones-container');

    contenidoPaises.forEach(item => {
        const boton = document.createElement('button');
        boton.className = "flex items-center mb-1.5 ml-4 w-5/4 bg-gray-100 hover:bg-gray-50 hover:bg-opacity-90 rounded-lg w-48 h-10";
        boton.innerHTML = `
        <div class="mr-3 ml-3 ">${item.emoji}</div>
        <p class="mr-auto">${item.pais}</p>
        <div class="ml-auto mr-3">+${item.prefijo}</div>
      `;
        boton.id = item.prefijo.toLowerCase();
        boton.addEventListener('click', function () {
            sacartelefonos(item.prefijo);
        });
        botonesContainer.appendChild(boton);
    });
});
// 
function sacartelefonos(countryId) {

    console.log(countryId)
    fetch(`https://virtual-number.p.rapidapi.com/api/v1/e-sim/country-numbers?countryId=${countryId}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });
}

function SMSView() {
    fetch(`https://virtual-number.p.rapidapi.com/api/v1/e-sim/view-messages?countryId=7&number=9311211676`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);

        })
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });
}











