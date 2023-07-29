<script>
    export let value;
    export let title;

    export let min;
    export let max;
    export let step;
</script>


<div>
    <label for="steps-range" class="block mb-2 text-sm font-medium text-white"><b>{value}</b> - {title}</label>
    <input id="steps-range" type="range" min={min} max={max} bind:value={value} step={step}
           class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
</div>

<style>
    label {
        margin: 0;
    }
</style>