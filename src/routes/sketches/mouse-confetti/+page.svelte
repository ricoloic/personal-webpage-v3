<script>
    import P5 from 'p5-svelte';
    import {getContext, onMount} from "svelte";
    import SlidingPanel from "../../SlidingPanel.svelte";
    import Checkbox from "../../Checkbox.svelte";
    import Range from "../../Range.svelte";
    import COLOR_PALETTES from "$lib/colorPalettes.js";
    import Confetti from "./confetti.js";

    const editConfig = getContext('editConfig');

    let clientHeight;

    const args = {
        selectColorPalette: 'happy',
        velocity: 4,
        darkMode: true,
        fillConfetti: true,
        radius: 40,
        confettiAmount: 70,
    };

    let sketch;

    function handleCloseEdit() {
        editConfig.set({isEditing: false, view: true});
    }

    onMount(() => {
        editConfig.set({isEditing: false, view: true});

        /* @type {import(p5-svelte).Sketch} */
        sketch = (p5) => {
            const confettiList = [];

            p5.setup = () => {
                p5.createCanvas(window.innerWidth, clientHeight).parent('parent');
                p5.noFill();
            };

            p5.windowResized = () => {
                p5.resizeCanvas(p5.windowWidth, clientHeight);
            };

            p5.draw = () => {
                p5.background(args.darkMode ? 30 : 250);
                if (confettiList.length < args.confettiAmount) {
                    confettiList.push(new Confetti(
                        p5,
                        p5.mouseX,
                        p5.mouseY,
                        COLOR_PALETTES[args.selectColorPalette],
                        args.velocity
                    ));
                } else if (confettiList.length > args.confettiAmount) {
                    confettiList.splice(0, 1);
                }

                for (let i = 0; i < confettiList.length; i += 1) {
                    confettiList[i].animate(args.fillConfetti);
                    if (confettiList[i].life < 1) confettiList[i].reset(p5.mouseX, p5.mouseY, args.velocity);
                }

                if (args.fillConfetti) {
                    p5.fill(args.darkMode ? 250 : 30);
                    p5.circle(p5.mouseX, p5.mouseY, args.radius * 2);
                }
            };
        }
    });
</script>

<svelte:head>
    <title>Mouse Confetti</title>
    <meta name="description" content="Mouse Confetti entity"/>
</svelte:head>

<SlidingPanel gap="1em" width={400} onclose={handleCloseEdit} open={$editConfig.isEditing} side="right">
    <Checkbox title="Dark Mode" bind:value={args.darkMode}/>
    <Checkbox title="Fill Confetti" bind:value={args.fillConfetti}/>
    <Range title="Velocity" min={1} max={6} step={1} bind:value={args.velocity}/>
    <Range title="Confetti Amount" min={10} max={200} step={10} bind:value={args.confettiAmount}/>
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
