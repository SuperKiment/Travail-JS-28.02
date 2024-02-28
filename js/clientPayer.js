let numeroPage = 1
const pages = []

function updatePages() {
    for (let page of pages) {
        page.style.display = 'none'
    }

    pages[numeroPage - 1].style.display = 'block'
}

window.addEventListener("load", () => {
    console.log("début")

    let compteur = 1
    while (true) {
        const ecran = document.querySelector("#ecran" + compteur)

        if (ecran == null) break;

        console.log(ecran)
        pages.push(ecran)
        ecran.style.display = "none"

        compteur++
    }

    updatePages()
})