<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import MapGenerator from "./mapGenerator.js";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        randomFillPercent: 47,
        tileScale: 20,
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
            let mapGenerator;

            const generateDefault = () => {
                const w = p5.ceil(p5.width / args.tileScale - 1);
                const h = p5.ceil(p5.height / args.tileScale - 1);
                p5.background(args.darkMode ? 30 : 250);
                mapGenerator = new MapGenerator(p5, w, h, args.randomFillPercent);
                mapGenerator.show(args.darkMode, args.tileScale);
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
            };

            //     p5.draw = () => {};
        };
    });
</script>

<svelte:head>
    <title>Cave Generation</title>
    <meta name="description" content="Cave Generation"/>
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
