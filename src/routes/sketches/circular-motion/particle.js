export class Particle {
    constructor(
        p5,
        x,
        y,
        color,
        maxRadius,
        vel = 0.03,
        trailLength = 20
    ) {
        this.p5 = p5;
        this.vel = vel;
        this.pos = p5.createVector(x, y);
        this.radians = this.p5.floor(this.p5.random(0, 100));
        this.color = color;
        this.alphaIntensity = this.p5.random(0.08, 0.1) && 0.5;
        this.trails = [];
        this.trailLength = trailLength;
        this.spacing = this.p5.floor(this.p5.random(45, maxRadius * 2));
    }

    showTrail() {
        this.p5.stroke(this.color.color);
        this.p5.strokeWeight(3);
        this.p5.beginShape();
        for (let i = this.trails.length - 1; i >= 0; i -= 1) {
            const trail = this.trails[i];
            this.p5.vertex(trail.x, trail.y);
        }
        this.p5.endShape();
    }

    updatePos(position) {
        this.radians += this.vel;

        const newXPosition = position.x + this.p5.cos(this.radians) * this.spacing;
        const newYPosition = position.y + this.p5.sin(this.radians) * this.spacing;

        this.pos.set(newXPosition, newYPosition);

        this.trails.push(this.pos.copy());
        if (this.trails.length > this.trailLength) this.trails.splice(0, 1);
    }

    show() {
        this.showTrail();
    }

    animate(position) {
        this.updatePos(position);
        this.show();
    }
}

export default Particle;
