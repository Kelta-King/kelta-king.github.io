// Particle Animation
const canvas = document.getElementById("particles-canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let color = 200;
let particles = [];

window.addEventListener("mousemove", (e) => {
    canvas.style.background = `hsl(${color}, 100%, 4%)`;
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(e.x, e.y, Math.random() * 9 + 1, `hsl(${color}, 100%, 50%)`));
    }
    color++;
});

class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * (Math.PI * 2);
        this.velocity = Math.random() * 150 + 50;
        this.size = size;
        this.color = color;
        this.delete = false;
        this.opacity = 1;
    }

    update(dt) {
        this.x += Math.cos(this.angle) * this.velocity * dt;
        this.y += Math.sin(this.angle) * this.velocity * dt;
        if (this.opacity > 0) {
            this.opacity = Math.max(0, this.opacity - 0.2 * dt);
            this.size *= this.opacity;
        } else {
            this.delete = true;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Animation Loop
let lastTime = 0;
function animate(ts) {
    const dt = (ts - lastTime) / 1000;
    particles = particles.filter(p => !p.delete);
    context.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update(dt);
        p.draw(context);
    });
    lastTime = ts;
    requestAnimationFrame(animate);
}
window.onload = function() {
    animate(0);
}

// Form Submission
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
            form.reset();
        } else {
            response.json().then(data => {
                if (data.errors) {
                    updateErrorMessage(data.errors.map(error => error.message).join(", "));
                } else {
                    updateErrorMessage("Oops! There was a problem submitting your form");
                }
            });
        }
    }).catch(() => {
        updateErrorMessage("Oops! There was a problem submitting your form");
    });
}

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

form.addEventListener("submit", handleSubmit);

// Sticky Navigation
window.onscroll = function() {
    if (window.scrollY >= window.innerHeight) {
        document.getElementById("navBar").classList.add("sticky");
    } else {
        document.getElementById("navBar").classList.remove("sticky");
    }
}

// Typing Effect
const textArray = ["Web Developer", "Software Developer", "Tutor...", "Software Architect"];
const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

let textArrayIndex = 0;
let charIndex = 0;

const erase = () => {
    if (charIndex > 0) {
        cursor.classList.remove('blink');
        typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 80);
    } else {
        cursor.classList.add('blink');
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        setTimeout(type, 1000);
    }
};

const type = () => {
    if (charIndex < textArray[textArrayIndex].length) {
        cursor.classList.remove('blink');
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 120);
    } else {
        cursor.classList.add('blink');
        setTimeout(erase, 1000);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    type();
});
