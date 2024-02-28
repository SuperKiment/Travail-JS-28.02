let numeroPage = 1
const pages = []
let forfaitSelectionne = 1
let nombreAnnonces = 1
let optionSelectionnee = 1

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

                if (boutonOK.id == "btEcran3") {
                    setupRecupEcran4()
                }
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

    //Les deux premières options
    for (let i = 0; i < options.length - 1; i++) {
        const optionSimple = options[i]

        optionSimple.addEventListener('click', () => {

            if (estSelectionne(optionSimple)) {
                optionSimple.style.backgroundColor = "white"
                optionSelectionnee = ""
            } else {
                optionSelectionnee = i + 1
                optionSimple.style.backgroundColor = "red"
                options[2].style.backgroundColor = "white"
            }

            if (estSelectionne(options[0]) && estSelectionne(options[1])) {
                options[0].style.backgroundColor = "white"
                options[1].style.backgroundColor = "white"
                options[2].style.backgroundColor = "red"
                optionSelectionnee = 3
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
            optionSelectionnee = 3
        }

        // console.log("Option : " + optionSelectionnee)

    })

    console.log(options)

}

function setupRecupEcran4() {
    const ecran = pages[3]
    const annonce = pages[0].querySelectorAll("div")[forfaitSelectionne].querySelector("tr")
    const recaps = ecran.querySelectorAll("div")

    recaps[0].innerHTML = ''
    recaps[0].append(annonce)

    recaps[1].querySelector("span").textContent = nombreAnnonces

    for (let i = 1; i <= 3; i++) {
        // console.log("recapOption" + i)
        ecran.querySelector("#recapOption" + i).style.display = 'none'
    }

    // console.log("option : "+"#recapOption" + (optionSelectionnee))
    const optionElement = ecran.querySelector("#recapOption" + (optionSelectionnee))
    optionElement.style.display = 'block'

    //Prix option
    const prixOptionTemp = optionElement.querySelector("span").textContent.split("€")[0].split(",")
    const prixOption = parseFloat(prixOptionTemp[0]) + parseFloat(prixOptionTemp[1]) / 100
    console.log(prixOption)

    //Spans
    const prixTotal = recaps[5].querySelector("#prixTotal")
    const finalQuantite = recaps[5].querySelector("#finalQuantite")
    const optionsRecap = recaps[5].querySelector("#optionsRecap")
    const dateValable = ecran.querySelector("#dateValable")

    //Prix Annonce
    const prixString = annonce.querySelector("td").textContent.split("€")[0].split(",")
    const vraiPrixAnnonce = parseFloat(prixString[0]) + parseFloat(prixString[1] / 100)

    //Date
    const date = new Date()
    const annonceTitre = annonce.querySelector("h3").textContent

    let anApres = parseInt(date.getFullYear())
    let moisApres = parseInt(date.getMonth());

    console.log(annonceTitre.split(" ")[1])

    if (annonceTitre.split(" ")[1] == "Mois") {
        moisApres += parseInt(annonceTitre.split(" ")[0])
        console.log("mois choisi")
        moisApres %= 13
        if (moisApres == 0) {
            moisApres++
            anApres++
        }
    } else {
        console.log("an choisi")
        anApres++
        
    }
    // const anApres;

    dateValable.textContent = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} au ${date.getDate()}/${moisApres}/${anApres} (${annonceTitre}).`


    //Calculs
    finalQuantite.textContent = nombreAnnonces
    prixTotal.textContent = nombreAnnonces * vraiPrixAnnonce + prixOption

    //Option tout en bas
    switch (optionSelectionnee) {
        case 1:
            optionsRecap.textContent = "Duplique"
            break;
        case 2:
            optionsRecap.textContent = "Auto 96H"
            break;
        case 3:
            optionsRecap.textContent = "Duplique, Auto 96H (Duo)"
            break;
    }


}

window.addEventListener("load", () => {
    console.log("début")

    trouverEcrans()

    setupBouttons()

    setupSelectionEcran1()

    setupAnnoncesEcran2()

    setupOptionsEcran3()

    // setupRecupEcran4()

    updatePages()
})