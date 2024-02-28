let numeroPage = 3
const pages = []
let forfaitSelectionne = -1
let nombreAnnonces = 0
let optionSelectionnee = ""

function updatePages() {
    for (let page of pages) {
        page.style.display = 'none'
    }

    pages[numeroPage - 1].style.display = 'block'
}

function setupBouttons() {
    for (let i = 1; i <= pages.length; i++) {
        const nomBoutton = "#btEcran" + i
        const boutonOK = document.querySelector(nomBoutton)

        if (boutonOK != null) {
            boutonOK.addEventListener("click", () => {
                // console.log("Boutton clicked :", nomBoutton)
                numeroPage++;
                updatePages()
            })
        }
    }

    for (let i = 1; i <= pages.length; i++) {
        const nomBoutton = "#btRetour" + i
        const boutonOK = document.querySelector(nomBoutton)

        if (boutonOK != null) {
            boutonOK.addEventListener("click", () => {
                // console.log("Boutton clicked :", nomBoutton)
                numeroPage--;
                updatePages()
            })
        }
    }
}

function trouverEcrans() {
    let compteur = 1
    let limite = 50 //On sait jamais

    while (compteur < limite) {
        const ecran = document.querySelector("#ecran" + compteur)

        if (ecran == null) break;

        console.log(ecran)
        pages.push(ecran)
        ecran.style.display = "none"

        compteur++
    }
}

function setupSelectionEcran1() {
    const ecran = pages[0]
    const bouttonOk = ecran.querySelector("button")
    const forfaits = ecran.querySelectorAll("div")

    bouttonOk.disabled = true

    for (let i = 0; i < forfaits.length; i++) {

        const forfait = forfaits[i]

        forfait.addEventListener("click", () => {
            for (let forfTemp of forfaits) forfTemp.style.backgroundColor = "white"

            if (i != forfaitSelectionne) {
                forfait.style.backgroundColor = "red"
                forfaitSelectionne = i
            } else {
                forfaitSelectionne = -1
            }

            if (forfaitSelectionne >= 0)
                bouttonOk.disabled = false
            else bouttonOk.disabled = true
        })
    }

    // console.log(forfaits)

}

function setupAnnoncesEcran2() {
    const ecran = pages[1]
    const inputNb = ecran.querySelector('#inputNb')
    const bouttonOk = ecran.querySelector('#btEcran2')

    bouttonOk.disabled = true

    inputNb.addEventListener('change', () => bouttonOk.disabled = !parseInt(nombreAnnonces = (inputNb.value >= 0 ? inputNb.value : 0)) > 0) //EN UNE SEULE LIGNE B)

    // console.log(inputNb)

}



function setupOptionsEcran3() {

    const estSelectionne = (option) => {
        return option.style.backgroundColor == "red"
    }

    const ecran = pages[2]
    const options = ecran.querySelectorAll('div')

    const nomsOptions = ["Duplique", "Auto"]

    //Les deux premières options
    for (let i = 0; i < options.length - 1; i++) {
        const optionSimple = options[i]

        optionSimple.addEventListener('click', () => {

            if (estSelectionne(optionSimple)) {
                optionSimple.style.backgroundColor = "white"
                optionSelectionnee = ""
            } else {
                optionSelectionnee = nomsOptions[i]
                optionSimple.style.backgroundColor = "red"
                options[2].style.backgroundColor = "white"
            }

            if (estSelectionne(options[0]) && estSelectionne(options[1])) {
                options[0].style.backgroundColor = "white"
                options[1].style.backgroundColor = "white"
                options[2].style.backgroundColor = "red"
                optionSelectionnee = "Duo"
            }

            // console.log("Option : " + optionSelectionnee)
        })
    }

    //La dernière option
    options[2].addEventListener("click", () => {

        if (estSelectionne(options[2])) {
            options[2].style.backgroundColor = "white"
            optionSelectionnee = ""
        } else {
            options[2].style.backgroundColor = "red"
            options[0].style.backgroundColor = "white"
            options[1].style.backgroundColor = "white"
            optionSelectionnee = "Duo"
        }

        // console.log("Option : " + optionSelectionnee)

    })

    console.log(options)

}

window.addEventListener("load", () => {
    console.log("début")

    trouverEcrans()

    setupBouttons()

    setupSelectionEcran1()

    setupAnnoncesEcran2()

    setupOptionsEcran3()

    updatePages()
})