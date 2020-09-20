<template>
    <div>
        <div class="row menu-bar">
            <div class="col-fluid icon" >
                <img class=".icon-sidebar" :src="require('@/img/open-menu.svg')" alt="">
            </div>
            <div  class="col-fluid title">
                <h1>History</h1>
            </div>
            
        </div>
      
    </div>
    
</template>

<script>

    export default {
        name: "Navbar", 
        data: function(){
            return{
                
            }
        },
        methods: {
            
        }
    }
    </script>

<style scoped>
img{
    width: 40x;
    height: 40px;
}

.row .menu-bar{
    width: 100%;
    margin-left: 10px;
    text-align: left;
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    color: black;
    transition: 2s;
    cursor: pointer;
   
}

.icon{
    width: 9.7vh;
    padding-top: 4px;
    padding-left: 40px;
   
}

.title{
    margin-top: -40px;
    text-align: center;
    width: 95%;
    margin-left: 100px;
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