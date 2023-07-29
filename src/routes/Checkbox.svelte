<script>
    export let value;
    export let title;
</script>

<label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" bind:checked={value} class="sr-only peer">
    <div class="w-11 h-6 peer-focus:outline-none rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"></div>
    <span class="ml-3 text-sm font-medium text-gray-white">{title}</span>
</label>