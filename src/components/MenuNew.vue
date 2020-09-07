<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-fluid section">
                <nav class="col-fluid">
                    <Navbar v-on:dataSearch="searchMethod" class="navbar"></Navbar>
                </nav>
                <section class="col-fluid">
                    <div class=" row justify-content-end sort-space">
                        <div class="sort float-right">
                            <Sort v-on:child-select="selectMethod" />
                        </div>
                    </div>
                    <div class="col-fluid content d-flex align-content-start flex-wrap ">
                            <div v-for="item in data" :key="item.id">
                                <Card v-on:store_item="storeMethod" class="item" :item = "item" :removeData = "removeData" ></Card>
                            </div>     
                    </div>
                </section>
            </div>
            <aside class="col-fluid">
                <div class="col-fluid cart-header">
                    <h3 class="cart-title">Cart <span class="quantity-total">{{ cart_count_item }}</span></h3>
                </div>
                <div class="col-fluid cart-body">
                    <div class="cart-not-found">
                        <img src="https://i.ibb.co/n0rn3Lc/food-and-restaurant.png" alt="">
                    </div>
                    <div v-for="item in cart" :key="item.id" class="col-fluid">
                        <itemInCart v-on:delete_id="idDelete" :item = "item" class="item-cart"></itemInCart>
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
                cart : [], 
                removeData: {
                    dataId : '',
                    hiden : false
                },
                dataSearch : null
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
                //console.log(this.cart)
            },
            selectMethod(value){
                if(value == 'name'){
                    axios.get('http://localhost:3000/product/orderbyname')
                        .then((res) => {this.data = res.data })
                        .catch((err) => { console.log(err)})
                }else if (value == 'priceL'){
                    axios.get('http://localhost:3000/product/orderbyprice')
                        .then((res) => {this.data = res.data })
                        .catch((err) => { console.log(err)})
                }else if (value == 'category'){
                    axios.get('http://localhost:3000/product/orderbycategory')
                        .then((res) => {this.data = res.data })
                        .catch((err) => { console.log(err)})
                }else if (value == 'Newer'){
                    axios.get('http://localhost:3000/product/orderbynew')
                        .then((res) => {this.data = res.data })
                        .catch((err) => { console.log(err)})
                }else if (value == null){
                    axios.get('http://localhost:3000/product')
                        .then((res) => {this.data = res.data })
                        .catch((err) => { console.log(err)})
                }
            },
            searchMethod(value){
                axios.get(`http://localhost:3000/product/search?name=${value}`)
                        .then((res) => {this.data = res.data })
                        .catch((err) => { console.log(err)})
            },
            idDelete(value){
                let id = []
                this.cart.forEach(element => {
                    id.push(element.id)
                })
                let loc = id.indexOf(value)
                this.cart = this.cart.slice(0, loc).concat(this.cart.slice(loc + 1, this.cart.length))
                this.removeData.dataId = value
            }
        },
        watch: {
            removeData: function(val){
                console.log(val)
            }
        },
        computed: {
            cart_count_item: function(){
                return this.cart.length 
            }
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
        height: 60px;
    }
    .sort{
        width: 20%;
        padding-top: 30px;
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