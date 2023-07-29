<script>
    import SlidingPanel from "./SlidingPanel.svelte";
    export let open;
    export let onclose;
</script>

<SlidingPanel background="var(--color-gray-800)" gap="1em" onclose={onclose} side="left" width={400} open={open}>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li class="p-left"><a href="/">Cubic Besier Curve</a></li>
            <li class="p-left"><a href="/">Quadratic Besier Curve</a></li>
            <li class="p-left"><a href="/">Black Hole</a></li>
            <li class="p-left"><a href="/">Cave Generation</a></li>
            <li class="p-left"><a href="/">Chaos Game</a></li>
            <li class="p-left"><a href="/">Circular Motion</a></li>
            <li class="p-left"><a href="/">Flocking</a></li>
            <li class="p-left"><a href="/">Flow Field</a></li>
            <li class="p-left"><a href="/">Maurer Rose</a></li>
            <li class="p-left"><a href="/">Mouse Confetti</a></li>
            <li class="p-left"><a href="/sketches/mouse-follow">Mouse Follow</a></li>
            <li class="p-left"><a href="/">Times Table</a></li>
        </ul>
    </nav>
</SlidingPanel>

<style>
    ul {
        color: var(--color-white);
        list-style-type: none;
        line-height: 1;
        overflow-x: hidden;
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
        font-size: 1em;
    }

    li:hover {
        font-weight: 600;
        transform: scale(1.05) translateX(5px);
    }

    .p-left {
        padding-left: 15px;
    }
</style>