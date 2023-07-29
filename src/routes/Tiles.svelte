<div class="grid">
    <slot />
</div>

<style>
    .grid {
        padding: 50px;
        display: grid;
        gap: 30px;
        grid-template-columns: 1fr;
    }

    @media (min-width: 700px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (min-width: 1200px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media (min-width: 1500px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>