<script>
    import SlidingPanel from "./SlidingPanel.svelte";
    export let open;
    export let onclose;
</script>

<SlidingPanel gap="1em" onclose={onclose} side="left" width={400} open={open}>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li class="p-left"><a href="/sketches/cubic-besier-curve">Cubic Besier Curve</a></li>
            <li class="p-left"><a href="/sketches/quadratic-besier-curve">Quadratic Besier Curve</a></li>
            <li class="p-left"><a href="/sketches/black-hole">Black Hole</a></li>
            <li class="p-left"><a href="/sketches/cave-generation">Cave Generation</a></li>
            <li class="p-left"><a href="/sketches/chaos-game">Chaos Game</a></li>
            <li class="p-left"><a href="/sketches/circular-motion">Circular Motion</a></li>
            <li class="p-left"><a href="/sketches/flocking">Flocking</a></li>
            <li class="p-left"><a href="/sketches/flow-field">Flow Field</a></li>
            <li class="p-left"><a href="/sketches/maurer-rose">Maurer Rose</a></li>
            <li class="p-left"><a href="/sketches/mouse-confetti">Mouse Confetti</a></li>
            <li class="p-left"><a href="/sketches/mouse-follow">Mouse Follow</a></li>
            <li class="p-left"><a href="/sketches/times-table">Times Table</a></li>
        </ul>
    </nav>
</SlidingPanel>

<style lang="postcss">
    ul {
        color: theme(colors.white);
        list-style-type: none;
        line-height: 1;
        overflow-x: hidden;
        padding-left: 1em;
    }

    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;

        margin-top: 10px;
        margin-bottom: 10px;

        cursor: pointer;
        font-size: 1.5em;
    }

    li:hover {
        font-weight: 600;
        transform: scale(1.05) translateX(5px);
    }

    .p-left {
        padding-left: 15px;
    }
</style>