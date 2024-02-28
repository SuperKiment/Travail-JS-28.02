let numeroPage = 1
const pages = []

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
                console.log("Boutton clicked :", nomBoutton)
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
                console.log("Boutton clicked :", nomBoutton)
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
    const forfaits = ecran.querySelectorAll("div")

    for (let forfait of forfaits) {
        forfait.addEventListener("click", () => {
            forfait.style.backgroundColor = "red"
        })
    }

    console.log(forfaits)

}


window.addEventListener("load", () => {
    console.log("début")

    trouverEcrans()

    setupBouttons()

    setupSelectionEcran1()

    updatePages()
})