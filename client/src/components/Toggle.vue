<template>
  <div class="toggle">
    <label class="switch">
      <input type="checkbox" v-model="checked">
      <span class="slider round"></span>
      
    </label>
    <span class=text>{{text}}</span>
  </div>
</template>





<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {sendPlayStopVid} from '@/lib/sender'


@Component
export default class VidController extends Vue {
  private pchecked =false
  toggle(){
    this.checked = !this.checked
  }
  @Prop({default:false})
  value!:boolean

  @Prop({default:""})
  text!:string
  mounted(){
    
    this.checked = !!this.value
  }
  set checked(v:boolean){
    
    this.pchecked = v;
    this.$emit('input',v)
    // sendPlayStopVid(this._isPlaying )

  }
  get checked(){return this.pchecked}

  

  
}


</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text{
  vertical-align:sub;
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
  background-color: #ccc;
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
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

</style>
