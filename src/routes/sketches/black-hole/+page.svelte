<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import Particle from "./particle.js";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        darkMode: true,
    };

    let sketch;

    function handleCloseEdit() {
        editConfig.set({isEditing: false, view: true});
    }

    onMount(() => {
        editConfig.set({isEditing: false, view: true});

        /* @type {import(p5-svelte).Sketch} */
        sketch = (p5) => {
            const particles = [];
            const center = { x: 0, y: 0 };
            const blackHole = p5.createVector(0, 0);

            const generateDefault = () => {
                center.x = p5.width / 2;
                center.y = p5.height / 2;
                blackHole.set(center.x, center.y);
                particles.splice(0, particles.length);
                const minR = p5.height / 3;
                for (let i = 0; i <= 5; i += 1) {
                    const a = p5.map(i, 0, 5, 0, p5.TWO_PI);
                    const x = p5.cos(a) * minR;
                    const y = p5.sin(a) * minR;
                    particles.push(
                        new Particle(p5, { x: x + center.x, y: y + center.y }, 10, 300)
                    );
                }
            };

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight).parent('parent');
                p5.ellipseMode(p5.CENTER);
                generateDefault();
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
                generateDefault();
            };

            p5.draw = () => {
                p5.background(args.darkMode ? 30 : 250);

                for (let i = 0; i < particles.length; i += 1) {
                    const force = p5.constructor.Vector.sub(blackHole, particles[i].pos)
                        .normalize()
                        .setMag(0.7);
                    particles[i].applyForce(force);
                    particles[i].update();
                    particles[i].show(args.darkMode);
                    particles[i].showTrail(args.darkMode, 10);
                    if (particles[i].lifeTime < 1) particles.splice(i, 1);
                }

                p5.fill(args.darkMode ? 250 : 30);
                p5.ellipse(center.x, center.y, 30);
            };

            p5.mousePressed = () => {
                particles.push(new Particle(p5, { x: p5.mouseX, y: p5.mouseY }, 10, 300));
            };
        };
    });
</script>

<svelte:head>
    <title>Black Hole</title>
    <meta name="description" content="Black Hole"/>
</svelte:head>

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
</SlidingPanel>

<div bind:clientHeight={clientHeight} id="parent">
    <P5 {sketch}/>
</div>

<style>
    #parent {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        position: relative;
        overflow: hidden;
        flex: 1;
    }
</style>
