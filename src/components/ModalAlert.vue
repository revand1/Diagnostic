<template>
  
</template>
<script>

export default {
    name: "modalalert",
    props:{
        title: {
      type: String,
      default: "success",
    },
    message: {
      type: String,
      default: "success",
    },
    },
    methods: {
        OnYes(){
            this.$emit("OnYes")
        }
    },
}
</script>
<style lang="">
    
</style>