<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import Particle from "./particle.js";
    import COLOR_PALETTES from "$lib/colorPalettes.js";
    import Range from "../../Range.svelte";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        selectColorPalette: 'happy',
        latestMousePositions: [],
        averageMousePosition: null,
        lineAmount: 10,
        maxRadius: 70,
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
            let position;
            let xoff = 0;
            let yoff = 10000;

            const createParticle = () => {
                return new Particle(
                    p5,
                    p5.width / 2,
                    p5.height / 2,
                    p5.random(COLOR_PALETTES[args.selectColorPalette]),
                    args.maxRadius,
                    p5.random(0.02, 0.04),
                    p5.floor(p5.random(15, 40))
                );
            };

            const updateLatestMousePositions = () => {
                if (args.latestMousePositions.length > 17)
                    args.latestMousePositions.splice(0, 1);
                args.latestMousePositions.push(p5.createVector(p5.mouseX, p5.mouseY));
            };

            const updateAverageMousePosition = () => {
                const tempAvgMousePos = args.latestMousePositions.reduce(
                    (acc, curr) => p5.constructor.Vector.add(acc, curr),
                    p5.createVector(0, 0)
                );
                tempAvgMousePos.set(
                    p5.floor(tempAvgMousePos.x / args.latestMousePositions.length),
                    p5.floor(tempAvgMousePos.y / args.latestMousePositions.length)
                );
                args.averageMousePosition = tempAvgMousePos.copy();
            };

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight).parent('parent');

                position = p5.createVector();
                for (let i = 0; i < args.lineAmount; i += 1) {
                    particles.push(createParticle());
                }
                args.latestMousePositions = [];
                args.averageMousePosition = p5.createVector(0, 0);
                p5.noFill();
                p5.noiseDetail(2, 0.5);
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
            };

            p5.draw = () => {
                if (args.lineAmount > particles.length)
                    particles.push(createParticle());
                else if (args.lineAmount < particles.length)
                    particles.pop();

                if (p5.mouseIsPressed) {
                    updateLatestMousePositions();
                    updateAverageMousePosition();
                }

                position.set(
                    p5.map(p5.noise(xoff), 0, 1, args.maxRadius, p5.width - args.maxRadius),
                    p5.map(p5.noise(yoff), 0, 1, args.maxRadius, p5.height - args.maxRadius)
                );
                xoff += 0.01;
                yoff += 0.01;

                p5.background(args.darkMode ? 30 : 250);
                for (let i = 0; i < particles.length; i += 1) {
                    particles[i].animate(p5.mouseIsPressed ? args.averageMousePosition : position)
                }
            };
        };
    });
</script>

<svelte:head>
    <title>Circular Motion</title>
    <meta name="description" content="Circular Motion"/>
</svelte:head>

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
    <Range title="Maximum Radius" min={30} max={150} step={10} bind:value={args.maxRadius}/>
    <Range title="Line Amount" min={3} max={50} step={1} bind:value={args.lineAmount}/>
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
