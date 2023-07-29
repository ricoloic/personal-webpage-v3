<script>
    import IconButton from "./IconButton.svelte";
    import Icon from "@iconify/svelte";
    import Menu from "./Menu.svelte";
    import {getContext} from "svelte";

    const editConfig = getContext('editConfig')
    let openMenu = false;

    function handleOpenMenu() {
        openMenu = true;
    }

    function handleCloseMenu() {
        openMenu = false;
    }

    function handleOpenEdit() {
        editConfig.set({view: true, isEditing: true});
    }
</script>

<header>
    <Menu onclose={handleCloseMenu} open={openMenu}/>

    <IconButton on:click={handleOpenMenu}>
        <Icon icon="carbon:menu" width={40} height={40}/>
    </IconButton>

    <h2 id="title">
        Rico Generative Arts
    </h2>

    <div style="flex: 1;"></div>

    {#if $editConfig.view}
        <IconButton on:click={handleOpenEdit}>
            <Icon icon="carbon:edit" width={40} height={40}/>
        </IconButton>
    {/if}
</header>

<style lang="postcss">
    @media (width < 500px) {
        #title {
            display: none;
        }
    }

    header {
        position: sticky;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        gap: 20px;
        background-color: theme(colors.white);
        z-index: 999;
    }
</style>
