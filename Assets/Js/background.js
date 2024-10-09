const body = document.querySelector("body");
const canvas = document.getElementById("particles-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

this.color = 200;

window.addEventListener("mousemove", (e) => {
    canvas.style.background = `hsl(${this.color}, 100%, 4%)`;
    for (let i = 0; i < 10; i++) {
        particles.push(
            new Particle(
                e.x,
                e.y,
                Math.random() * 9 + 1,
                `hsl(${this.color}, 100%, 50%)`
            )
        );
    }
    this.color++;
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
            this.opacity = this.opacity - 0.2 * dt > 0 ? this.opacity - 0.2 * dt : 0;
            this.size = this.size * this.opacity;
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

let particles = [];
let color = 0;

//animation loop
let lt = 0;
function animate(ts) {
    const dt = (ts - lt) / 1000;
    particles = particles.filter((p) => p.delete === false);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update(dt);
        particles[i].draw(context);
    }
    lt = ts;
    requestAnimationFrame(animate);
}

window.onload = function() {
    animate(0);
}
