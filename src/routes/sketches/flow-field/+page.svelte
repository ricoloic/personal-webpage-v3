<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import COLOR_OPTIONS from "./colorOptions.js";
    import Particle from "./particle.js";
    import Flow from "./flow.js";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        selectColor: 'light',
        particleAmount: 2000,
        scale: 10,
        increment: 0.1,
        lod: 10,
        fallOff: 0.6,
        displayFlow: false,
        darkMode: true,
    };

    let sketch;
    let resketch;

    $: {
        if (resketch)
            resketch(args)
    }

    function handleCloseEdit() {
        editConfig.set({isEditing: false, view: true});
    }

    onMount(() => {
        editConfig.set({isEditing: false, view: true});

        /* @type {import(p5-svelte).Sketch} */
        sketch = (p5) => {
            const particles = [];
            const flowField = [];
            let columns = 0;
            let rows = 0;
            let zoff = 0;

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight, p5.P2D).parent(
                    'parent'
                );

                p5.background(args.darkMode ? 30 : 250);
                p5.stroke(0, 2);
                p5.noiseDetail(args.lod, args.fallOff);

                columns = p5.floor(p5.width / args.scale);
                rows = p5.floor(p5.height / args.scale);

                for (let y = 0; y <= rows; y += 1) {
                    for (let x = 0; x <= columns; x += 1) {
                        flowField.push(new Flow(p5));
                    }
                }

                for (let i = 0; i < args.particleAmount; i += 1) {
                    particles.push(new Particle(p5));
                }
                p5.colorMode(p5.HSB);
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
                columns = p5.floor(p5.width / args.scale);
                rows = p5.floor(p5.height / args.scale);

                for (let y = 0; y <= rows; y += 1) {
                    for (let x = 0; x <= columns; x += 1) {
                        flowField.push(new Flow(p5));
                    }
                }
                p5.colorMode(p5.RGB);
                p5.background(args.darkMode ? 30 : 250);
                p5.colorMode(p5.HSB);
                for (let i = 0; i < particles.length; i += 1) {
                    particles[i].reset();
                }
            };

            resketch = () => {
                for (let i = 0; i < particles.length; i += 1) {
                    particles[i].reset();
                }
                p5.colorMode(p5.RGB);
                p5.background(args.darkMode ? 30 : 250);
                p5.noiseDetail(args.lod, args.fallOff);
                p5.colorMode(p5.HSB);
            };

            p5.draw = () => {
                if (args.displayFlow) {
                    p5.colorMode(p5.RGB);
                    p5.background(args.darkMode ? 30 : 250);
                }

                let yoff = 0;
                for (let y = 0; y <= rows; y += 1) {
                    let xoff = 0;
                    for (let x = 0; x <= columns; x += 1) {
                        const index = x + y * columns;
                        const flow = flowField[index];

                        if (!flow) return;
                        flow.update(xoff, yoff, zoff);
                        if (args.displayFlow) {
                            p5.stroke(args.darkMode ? 250 : 30);
                            p5.strokeWeight(2);
                            flow.show(args.scale, x, y);
                        }

                        xoff += args.increment;
                    }
                    yoff += args.increment;
                }
                zoff += 0.001;

                if (!args.displayFlow) {
                    const color = COLOR_OPTIONS[args.selectColor](p5.frameCount);
                    for (let i = 0; i < particles.length; i += 1) {
                        particles[i].update();
                        particles[i].wrapAround();
                        particles[i].follow(args.scale, columns, flowField);
                        particles[i].show(color);
                    }
                }
            };
        };
    });
</script>

<svelte:head>
    <title>Flow Field</title>
    <meta name="description" content="Flow Field"/>
</svelte:head>

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
    <Checkbox title="Display Flow" bind:value={args.displayFlow}/>
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
