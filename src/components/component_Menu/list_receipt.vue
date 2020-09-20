<template>
    <div class="">
        <div style="font-size: 18px;"><span style="padding-right: 20px;" >{{ item.name }}</span><span>x {{ item.num }}</span> <span class="float-right">Rp. {{ item_total }}</span></div>
    </div>
</template>

<script>
    export default {
        name: "list_receipt",
        props:["item"],
        data: function(){
            return{
                item_total : this.item.num*parseInt(this.item.price)
            }
        }
    }
</script>

<style scoped>

</style>