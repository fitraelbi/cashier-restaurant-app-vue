<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-fluid section">
                <nav class="col-fluid">
                    <Navbar class="navbar"></Navbar>
                </nav>
                <section class="col-fluid">
                    <div class=" row justify-content-end sort-space">
                        <div class="sort float-right">
                            <Sort />
                        </div>
                    </div>
                    <div class="col-fluid content d-flex align-content-start flex-wrap ">
                            <div v-for="item in data" :key="item.id">
                                <Card v-on:store_item="storeMethod" class="item" :item = "item" ></Card>
                            </div>     
                    </div>
                </section>
            </div>
            <aside class="col-fluid">
                <div class="col-fluid cart-header">
                    <h3 class="cart-title">Cart <span class="quantity-total">{{ quantityItem }}</span></h3>
                </div>
                <div class="col-fluid cart-body">
                    <div v-for="item in cart" :key="item.id" class="col-fluid">
                        <itemInCart :item = "item" class="item-cart"></itemInCart>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    import Navbar from './component_Menu/navbar.vue'
    import Sort from './component_Menu/sort.vue'
    import Card from './component_Menu/menu_card'
    import itemInCart from './component_Menu/item_in_cart'


    export default {
        name : "Menu",
        components : {
            Navbar,
            Sort,
            Card,
            itemInCart
        },
        data: function(){
            return{
                data: null,
                quantityItem : 0,
                cart : []
            }
        },
        methods: {
            storeMethod(value){
                if(this.cart.length == 0){
                    this.cart.push(value)
                }else{
                    let name = []
                    this.cart.forEach(element => {
                         name.push(element.name)
                     })
                    name.includes(value.name) == false ?  this.cart.push(value) : null
                }
                console.log(this.cart)
            },
        },
        
        mounted() {
        axios.get('http://localhost:3000/product')
            .then((res) => {
                this.data = res.data
                
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
</script>

<style scoped>
    .row{
        height: 100vh;
        width: 100%;
        margin-left: 0px;
    }
    .section{
        height: 100vh;
        width: 72%;
       
    }
    aside{
        width: 28%;
        margin-left: 0;
    }
    nav{
        width: 100%;
        height: 68px;
    }
    section{
        width: 100%;
        height: 100vh;
        background: rgba(190, 195, 202, 0.3);
        
    }
    .navbar{
        box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.25);
        height: 70px;
        margin-left: -20px;
        position: fixed;
        width: 139.7vh;
        margin-top: -5px;
        background: white;
        z-index: 5;
       
    }
    .sort-space{
        width: 100%;
    
        height: 110px;
    }
    .sort{
        width: 20%;
        padding-top: 10px;
        padding-right: 30px;
    }
    .content{
        margin-top: 0px;
        margin-left: 60px;
    }
    .item{
        margin : 20px;
        z-index: 1;
    }
    aside{
        width: 28%;
    }
    .cart-header{
        display: block;
        width: 100%;
        height: 65px;
        background: white;
        position: relative;
        box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.25);
        color: black;   
    }
    .cart-title{
        line-height: 60px;
    }
   
    .cart-body{
        width: 100%;
        height: 100vh;
    }
    .quantity-total{
        background: #5bc0de;
        padding-right: 5px;
        padding-left: 5px;
        border-radius: 15px;
    }
    .item-cart{
        height: 150px;
        margin-bottom: 20px;
    }
</style>