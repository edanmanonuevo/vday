window.onload = function () {
    const container = document.querySelector(".container");
    const envelope = document.querySelector(".envelope");

    if (container && envelope) {
        envelope.addEventListener("click", function () { // Changed from container to envelope
            envelope.classList.toggle("open");
        });
    } else {
        console.error("Elements not found! Check your HTML structure.");
    }
};
