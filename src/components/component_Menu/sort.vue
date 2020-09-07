<template>
  <div>
    <b-form-select  v-model="selected" :options="options" ></b-form-select>
    <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Sort by :' },
          { value: 'name', text: 'Name' },
          { value: 'priceH', text: 'Higher Price' },
          { value: 'priceL', text: 'Lower Price' },
          { value: 'category', text: 'Category' },
          { value: 'Newer', text: 'Newest' }
        ]
      }
    },
    watch: {
        selected: function(){
            this.$emit("child-select", this.selected);
        }
    }
    
  }
</script>