<template>
    <div class="row">
        <div class="col-md-4">
            <img class="cart-photo" :src="item.image" alt="">
        </div>
        <div class="col-md-4 middle">
            <h3>{{item.name}}</h3>
            <div class="plus-minus" style="margin-bottom: 10px"><span v-on:click="minus" class="minus">-</span><span class="number">{{ num }}</span><span v-on:click="plus" class="plus">+</span></div>
        </div>
        <div class="col-md-4 right">
            <span @click="deleteData"><i class="fas fa-times"></i></span>
            <h4 style="margin-bottom: 15px;"> Rp. {{item.price}}</h4>
        </div>
    </div>
</template>

<script>
    export default {
        name : "item_in_cart",
        props: [ "item" ],
        data : function(){
            return{
                num : 1,
                id : this.item.id,
                params_checkout : {
                    id : 0,
                    num : 0,
                }
            }
        },
        methods :{
            minus(){
                this.num > 1 ? this.num-- : null
                this.params_checkout.id = this.id
                this.params_checkout.num = this.num
                this.$emit("item_num", this.params_checkout)
                //console.log(this.params_checkout.num)
            },
            plus(){
                this.num++
                this.params_checkout.id = this.id
                this.params_checkout.num = this.num
                // console.log(this.params_checkout.num)
                 this.$emit("item_num", this.params_checkout)
            },
            deleteData(){
                this.$emit("delete_id", this.id)
                
            }
        }
    }
</script>

<style scoped>
    .row{
        margin: 20px;
    }
    .cart-photo{
        width: 150px;
        height: 150px;
        border-radius: 20px;
    }
    span{
        font-size: 25px;
        padding: 8px;
        
    }
    .minus{
        padding-right: 15px;
        padding-left: 15px;
        border: 1px solid #82DE3A;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background: rgba(130, 222, 58, 0.2);
        color: #82DE3A;
        cursor: pointer;
    }
    .number{
        border-top:  1px solid #82DE3A;
        border-bottom:  1px solid #82DE3A;
        padding-right: 13px;
        padding-left: 13px;
        color: #82DE3A;
    }
    .plus{
        border:  1px solid #82DE3A;
        padding-right: 12px;
        padding-left: 12px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        background: rgba(130, 222, 58, 0.2);
        color: #82DE3A;
        cursor: pointer; 
    }
    
    .middle{
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    .right{
      display: flex;
      justify-content: space-between;
     flex-direction: column;
       
    }

    .fa-times{
         font-size: 25px;
         margin-left: 100px;
         margin-top: 10px;
         cursor: pointer;
    }
    .middle h3{
        margin-top: 5px; 
        font-size: 25px;
        text-align: left;
    }

</style>