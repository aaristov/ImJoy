<template>
<div class="joy">
    <div class="joy-container" v-show="show">
        <div class="joy-editor" ref="editor"></div>
      </div>
    </div>
</template>

<script>
import {Joy} from '../joy'
export default {
  name: 'joy',
  props: {
    show: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    config: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      joy: null,
      isRunning: false,
    }
  },
  created(){
    this.router = this.$root.$data.router
    this.store = this.$root.$data.store
    this.api = this.$root.$data.store.api
  },
  mounted() {
    setTimeout(this.setupJoy, 500)
  },
  watch: {
    config: (newVal, oldVal) => { // watch it
      this.setupJoy&&this.setupJoy()
    }
  },
  methods: {
    editSource(){
      this.$emit('edit', this.config)
    },
    setupJoy(reset) {
      if(!reset && this.joy){
        this.config.data = this.joy.top.data
      }
      this.$refs.editor.innerHTML = ''
      const joy_config = {
        // Where the Joy editor goes:
        container: this.$refs.editor,

        // The words & ops inside the editor:
        init: this.config.ui || '', //"{id:'localizationWorkflow', type:'ops'} " + // a list of ops
        //"<hr> {type:'save'}", // a save button!

        // Load data from URL, otherwise blank:
        data: this.config.data || Joy.loadFromURL(),

        // Other ops to include, beyond turtle ops:
        modules: this.config.modules || ["instructions", "math"],

        onexecute: this.config.onexecute,
        // What to do when the user makes a change:
        onupdate: this.config.onupdate,

      }
      // console.log('setting up joy ', this.config)
      try {
        this.joy = new Joy(joy_config)
      } catch (e) {
        joy_config.data = ''
        this.joy = new Joy(joy_config)
      }
      this.config.joy = this.joy
    },
    runJoy() {
      this.$emit('run', this.joy)
    },
    stopJoy() {
      this.$emit('stop')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.joy-container {
  text-decoration: none;
  margin: 0;
  font-family: Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
}

.joy-editor {
  width: 100%;
  height: 100%;
  float: left;
  /* background: #eee; */
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 1.2em;
  font-weight: 100;
}
.joy-run-button{
  width: 60%;
  text-transform: none;
  font-size: 1.2em;
}

/*
More prefixing to avoid NAME COLLISIONS
*/

.joy-master, .joy-ops, .joy-button, .joy-scrubber, .joy-modal-chooser{
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	cursor:default;
}

.joy-master{
	display: block;
  margin: 0.3em;
  margin-bottom: 1.2em;
}

/***************/
/* ACTIONS *****/
/***************/

.joy-ops{
	margin-top: 0.5em;
	margin-bottom: 0.5em;
	position: relative;
}

.joy-ops #joy-list{}

/* Entry */
.joy-ops #joy-list > div{

	overflow: hidden;

	/* Thank you https://css-tricks.com/using-flexbox/ */
	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;

}
.joy-ops #joy-list > div #joy-bullet-container{
	/*float: left;*/
	-webkit-box-flex: 1;
	-moz-box-flex: 1;
	width: 1.5em;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: left;
}
.joy-ops #joy-list > div #joy-widget{
	/*float: right;*/
	width: calc(100% - 2em);
	margin-bottom: 0.3em;
}

/***************/
/* SAVE ********/
/***************/

.joy-save{
	position: relative;
}
.joy-save input{
	display: block;
    width: calc(100% - 60px);
    position: absolute;
    top: 0px;
    left: 62px;
}
.joy-save #joy-save-info{
	position: relative;
	top: 10px;
    bottom: 0px;
    left: 10px;
    font-size: 12px;
    line-height: 1em;
}

/***************/
/* BUTTON ******/
/***************/

.joy-button{

	display: inline-block;

	line-height: 1.3em;
	padding: 0 0.3em;

	border-radius: 5px;
	border: 2px solid #ccc;

	cursor: pointer;

}

.joy-button.joy-bullet{

	border-radius: 1000px; /* infinite roundness */
	width: 1.5em;
    height: 1.5em;
    padding: 0;
	text-align: center;

	background: none;
	border: 1px solid #bebebe;
	color: #b7b7b7;
}
.joy-button.joy-bullet:hover{
	background: #fff;
	color: #333;
}

.joy-button.joy-color{
	border-radius: 1000px; /* infinite roundness */
	width: 1.5em;
    height: 1.5em;
    padding: 0;
    border-color: rgba(0,0,0,0.1);
}

