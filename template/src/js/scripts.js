document.addEventListener("DOMContentLoaded", function () {
    const navButton = document.querySelector("#navbutton");
    const navbarNav = document.querySelector("#navbarNav2pattern nav");

    if (navButton && navbarNav) {
        navButton.addEventListener("click", function () {
            navButton.classList.toggle("collapsed");
            navbarNav.classList.toggle("collapse");
        });
    }
});

function adjustContainerSpacing() {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    const container = document.querySelector("#container");
    const adminBar = document.querySelector("#wpadminbar");

    let adminBarHeight = adminBar ? adminBar.offsetHeight : 0;
    let headerHeight = header ? header.offsetHeight : 0;
    let footerHeight = footer ? footer.offsetHeight : 0;

    if (container) {
        container.style.paddingTop = `${headerHeight}px`;
        container.style.minHeight = `calc(100vh - ${footerHeight + adminBarHeight}px)`;
    }
}

// Chama a função ao carregar a página
document.addEventListener("DOMContentLoaded", adjustContainerSpacing);

// Chama a função ao redimensionar a janela
window.addEventListener("resize", adjustContainerSpacing);
