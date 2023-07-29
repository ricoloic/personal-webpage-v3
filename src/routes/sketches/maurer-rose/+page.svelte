<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import Range from "../../Range.svelte";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        petalAmount: 2,
        degrees: 29,
        colorHighlight: true,
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
            let size = 0;
            const center = p5.createVector();

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight).parent('parent');
                const minSize = p5.width <= p5.height ? p5.width : p5.height;
                size = (minSize - minSize / 50) / 2;
                center.set(p5.width / 2, p5.height / 2);
                p5.angleMode(p5.DEGREES);
                p5.strokeWeight(2);
                p5.noFill();
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
                const minSize = p5.width <= p5.height ? p5.width : p5.height;
                size = (minSize - minSize / 50) / 2;
                center.set(p5.width / 2, p5.height / 2);
            };

            p5.draw = () => {
                p5.translate(center.x, center.y);
                p5.background(args.darkMode ? 30 : 250);
                p5.stroke(args.darkMode ? 250 : 30);
                p5.strokeWeight(1);

                p5.beginShape();
                for (let i = 0; i < 360; i += 1) {
                    const k = i * args.degrees;
                    const r = size * p5.sin(args.petalAmount * k);
                    const x = r * p5.cos(k);
                    const y = r * p5.sin(k);
                    p5.vertex(x, y);
                }
                p5.endShape(p5.CLOSE);

                if (args.colorHighlight) {
                    p5.stroke(p5.color('#CC0011'));
                    p5.strokeWeight(3);
                    p5.beginShape();
                    for (let i = 0; i < 360; i += 1) {
                        const r = size * p5.sin(args.petalAmount * i);
                        const x = r * p5.cos(i);
                        const y = r * p5.sin(i);
                        p5.vertex(x, y);
                    }
                    p5.endShape(p5.CLOSE);
                }
            };
        }
    });
</script>

<svelte:head>
    <title>Maurer Rose</title>
    <meta name="description" content="Maurer Rose"/>
</svelte:head>

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
    <Checkbox title="Color Highlight" bind:value={args.colorHighlight}/>
    <Range title="Petal Amount" min={3} max={30} step={1} bind:value={args.petalAmount}/>
    <Range title="Degrees" min={1} max={361} step={1} bind:value={args.degrees}/>
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
