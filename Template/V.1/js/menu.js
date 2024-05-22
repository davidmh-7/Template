const openMenu = document.getElementById('openMenu');
const menu = document.getElementById('menu');
const contenido = document.getElementById('contenido');
var contadorMenu = 2; 
function openMenuDesplegable() {
    if(contadorMenu%2==0){
        menu.style.display= "block";
        contenido.style.display= "none"; 
        contadorMenu++;
    }else{
        menu.style.display= "none";
        contenido.style.display= "block"; 
        contadorMenu++;
    }
}