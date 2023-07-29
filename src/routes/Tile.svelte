<script>
    export let imageUrl;
    export let href;
</script>

<a href={href} class="tile" style="background-image: url({imageUrl})">
    <p>
        <slot/>
    </p>
</a>

<style lang="postcss">
    .tile {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: 5px;
        min-height: 350px;
        color: theme(colors.black);
        padding: 15px;
        position: relative;
        font-size: 1.5rem;
        transition: all 0.15s ease-in-out;
    }

    .tile:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.75);
        transform: scale(0.95);
        transition: all 0.15s ease-in-out;
    }

    p {
        display: inline-block;
        margin: 0;
        padding: 5px 10px;
        background-color: theme(colors.gray.100);
    }
</style>