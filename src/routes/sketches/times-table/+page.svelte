<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import Range from "../../Range.svelte";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        amountOfPoints: 200,
        multiplier: 2,
        transparency: 60,
        lineThickness: 2,
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
            let radius = 0;
            const center = p5.createVector();

            const calculatePositionFromIteration = (iteration) => {
                const angle = p5.map(iteration, 0, args.amountOfPoints, 0, p5.TWO_PI);
                const x = p5.cos(angle) * radius;
                const y = p5.sin(angle) * radius;
                return p5.createVector(x, y);
            };

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight).parent('parent');
                center.set(p5.width / 2, p5.height / 2);
                radius = p5.min(center.x, center.y) - 50;
                p5.strokeWeight(args.lineThickness);
                p5.frameRate(30);
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
                center.set(p5.width / 2, p5.height / 2);
                radius = p5.min(center.x, center.y) - 50;
            };

            p5.draw = () => {
                p5.background(args.darkMode ? 30 : 250);
                p5.translate(center.x, center.y);
                p5.strokeWeight(args.lineThickness);
                p5.stroke(
                    args.darkMode ? 250 : 30,
                    p5.map(args.transparency, 0, 100, 250, 0)
                );
                for (let i = 0; i < args.amountOfPoints; i += 1) {
                    const point1 = calculatePositionFromIteration(i);
                    const j = (i * args.multiplier) % args.amountOfPoints;
                    const point2 = calculatePositionFromIteration(j);

                    p5.line(point1.x, point1.y, point2.x, point2.y);
                }
            };
        };
    });
</script>

<svelte:head>
    <title>Times Table</title>
    <meta name="description" content="Times Table"/>
</svelte:head>

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
    <Range title="Amount of Point" min={100} max={1000} step={1} bind:value={args.amountOfPoints}/>
    <Range title="Transparency" min={1} max={100} step={1} bind:value={args.transparency}/>
    <Range title="Line Thickness" min={1} max={10} step={1} bind:value={args.lineThickness}/>
    <Range title="Multiplier" min={1} max={600} step={1} bind:value={args.multiplier}/>
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
