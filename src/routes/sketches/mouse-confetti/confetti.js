class Confetti {
    constructor(
        p5,
        x,
        y,
        colors,
        magnitude,
        radius = 40,
        life = p5.floor(p5.random(40, 95))
    ) {
        this.p5 = p5;
        this.pos = p5.createVector(x, y);
        this.vel = p5
            .createVector(p5.random(-1, 1), p5.random(-1, 1))
            .setMag(magnitude);
        this.radius = radius;
        this.color = p5.random(colors);
        this.maxLife = life;
        this.life = life;
    }

    reset(x, y, velocity) {
        this.pos.set(x, y);
        this.vel.setMag(velocity)
        this.life = this.maxLife;
    }

    updateLife() {
        this.life -= 1;
    }

    updatePos() {
        this.pos.add(this.vel);
    }

    show(fill) {
        const r = this.p5.map(this.life, 0, this.maxLife, 0, this.radius);

        if (fill) {
            this.p5.noStroke();
            this.p5.fill(this.color.color);
        } else {
            this.p5.noFill();
            this.p5.stroke(this.color.color);
            this.p5.strokeWeight(2);
        }
        this.p5.circle(this.pos.x, this.pos.y, r * 2);
    }

    animate(fill) {
        this.updateLife();
        this.updatePos();
        this.show(fill);
    }
}

export default Confetti;
