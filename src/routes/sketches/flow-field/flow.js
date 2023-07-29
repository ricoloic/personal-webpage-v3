class Flow {
    constructor(p5) {
        this.p5 = p5;
        this.vec = p5.createVector(0, 0);
    }

    update(xoff, yoff, zoff) {
        const noiseAngle = this.p5.noise(xoff, yoff, zoff) * this.p5.TWO_PI;
        this.vec = this.p5.constructor.Vector.fromAngle(noiseAngle).setMag(50);
    }

    show(scale, x, y) {
        this.p5.push();
        this.p5.translate(x * scale, y * scale);
        this.p5.rotate(this.vec.heading());
        this.p5.line(0, 0, scale, 0);
        this.p5.pop();
    }
}

export default Flow;