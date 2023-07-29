<script>
    import Tiles from "./Tiles.svelte";
    import Tile from "./Tile.svelte";
    import loicRico from '$lib/images/loic.webp';
    import besierCubicCurvePreview from '$lib/images/previews/besier-cubic-curve-preview.png';
    import besierQuadraticCurvePreview from '$lib/images/previews/besier-quadratic-curve-preview.png';
    import blackHolePreview from '$lib/images/previews/black-hole-preview.png';
    import caveGenerationPreview from '$lib/images/previews/cave-generation-preview.png';
    import chaosGamePreview from '$lib/images/previews/chaos-game-preview.png';
    import circularMotionPreview from '$lib/images/previews/circular-motion-preview.png';
    import flockingPreview from '$lib/images/previews/flocking-preview.png';
    import flowFieldPreview from '$lib/images/previews/flow-field-preview.png';
    import maurerRosePreview from '$lib/images/previews/maurer-rose-preview.png';
    import mouseConfettiPreview from '$lib/images/previews/mouse-confetti-preview.png';
    import mouseFollowPreview from '$lib/images/previews/mouse-follow-preview.png';
    import timesTablePreview from '$lib/images/previews/times-table-preview.png';
    import {getContext, onMount} from "svelte";

    const ageDifMs = Date.now() - new Date('2002-09-23').getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    const editConfig = getContext('editConfig');

    onMount(() => {
        editConfig.set({ view: false, isEditing: false });
    });
</script>

<svelte:head>
    <title>Rico Generative Arts</title>
    <meta name="description" content="Rico Generative Arts home page"/>
</svelte:head>

<section class="about-container">
    <div>
        <img width="500px" height="500px" src={loicRico} alt="Loïc Rico"/>
        <div class="top-content">
            <h1>
                <a href="https://github.com/ricoloic" target="_blank">Loïc Rico</a>
            </h1>
            <hr/>
            <div class="description">
                Hi, I'm Loïc Rico, a {age} years old canadian web developer. This page is a personal website of mine
                where I can display my creations. I'm currently working at
                <a href="https://www.ebay.com/" target="_blank">eBay</a> as a full-stack
                developer. I'm passionate about generative art and I love to learn new things.
            </div>
        </div>
        <div class="bottom-content">
            <h2>
                About this page
            </h2>
            <hr/>
            <div class="description">
                This page is a personal website of mine where I can display my creations. It was build with
                <a href="https://svelte.dev/" target="_blank">Svelte</a> and
                <a href="https://p5js.org/" target="_blank">p5js</a>.
                The source code is available on the
                <a href="https://github.com/ricoloic/personal-webpage-v2/" target="_blank">Github Repo</a>.
                I'm currently working on this page on my free time. If you would like to report a feature or a bug, feel
                free to leave an issue on the project repository. Before I decided to create this page, I was always
                finding my self searching for a particular project to show to someone. And more often than not I wasn't
                even able to start the project since the person I would be showing it to, were not setup to run it
                locally. So I decided to build this page to show my creations to people who are interested in my work. I
                hope you enjoy it.
            </div>
        </div>
    </div>
</section>

<section class="max-width-container">
    <Tiles>
        <Tile href="/sketches/cubic-besier-curve" imageUrl={besierCubicCurvePreview}>
            Cubic Besier Curve
        </Tile>
        <Tile href="/sketches/quadratic-besier-curve" imageUrl={besierQuadraticCurvePreview}>
            Quadratic Besier Curve
        </Tile>
        <Tile href="/sketches/black-hole" imageUrl={blackHolePreview}>
            Black Hole
        </Tile>
        <Tile href="/sketches/cave-generation" imageUrl={caveGenerationPreview}>
            Cave Generation
        </Tile>
        <Tile href="/sketches/chaos-game" imageUrl={chaosGamePreview}>
            Chaos Game
        </Tile>
        <Tile href="/sketches/circular-motion" imageUrl={circularMotionPreview}>
            Circular Motion
        </Tile>
        <Tile href="/sketches/flocking" imageUrl={flockingPreview}>
            Flocking
        </Tile>
        <Tile href="/sketches/flow-field" imageUrl={flowFieldPreview}>
            Flow Field
        </Tile>
        <Tile href="/sketches/maurer-rose" imageUrl={maurerRosePreview}>
            Maurer Rose
        </Tile>
        <Tile href="/sketches/mouse-confetti" imageUrl={mouseConfettiPreview}>
            Mouse Confetti
        </Tile>
        <Tile href="/sketches/mouse-follow" imageUrl={mouseFollowPreview}>
            Mouse Follow
        </Tile>
        <Tile href="/sketches/times-table" imageUrl={timesTablePreview}>
            Times Table
        </Tile>
    </Tiles>
</section>

<style lang="postcss">
    h1 {
        font-size: 4em;
    }

    h2 {
        font-size: 2em;
    }

    h1, h2 {
        margin: 0;
    }

    img {
        max-width: 500px;
        max-height: 500px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        user-select: none;
        border-radius: 50%;
        aspect-ratio: 1;
        margin: auto;
    }

    h1 > a:hover {
        font-weight: normal;
    }

    a {
        text-decoration-line: underline;
    }

    a:hover {
        font-weight: bold;
        text-decoration-style: double;
    }

    .about-container {
        padding: 50px;
        display: grid;
        grid-template-columns: 1fr min(1200px, 100%) 1fr;
        background-color: theme(colors.gray.800);
        color: theme(colors.white);
    }

    .about-container > div {
        padding-top: 50px;
        padding-bottom: 50px;
        margin: auto;
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 35px;
        grid-column: 2;
        align-items: center;
    }

    @media (min-width: 775px) {
        .about-container > div {
            grid-template-columns: 1fr 1fr 1fr;
        }

        .top-content {
            grid-column: span 2;
        }

        .bottom-content {
            grid-column: span 3;
        }
    }

    .description {
        margin-left: 20px;
        margin-top: 10px;
        line-height: 1.3;
    }
</style>
