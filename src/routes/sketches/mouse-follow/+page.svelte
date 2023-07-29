<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import {COLOR_PALETTES} from "$lib/colorPalettes.js";
    import Particle from "./particle";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        selectColorPalette: 'happy',
        particlesPerFrame: 10,
        showParticles: true,
        showBlob: true,
        particleBorder: false,
        particleAlfa: false,
        darkMode: true,
    };

    let sketch;


    onMount(() => {
        editConfig.set({isEditing: false, view: true});

        /* @type {import(p5-svelte).Sketch} */
        sketch = (p5) => {
            const particles = [];
            const center = {x: 0, y: 0};

            const generateDefault = () => {
                center.x = p5.width / 2;
                center.y = p5.height / 2;
            };

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight).parent('parent');
                generateDefault();
                p5.noStroke();
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
                generateDefault();
            };

            p5.draw = () => {
                p5.background(args.darkMode ? 30 : 250);
                p5.translate(center.x, center.y);

                for (let i = 0; i < args.particlesPerFrame; i += 1) {
                    const color = p5.random(COLOR_PALETTES[args.selectColorPalette]);
                    const particle = new Particle(p5, center, color);
                    particles.push(particle);
                }

                const avg = {x: 0, y: 0};
                for (let i = 0; i < particles.length; i += 1) {
                    particles[i].update();
                    if (args.showParticles)
                        particles[i].show(args.particleBorder, args.particleAlfa);
                    avg.x += particles[i].pos.x;
                    avg.y += particles[i].pos.y;
                    if (particles[i].finished()) particles.splice(i, 1);
                }
                avg.x /= particles.length;
                avg.y /= particles.length;

                if (args.showBlob) {
                    p5.fill(args.darkMode ? 250 : 30);
                    p5.circle(avg.x, avg.y, 50);
                }
            };
        };
    });
</script>

<svelte:head>
    <title>Mouse Follow</title>
    <meta name="description" content="Mouse Following entity"/>
</svelte:head>

<div bind:clientHeight={clientHeight} id="parent">
    <P5 {sketch} />
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
