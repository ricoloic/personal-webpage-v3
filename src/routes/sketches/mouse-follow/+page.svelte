<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import {COLOR_PALETTES} from "$lib/colorPalettes.js";
    import Particle from "./particle";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import Range from "../../Range.svelte";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        selectColorPalette: 'happy',
        particleAmount: 80,
        showParticles: true,
        showBlob: true,
        particleBorder: false,
        particleAlfa: false,
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

                if (args.particleAmount > particles.length) {
                    particles.push(new Particle(p5, center, p5.random(COLOR_PALETTES[args.selectColorPalette])));
                } else if (args.particleAmount < particles.length) {
                    particles.splice(0, 1);
                }

                const avg = {x: 0, y: 0};
                for (let i = 0; i < particles.length; i += 1) {
                    particles[i].update();
                    if (args.showParticles)
                        particles[i].show(args.particleBorder, args.particleAlfa);
                    avg.x += particles[i].pos.x;
                    avg.y += particles[i].pos.y;
                    if (particles[i].finished()) particles[i].reset(center);
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

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
    <Checkbox title="Show Blob" bind:value={args.showBlob}/>
    <Checkbox title="Show Particle Alfa" bind:value={args.particleAlfa}/>
    <Checkbox title="Show Particle Border" bind:value={args.particleBorder}/>
    <Checkbox title="Show Particle" bind:value={args.showParticles}/>
    <Range title="Particle Amount" min={20} max={300} step={10} bind:value={args.particleAmount}/>
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