.joy-button.joy-more{
	border: none;
    width: 13px;
    height: 1em;
    padding: 0;
    position: relative;
    top: 0.1em;
}
/* from: https://css-tricks.com/three-line-menu-navicon/ */
.joy-button.joy-more:before{
    content: "";
    position: absolute;
    right: 3px;
    top: 0.24em;
    width: 4px;
    height: 4px;
    background: #bebebe;
    border-radius: 4px;
    box-shadow: 0 6px 0 0 #bebebe, 0 12px 0 0 #bebebe;
}
.joy-button.joy-math{
	border: none;
    line-height: 1em;
    padding: 0;
    margin: 0 0.1em;
    border-radius: 1000px; /* infinite roundness */
    width: 1em;
    text-align: center;
}
.joy-button.joy-math:hover{
	background: rgba(0,0,0,0.1);
}

/***************/
/* TEXTBOX *****/
/***************/

.joy-textbox{
	height: 20px;
	font-size: 0.9em;
	border-radius: 5px;
	border: 1px solid rgba(0,0,0,0.2);
	width: 100%;
}
.joy-textbox.box{
    font-family: inherit;
    padding: 0.3em 0.4em;
    display: block;
    background: #dde2f3;
    color: #2427de;
    font-size: 0.9em;
}
textarea.joy-textbox{
	resize: none;
}

/***************/
/* SCRUBBER ****/
/***************/

.joy-number > span{
	/* prevent number & chooser separating on newline */
	display: inline-block;
}

.joy-scrubber{
	position: relative;
    display: inline;
    cursor: col-resize;
    min-width: 0.8em;
    text-align: center;

    padding-bottom: 0px;
    border-bottom: 2px solid #bbb;
}
/*
.joy-scrubber:after{
	content: '';
	display: block;
	border-bottom: #aaa 4px dotted;
	width: 100%;
	position: relative;
	top:-0.3em;
}*/
.joy-scrubber:before{
	content: '↔';
	opacity:0;
	position: absolute;
    font-size: 0.6em;
    color: inherit;
    width: 90%;
    height: 0px;
    text-align: center;
    top: -1.5em;
    /*top: -1em;*/
}
.joy-scrubber:hover:before{
	opacity:1;
}

/***************/
/* STRING *****/
/***************/

.joy-string{
	position: relative;
    display: inline;
    padding-bottom: 0px;
    border-bottom: 2px solid #bbb;
	cursor: text;
}
.joy-string:focus{
    outline: none;
}


/*****************/
/* CHOOSER MODAL */
/*****************/

#joy-modal{
	display: none;
	position: fixed;
	top:0; left:0;
	z-index: 99999; /* the most elegant css */
	width: 100%;
	height: 100%;
}

#joy-modal #joy-bg{
	position: absolute;
	width: 100%;
	height: 100%;
}

#joy-modal #joy-box{

	position: absolute;

	font-size: 1em;
	line-height: 1.3em;
	color: #000;

	padding: 0.2em 0;
	border-radius: 0.5em;

	min-width: 50px;
	max-width: 400px;

}

/* CHOOSER */

/* list of categories */
.joy-modal-chooser > div{
	overflow: hidden;
}
/* category */
.joy-modal-chooser > div > div{
	overflow: hidden;
	margin: 0.2em 0;
}
.joy-modal-chooser > div > div:nth-last-child(n+2){
	border-bottom: 1px solid #ccc;
	padding-bottom: 0.4em;
    margin-bottom: 0.4em;
}
/* category entry */
.joy-modal-chooser > div > div > div{
	display: block;
	cursor: pointer;
	padding: 0 0.65em;
}
.joy-modal-chooser > div > div > div:hover{
	background: #e6e6e6;
}
.joy-modal-chooser > div > div.single-column > div{
	display: block;
	padding: 0 0.5em;
}

/* COLOR */

.joy-modal-color{
    /*margin: 5px;*/
    position: relative;
}
.joy-modal-color > canvas{
	position: absolute;
}

/* Sweet arrow boxes, thx to http://www.cssarrowplease.com/ */

.arrow_box{
	position: relative;
	background: #ffffff;
	border: 2px solid #ccc;
}
.arrow_box:after, .arrow_box:before {


	border: solid transparent;
	content: " ";
	height: 0;
	width: 0;
	position: absolute;
	pointer-events: none;
}
.arrow_box:after {
	border-color: rgba(255, 255, 255, 0);
	border-width: 14px;

}
.arrow_box:before {
	border-color: rgba(221, 221, 221, 0);
	border-width: 17px;
}

/* Below */
.arrow_box[position=below]:after, .arrow_box[position=below]:before {
	bottom: 100%;
	left: 50%;
}
.arrow_box[position=below]:after {
	border-bottom-color: #ffffff;
	margin-left: -14px;
}
.arrow_box[position=below]:before {
	border-bottom-color: #ccc;
	margin-left: -17px;
}

/* Left */
.arrow_box[position=left]:after, .arrow_box[position=left]:before {
	left: 100%;
	top: 50%;
}
.arrow_box[position=left]:after {
	border-left-color: #ffffff;
	margin-top: -14px;
}
.arrow_box[position=left]:before {
	border-left-color: #ccc;
	margin-top: -17px;
}


</style>
