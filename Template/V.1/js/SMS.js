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
        boton.className = "flex items-center mb-1.5 ml-6 border border-gray-200 hover:bg-gray-50 hover:bg-opacity-90 rounded-lg w-[90%] h-10";
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

    fetch(`https://virtual-number.p.rapidapi.com/api/v1/e-sim/country-numbers?countryId=${countryId}`, options)
        .then(response => response.json())
        .then(data => {
            const arrayNumero = data;
            const phoneContainer = document.createElement('div');
            phoneContainer.className = "flex flex-col p-4 space-y-2";

            arrayNumero.forEach(item => {
                const phoneButton = document.createElement('button');
                phoneButton.id = item;
                phoneButton.className = "flex items-center mb-1.5 border border-gray-200 hover:bg-gray-50 hover:bg-opacity-90 rounded-lg lg:ml-6 w-[95%] h-10";
                phoneButton.innerHTML = ` 
                    <span class="ml-6 flex"><svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor; margin-top:4px; margin-right:10px;"><path d="M5.5 1H2.87785C1.63626 1 0.694688 2.11946 0.907423 3.34268L1.14841 4.72836C1.96878 9.4455 5.51475 13.2235 10.1705 14.3409L12.5333 14.908C13.7909 15.2098 15 14.2566 15 12.9632V10.5L11.75 8.25L9.25 10.75L5.25 6.75L7.75 4.25L5.5 1Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="transparent"></path></svg> ${item}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 " style="color:#DC2656; transform: rotate(270deg);">
                        <path d="m6 9 6 6 6-6"></path>
                    </svg>
                `;
                phoneButton.addEventListener('click', function () {
                    SMSView(countryId, item);
                });

                phoneContainer.appendChild(phoneButton);
            });
            const botonesContainer = document.getElementById('numeroTelefono');
            botonesContainer.innerHTML = '';
            botonesContainer.appendChild(phoneContainer);
        })
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });
}

function SMSView(countryId,numeroTelefono) {
    console.log(countryId)
    console.log(numeroTelefono)
    fetch(`https://virtual-number.p.rapidapi.com/api/v1/e-sim/view-messages?countryId=${countryId}&number=${numeroTelefono}`, options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            

        })
        .catch(error => {
            console.error("Error al cargar el archivo:", error);
        });
}











