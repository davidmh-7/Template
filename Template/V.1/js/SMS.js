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

function SMSView(countryId, numeroTelefono) {
    fetch(`https://virtual-number.p.rapidapi.com/api/v1/e-sim/view-messages?countryId=${countryId}&number=${numeroTelefono}`, options)
        .then(response => response.json())
        .then(data => {
            const mensajesContainer = document.getElementById('mensajesContainer');
            document.getElementById('ultimoSMS').innerText = data[0].createdAt;
            mensajesContainer.innerHTML = ''; 
            data.slice(0, 10).forEach((mensaje, index) => {
                // Formatear el número de teléfono
                let numeroTel = mensaje.myNumber;
                
                let texto = mensaje.text;

                // Truncar el texto si contiene 'received'
                if (texto.includes('received')) {
                    let idx = texto.indexOf('received');
                    texto = texto.substring(0, idx).trim();
                }
                let formattedNumber = numeroTel.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
                let CopiarTelefono = countryId + " " + formattedNumber;
                document.getElementById('CopiarTelefono').innerText = CopiarTelefono 


             let CopiarTelefonoBoton = document.getElementById('CopiarTelefonoBoton')
                
             CopiarTelefonoBoton.style.display = 'block'
              

                // Crear el bloque de HTML para cada mensaje
                const mensajeHTML = `
                    <div class="flex flex-col p-4 space-y-2">
                        <!-- Añadir Interactivo -->
                        <div class="flex items-center justify-between mb-1">
                            <div class="flex items-center space-x-2">
                                <div class="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80" id="compania-${index}">
                                    ${mensaje.serviceName}
                                </div>
                            </div>
                            <div class="text-xs text-muted-foreground ml-2" id="ultimoSMS1-${index}">${mensaje.createdAt}</div>
                        </div>

                        <div class="flex items-center justify-between"> <!-- Contenedor flexible para alinear elementos a los lados -->
                        <span class="text-norm mr-2 ml-3" id="textMensaje-${index}">${texto}</span>
                        <button
                            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                            id="copiarCodigo-${index}"
                            style="display: block;" aria-label="copiarCodigo"
                        >
                            <svg data-testid="geist-icon" height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16" style="color: currentcolor;">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 0.5C1.7835 0.5 1 1.2835 1 2.25V9.75C1 10.7165 1.7835 11.5 2.75 11.5H3.75H4.5V10H3.75H2.75C2.61193 10 2.5 9.88807 2.5 9.75V2.25C2.5 2.11193 2.61193 2 2.75 2H8.25C8.38807 2 8.5 2.11193 8.5 2.25V3H10V2.25C10 1.2835 9.2165 0.5 8.25 0.5H2.75ZM7.75 4.5C6.7835 4.5 6 5.2835 6 6.25V13.75C6 14.7165 6.7835 15.5 7.75 15.5H13.25C14.2165 15.5 15 14.7165 15 13.75V6.25C15 5.2835 14.2165 4.5 13.25 4.5H7.75ZM7.5 6.25C7.5 6.11193 7.61193 6 7.75 6H13.25C13.3881 6 13.5 6.11193 13.5 6.25V13.75C13.5 13.8881 13.3881 14 13.25 14H7.75C7.61193 14 7.5 13.8881 7.5 13.75V6.25Z" fill="currentColor"></path>
                            </svg>
                        </button>
                    </div>
                    </div>
                `;

                // Añadir el bloque de HTML al contenedor
                mensajesContainer.insertAdjacentHTML('beforeend', mensajeHTML);

                // Añadir evento de clic para copiar texto al portapapeles
                document.getElementById(`copiarCodigo-${index}`).addEventListener('click', function() {
                    navigator.clipboard.writeText(CopiarTelefono).then(function() {
                        console.log('Texto copiado al portapapeles:', CopiarTelefono);
                    }).catch(function(error) {
                        console.error('Error al copiar el texto al portapapeles:', error);
                    });
                });
            });
            document.getElementById(`CopiarTelefonoBoton`).addEventListener('click', function() {
                var CopiarTelefonoTexto = document.getElementById('CopiarTelefono').innerText;
                navigator.clipboard.writeText(CopiarTelefonoTexto).then(function() {
                    console.log('Texto copiado al portapapeles:', CopiarTelefonoTexto);
                }).catch(function(error) {
                    console.error('Error al copiar el texto al portapapeles:', error);
                });
            });
            
        });
            
       
}
