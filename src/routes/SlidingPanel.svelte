<script>
    import Icon from "@iconify/svelte";
    import IconButton from "./IconButton.svelte";
    export let open;
    export let side = "right";
    export let overflow = "hidden";
    export let width;
    export let gap;
    export let onclose;

    const right = side === 'right' ? 0 : undefined;
    const left = side === 'left' ? 0 : undefined;
    $: translate = side === 'left'
        ? open ? '0%' : '-100%'
        : open ? '0%' : '100%';
    $: shadow = open ? '0 0 10px 0 rgba(0, 0, 0, 0.75)' : undefined;
</script>

<div class="container"
     style="right: {right}; left: {left}; width: min(100%, {width}px); transform: translate({translate}); overflow: {overflow}; box-shadow: {shadow}">
    <div>
        <div class="close-icon-container">
            <IconButton on:click={onclose}>
                <Icon icon="carbon:close-outline" color="var(--color-white)" width={40} height={40} />
            </IconButton>
        </div>
        <div class="content" style="gap: {gap};">
            <slot />
        </div>
    </div>
</div>

<style lang="postcss">
    .container {
        position: fixed;
        top: 0;
        bottom: 0;
        transition: 0.3s ease-out;
        z-index: 999;
        background-color: theme(colors.gray.800);
    }

    .container > div {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: theme(colors.white);
    }

    .close-icon-container {
        padding-top: 4px;
        padding-bottom: 4px;
        padding-left: 4px;
    }

    .content {
        display: flex;
        flex-direction: column;
        padding: 20px;
    }
</style>
