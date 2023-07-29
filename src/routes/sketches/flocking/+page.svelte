<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import Boid from "./boid.js";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import Range from "../../Range.svelte";
    import Rectangle from "./quadtree/rectangle.js";
    import QuadTree from "./quadtree/quadtree.js";
    import Point from "./quadtree/point.js";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        alignmentForce: Boid.force.alignmentForce, // 0.5
        cohesionForce: Boid.force.cohesionForce, // 0.2
        separationForce: Boid.force.separationForce, // 4.3
        displayQuadTree: false,
        boidAmount: 250,
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
            const boids = [];
            let boundary = new Rectangle(0, 0, 0, 0);

            const generateInitialBoundary = () => {
                boundary = new Rectangle(
                    p5.width / 2,
                    p5.height / 2,
                    p5.width,
                    p5.height
                );
            };

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight).parent('parent');
                generateInitialBoundary();
                for (let i = 0; i < args.boidAmount; i += 1) boids.push(new Boid(p5));
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
                generateInitialBoundary();
            };

            p5.draw = () => {
                if (args.boidAmount > boids.length) {
                    boids.push(new Boid(p5));
                } else if (args.boidAmount < boids.length) {
                    boids.splice(0, 1);
                }

                p5.background(args.darkMode ? 30 : 250);

                const quadTree = new QuadTree(boundary, 4);
                for (let i = 0; i < boids.length; i += 1) {
                    const boid = boids[i];
                    quadTree.insert(new Point(boid.pos.x, boid.pos.y, boid));
                }
                if (args.displayQuadTree) quadTree.show(p5, args.darkMode);

                for (let i = 0; i < boids.length; i += 1) {
                    const boid = boids[i];
                    const range = new Rectangle(boid.pos.x, boid.pos.y, 50, 50);
                    const points = quadTree.query(range);

                    boid.flock(
                        args.darkMode,
                        points.map((point) => point.userData),
                        {
                            alignmentForce: args.alignmentForce,
                            cohesionForce: args.cohesionForce,
                            separationForce: args.separationForce,
                        }
                    );
                }
            };
        };
    });
</script>

<svelte:head>
    <title>Flocking</title>
    <meta name="description" content="Boid Flocking"/>
</svelte:head>

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
    <Checkbox title="Display Quadtree" bind:value={args.displayQuadTree}/>
    <Range title="Alignment Force" min={0.1} max={2} step={0.1} bind:value={args.alignmentForce}/>
    <Range title="Cohesion Force" min={0.1} max={1} step={0.1} bind:value={args.cohesionForce}/>
    <Range title="Separation Force" min={0.3} max={5} step={0.1} bind:value={args.separationForce}/>
    <Range title="Boid Amount" min={20} max={500} step={10} bind:value={args.boidAmount}/>
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
