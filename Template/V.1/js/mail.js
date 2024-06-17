//Luego hay que quitar el api key cuando este implementado en el PHP
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '31e014dbf2msh7dfbd3e9312cda5p158aadjsn49c0d74aef02',
        'X-RapidAPI-Host': 'virtual-number.p.rapidapi.com'
    }
};


fetch(`https://virtual-number.p.rapidapi.com/api/v1/e-sim/country-numbers?countryId=${countryId}`, options)
.then(response => response.json())

.catch(error => {
    console.error("Error al cargar el archivo:", error);
});



