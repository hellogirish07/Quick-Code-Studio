document.addEventListener("DOMContentLoaded", function () {
    const settingsBtn = document.querySelector(".sattings-btn");
    const headingBox = document.querySelector(".heading-box");
    const menuButton = document.createElement("button");

    menuButton.innerHTML = "<i class='fas fa-bars'></i>";
    menuButton.classList.add("menu-btn");
    headingBox.appendChild(menuButton);

    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            settingsBtn.style.display = "none";
            menuButton.style.display = "block";
        } else {
            settingsBtn.style.display = "flex";
            menuButton.style.display = "none";
        }
    }

    menuButton.addEventListener("click", function () {
        if (settingsBtn.style.display === "none" || settingsBtn.style.display === "") {
            settingsBtn.style.display = "flex";
            headingBox.insertAdjacentElement("afterend", settingsBtn);
            menuButton.innerHTML = "<i class='fas fa-times'></i>"; // Close icon
        } else {
            settingsBtn.style.display = "none";
            menuButton.innerHTML = "<i class='fas fa-bars'></i>"; // Menu icon
        }
    });

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
});


document.addEventListener("DOMContentLoaded", function () {
    const fullScreenBtn = document.querySelector(".run-code.output");

    function updateButtonText() {
        if (window.innerWidth <= 768) {
            fullScreenBtn.innerHTML = "<i class='fas fa-play'></i> Run Code";
        } else {
            fullScreenBtn.innerHTML = "<i class='fas fa-expand'></i> Full Screen";
        }
    }

    updateButtonText();
    window.addEventListener("resize", updateButtonText);
});

