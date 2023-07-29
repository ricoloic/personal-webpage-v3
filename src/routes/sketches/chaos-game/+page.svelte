<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import Range from "../../Range.svelte";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        amountOfPoints: 3,
        lerpAmount: 0.5,
        iteration: 100,
        darkMode: true,
    };

    let sketch;
    let resketch;

    $: {
        if (resketch) resketch(args);
    }

    function handleCloseEdit() {
        editConfig.set({isEditing: false, view: true});
    }

    onMount(() => {
        editConfig.set({isEditing: false, view: true});

        /* @type {import(p5-svelte).Sketch} */
        sketch = (p5) => {
            let size = 0;
            let maxSize = 0;
            let seedPoints = [];
            const center = p5.createVector();
            const currentPoint = p5.createVector();

            const pickSeedPoints = () => {
                const radius = maxSize / 2 - 10;

                const pointInCircle = (i) => {
                    const angle = (i * p5.TWO_PI) / args.amountOfPoints;
                    return p5.createVector(radius * p5.cos(angle), radius * p5.sin(angle));
                };

                const tempPoints = []
                for (let i = 0; i < args.amountOfPoints; i += 1) {
                    tempPoints.push(pointInCircle(i));
                }
                return tempPoints;
            };

            const generateDefault = () => {
                size = p5.width <= p5.height ? p5.width : p5.height;
                maxSize = size - size / 50;
                center.set(p5.width / 2, p5.height / 2);
                currentPoint.set(p5.random(size), p5.random(size));
                seedPoints = pickSeedPoints();
                p5.background(args.darkMode ? 30 : 250);
            };

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight).parent('parent');
                generateDefault();
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
                generateDefault();
            };

            resketch = () => {
                generateDefault();
            }

            p5.draw = () => {
                p5.translate(center.x, center.y);
                p5.stroke(args.darkMode ? 250 : 30);
                p5.strokeWeight(1);

                for (let i = 0; i < seedPoints.length; i += 1) {
                    p5.point(seedPoints[i].x, seedPoints[i].y);
                }

                for (let i = 0; i < args.iteration; i += 1) {
                    p5.point(currentPoint.x, currentPoint.y);
                    const next = p5.random(seedPoints);
                    currentPoint.set(
                        p5.lerp(next.x, currentPoint.x, args.lerpAmount),
                        p5.lerp(next.y, currentPoint.y, args.lerpAmount)
                    );
                }
            };
        };
    });
</script>

<svelte:head>
    <title>Chaos Game</title>
    <meta name="description" content="Chaos Game"/>
</svelte:head>

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
    <Range title="Amount of Points" min={3} max={15} step={1} bind:value={args.amountOfPoints}/>
    <Range title="Lerp Amount" min={0.025} max={0.975} step={0.005} bind:value={args.lerpAmount}/>
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
