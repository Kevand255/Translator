import { dictionary } from "./dictionary.js";
const buttonTranslate = document.getElementById('buttonTranslate')

// funcionalidad para que se haga las traducciones 

buttonTranslate.addEventListener('click', ()=>{
    const wordToTranslate = document.getElementById('WordToTranslate').value 
    const example = document.getElementById('containerExample')
    const translate = document.getElementById('ContainerTranslate')
    const optionTranslate = document.getElementById('opcionIdioma').value
    if(!wordToTranslate){
        translate.innerText = 'ingrese una palabra para traducir plis';
    }
    if(optionTranslate.toLowerCase() === 'english'){
        Object.keys(dictionary.categories).forEach(item => {
            dictionary.categories[item].find(items => {
                if (items.spanish.toLowerCase() == wordToTranslate.trim().toLowerCase()) {
                    translate.innerText = items.english 
                    example.innerText = items.example
                }
            });
        });
    } else {
        Object.keys(dictionary.categories).forEach(item => {
            dictionary.categories[item].find(items => {
            if(items.english.toLowerCase() == wordToTranslate.trim().toLowerCase()){
                translate.innerText = items.spanish
                example.innerText = items.example
            }
            });
        });
    }
})