<script>
    var {text, color="bg-white", onClick} = $props()
</script>


<div class={"pr-10 pl-10 pb-2 pt-2 shadow-[4px_4px_0px_0px_#000] m-2 bg-white hover:bg-gray-300 border-2 cursor-pointer " +
"border-black rounded-2xl flex justify-start items-start " + color}>
    {text}
</div>