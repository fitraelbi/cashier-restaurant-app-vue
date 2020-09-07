<template>
    <div>
        <div class="row menu-bar" v-if="!isHidden">
            <img   class=".icon-sidebar" :src="require('@/img/open-menu.svg')" alt="">
            <h1>Food</h1>
            <img @click="isHidden = true" class=".icon-sidebar icon-search" :src="require('@/img/search.svg')" alt="">
        </div>
        <div class="row search-bar" v-if="isHidden">
            <div class="col-fluid icon-back">
                <img @click="isHidden = false" class=".icon-sidebar" :src="require('@/assets/arrow.svg')" alt="">
            </div>
            <div class="col-fluid search-input">
               <div class="md-form active-pink-2 mb-3">
                 <b-form-input v-model.lazy="text"  placeholder="Enter your name"></b-form-input>
            </div>
            </div>
            <div class="col-fluid icon-voice">
                <img  class=".icon-sidebar icon-search" :src="require('@/assets/radio.svg')" alt="">
            </div>
            
            
            
        </div>
    </div>
    
</template>

<script>
    let timeout = null

    export default {
        name: "Navbar", 
        data: function(){
            return{
                isHidden : true,
                text: '',
                delay : 2000,
                dataSearch: null
            }
        },
        methods: {
            getSearch(value){
                this.dataSearch = value
                this.$emit("dataSearch", this.dataSearch);
            }
        },
        watch:{
            text: function(val){
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    this.getSearch(val)
                }, 800);
            }
        }
    }
</script>

<style scoped>
img{
    width: 40x;
    height: 40px;
}

.row .menu-bar{
    width: 137vh;
    margin-left: 10px;
    text-align: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 35px;
    color: black;
    transition: 2s;
    cursor: pointer;
   
}

.row .search-bar{
    width: 137vh;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 35px;
    justify-content: space-between;
    transition: 0.5s;
    transition-property: initial;
    cursor: pointer;
}

.icon-back{
    margin-right: 30px;
    width: 10vh;
}
.icon-voice{
  
    width: 10vh;
}
.search-input{
    width: 81%;
    font-size: 250px;
    
}
.icon-sidebar{
    cursor: pointer;
}

.icon-sidebar:hover{
    filter: invert(45%) sepia(3%) saturate(34%) hue-rotate(41deg) brightness(93%) contrast(88%);
}

.active-pink-2 input{
    border: 0;
    font-size: 25px;
}

.active-pink-2 input.form-control[type=text]:focus:not([readonly]) {
  border-bottom: 0;
  box-shadow: 0 0px 0 0 #f48fb1;
}
</style>