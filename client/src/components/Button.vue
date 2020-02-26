<template>
  <div class="toggle">
    <label class="switch">
      <input type="button" @click="sendEv">
      <span class="slider round"></span>
      
    </label>
    <span class=text>{{text}}</span>
  </div>
</template>





<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';



@Component
export default class Button extends Vue {
  sendEv(e:any){
    this.$emit('input',e)
    // this.$emit('click',e)
  }
  @Prop()
  value:any
  @Prop({default:""})
  text!:string

  
}


</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text{
  vertical-align:sub;
  color: white;
}
.switch {
  position: relative;
  /*left:50%;*/
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(226, 226, 226);
  border-color: black;
  border-width: 2px;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: rgb(253, 0, 0);
  -webkit-transition: .4s;
  transition: .4s;
}


input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}


/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
