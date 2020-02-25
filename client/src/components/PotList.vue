<template>
  <div >
    <p class="switchText" > Scene actuelle : {{ activeBtn }} </p>
    <div class="potlist">

      <transition-group name="list-complete" tag="span">

        <button v-for="i of numPotList" :key="i" 
        type="button" 
        v-on:click="setActiveBtn(i)" 
        class='potElement'
        :class="{ active: activeBtn === i , inactive: activeBtn !== i }"
        :style="{background: `url('images/${i+1}.jpg')  no-repeat scroll 0 0 transparent`}"
        > 
        {{nameButton[i]}}
      </button>


    </transition-group>
  </div>
</div>
</template>





<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {sendStep} from '@/lib/sender'


@Component
export default class PotList extends Vue {

  @Prop({default:"pot"}) 
  private msg! : string;

  @Prop({default:5}) 
  private numPot!: number;

  get numPotList(){return [...Array(this.numPot).keys()]}
  
  private activeBtn=0;

  @Prop({default:
    ()=>{
      return ["animation1", "animation 2", "animation3", "animation4", "animation5"]
    }
  }) 
  private nameButton!: string []

  setActiveBtn (i: number){
    // console.log(i);
    this.activeBtn = i;
    sendStep(i)
  }
}


</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.potlist{
  display:flex;
  /*min-height:80%;*/
}
.potElement{
  min-height:300px;
  min-height:200px;
}
.inactive{
  position: relative;
  /*width: 320px ;
  height: 240px;*/
  margin-left: 10%;
  margin-right: 2%;
  margin-bottom: 2%;
  margin-top: 2%;
  color: #ffffff;
  font-size: 24px;
  border-radius: 12px;
  border: 2px solid #000000;
}

.inactive:hover{
  /* background: radial-gradient(circle, transparent 40%, black 125%),   url("images/bg.jpg"); */
  background-blend-mode: normal;
}


.active{
  filter: grayscale(100%);
  position: relative;
  /*width: 320px ;
  height: 240px;*/
  margin-left: 10%;
  margin-right: 2%;
  margin-bottom: 2%;
  margin-top: 2%;
  color: #969696;
  font-size: 24px;
  border-radius: 12px;
  border: 8px solid #4CAF50;
}


.active:focus{
  outline: 0px
}


.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  transition: all 1s;
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
