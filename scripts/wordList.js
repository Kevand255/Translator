    import { dictionary } from "./dictionary.js";
    const wordList = document.getElementById('wordList')
    const wordsOption = document.getElementById('wordsOption')
    const optionSort = document.getElementById('sort')
    // -----------------------------------------------------------------------
    const arrListES = []
    const arrListEN = []
    const words = []
    // -----------------------------------------------------------------------
    const buttonAdd = document.getElementById('buttonAdd')
// console.log(optionSort.value);

// se pasa la informacion del array dictionary a dos listas para 
// un manejo mas comodo en la funcionalidad de ordenar las palabras de la A-Z

// se manda esa informacion para que se almacene el localStorage y 
// se  guarden las nuevas palabras ingresadas aun despues y se puedan 
// ver las palabras aun despues de actulizar la pagina 
const localStorageYguardarPalabras = () => {
    const storedWordsEN = localStorage.getItem('arrListEN')
    const storedWordsES = localStorage.getItem('arrListES')

    if (storedWordsEN) {
        arrListEN.push(...JSON.parse(storedWordsEN))
    }else {
        Object.keys(dictionary.categories).forEach(item => {
            dictionary.categories[item].forEach(items => {
                words.push(items)
            });
        });

        for (let i = 0; i < words.length; i++) {
            arrListEN.push(`${words[i].english} --> ${words[i].spanish} (Example: ${words[i].example})`)
        }
    }
    
    if (storedWordsES) {
        arrListES.push(...JSON.parse(storedWordsES))
    }else {
        for (let i = 0; i < words.length; i++) {
            arrListES.push(`${words[i].spanish} --> ${words[i].english} (Ejemplo: ${words[i].example})`)
        }
    }


};
localStorageYguardarPalabras()

// funcion para cargar las palabras que se encuentran en el diccionario 
// y al mismo tiempo tiene la funcionalidad de  cargar las palabras en orden 
// alfabetico ascendente o descendente 
    function verLista(wordsOption) {
        wordList.innerHTML = ''
    
        if (wordsOption === 'english') {
            arrListEN.sort((a, b) => a.localeCompare(b))
            arrListEN.forEach(word => {
                const list = document.createElement('li')
                list.textContent = word
                wordList.appendChild(list)
            })
            if (optionSort.value === 'DESC') {
                wordList.innerHTML = ''

                arrListEN.sort((a,b) => b.localeCompare(a))
                arrListEN.forEach(word => {
                    const list = document.createElement('li')
                    list.textContent = word;
                    wordList.appendChild(list)
                })
            }
        } else if (wordsOption === 'spanish') {
            arrListES.sort((a, b) => a.localeCompare(b))
            arrListES.forEach(word => {
                const list = document.createElement('li')
                list.textContent = word
                wordList.appendChild(list)
            });
            if (optionSort.value === 'DESC') {
                wordList.innerHTML = ''
                arrListES.sort((a,b) => b.localeCompare(a))
                arrListES.forEach(word => {
                    const list = document.createElement('li')
                    list.textContent = word
                    wordList.appendChild(list)
                })
            }
        }
    }

    for (let i = 0; i < arrListES.length; i++) {
        arrListES[i]
        
    }

    // evento para que carguen las palabras 
    wordsOption.addEventListener('change', () => {
    verLista(wordsOption.value)
    })
    verLista('english') 

// evento para poder ver las palabras en orden alfabetico ya sea ASC o DESC
    optionSort.addEventListener('change', () => {
        verLista(wordsOption.value)
    })


    // evento y funcion para agergar una nueva palabra a la lista de palabras 
    // ya almacenadas en el dictionary y que se puedan ver de la misma forma que 
    // las demas, asi funcionando con un select para elegir que tipo de traduccion 
    // se hara EN -> ES o ES->EN
    buttonAdd.addEventListener('click', () => { 

        const wordAdd = document.getElementById('word').value
        const translationAdd = document.getElementById('translation').value
        const exampleAdd = document.getElementById('example').value
        const opcionLenguage = document.getElementById('lenguageOption').value
        const categoryAdd = document.getElementById('category').value
    
        if (opcionLenguage === 'enToEs') {
            arrListEN.push(`${wordAdd} --> ${translationAdd} (Example: ${exampleAdd})`)
        }else if (opcionLenguage === 'esToEn'){
            arrListES.push(`${wordAdd} --> ${translationAdd} (Ejemplo: ${exampleAdd})`)
        }
        localStorage.setItem('arrListEN', JSON.stringify(arrListEN))
        localStorage.setItem('arrListES', JSON.stringify(arrListES))
    verLista(wordsOption.value)
    })

