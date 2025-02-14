window.onload = function () {
    const container = document.querySelector(".container");
    const envelope = document.querySelector(".envelope");
    const flap = document.querySelector(".flap");
    const passwordSquares = document.querySelectorAll(".password-square");
    const submitPasswordButton = document.getElementById("submit-password");
    const heartsContainer = document.querySelector(".hearts-container");
    const clickText = document.querySelector(".click-text");
    const letter = document.querySelector(".letter");
    const valentinesText = document.querySelector(".valentines-text");

    if (container && envelope && flap && passwordSquares.length === 4 && submitPasswordButton && heartsContainer && clickText && letter && valentinesText) {
        function checkPassword() {
            const password = Array.from(passwordSquares).map(input => input.value).join('');
            if (password === "1601") {
                document.querySelector(".password-container").style.display = "none";
                container.style.display = "block";
                valentinesText.style.display = "none"; // Remove the "Happy Valentine's Day" text
            } else {
                alert("Incorrect password. (Hint: our anniversary date)");
            }
        }

        submitPasswordButton.addEventListener("click", checkPassword);

        envelope.addEventListener("click", function () {
            if (envelope.classList.contains("open")) {
                letter.classList.remove("active"); // Remove the active class to reverse the letter animation
                setTimeout(() => {
                    flap.classList.remove("open"); // Close the flap after the letter animation
                    setTimeout(() => {
                        envelope.classList.remove("open");
                        container.classList.remove("open"); // Reverse the open class on the container
                        clickText.style.display = "block"; // Show the 'click to open' text
                        letter.classList.add("close"); // Add the close class to reset the letter size
                    }, 500); // Delay to match the transition timing of the flap
                }, 500); // Delay to match the transition timing of the letter
            } else {
                letter.classList.remove("close"); // Remove the close class
                envelope.classList.add("open");
                container.classList.add("open"); // Apply the open class to the container
                clickText.style.display = "none"; // Hide the 'click to open' text
                setTimeout(() => {
                    flap.classList.add("open"); // Open the flap
                    setTimeout(() => {
                        letter.classList.add("active"); // Add the active class to the letter
                    }, 500); // Delay to match the transition timing of the flap
                }, 500); // Delay to match the transition timing of the container
            }
        });

        // Move cursor to the next input box and handle backspace
        passwordSquares.forEach((input, index) => {
            input.addEventListener("input", function () {
                if (input.value.length === 1 && index < passwordSquares.length - 1) {
                    passwordSquares[index + 1].focus();
                }
            });

            input.addEventListener("keydown", function (e) {
                if (e.key === "Backspace" && input.value === "" && index > 0) {
                    passwordSquares[index - 1].focus();
                    passwordSquares[index - 1].value = ""; // Clear the previous box
                } else if (e.key === "Enter" && Array.from(passwordSquares).every(input => input.value.length === 1)) {
                    checkPassword(); // Trigger password check on Enter key
                }
            });
        });

        // Create floating hearts
        setInterval(createHeart, 300);

        function createHeart() {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 2 + 8 + "s"; // Slower animation duration
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 10000); // Match the animation duration
        }
    } else {
        console.error("Elements not found! Check your HTML structure.");
    }
};
