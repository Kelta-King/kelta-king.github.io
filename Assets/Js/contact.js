function updateErrorMessage(message) {
    var status = document.getElementById("contact-form-status");
    status.style.color = "#ff2e2e";
    status.innerHTML = message;
    document.querySelector(".contact-button p").innerText = "Send";
}

function updateSuccessMessage(message) {
    var status = document.getElementById("contact-form-status");
    status.style.color = "#31ff2e";
    status.innerHTML = message;
    document.querySelector(".contact-button").classList.add("clicked");
    document.querySelector(".contact-button p").innerText = "Sent!";
}

var form = document.getElementById("contact-form");

async function handleSubmit(event) {
    event.preventDefault();
    document.querySelector(".contact-button p").innerHTML = "<i class=\"fa fa-spinner fa-spin\"></i> Loading";
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            updateSuccessMessage("Thanks for your submission!");
            form.reset()
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    updateErrorMessage(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    updateErrorMessage("Oops! There was a problem submitting your form");
                }
            })
        }
    }).catch(error => {
        updateErrorMessage("Oops! There was a problem submitting your form");
    });
}
form.addEventListener("submit", handleSubmit)