<template>
  <div class="file-dialog">
  <md-dialog :md-active.sync="show_" :md-click-outside-to-close="false">
    <md-dialog-title>{{this.options.title || 'ImJoy File Dialog'}}</md-dialog-title>
    <md-dialog-content>
      <ul v-if="file_tree">
        <file-item :model="file_tree" :root="root" :selected="file_tree_selection" @load="loadFile" @select="fileTreeSelected">
        </file-item>
      </ul>
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="show_=false; resolve(file_tree_selection)">OK</md-button>
      <md-button class="md-primary" @click="show_=false; reject()">Cancel</md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>
<script>


export default {
  name: 'file-dialog',
  props: {
     listFiles: Function,
     mode: String,
   },
   data: function () {
     return {
       root: null,
       options: {},
       show_: false,
       file_tree_selection: null,
       file_tree: null,
       resolve: null,
       reject: null,
     }
   },
   mounted(){
     // this.file_tree = this.listFiles()
   },
   computed: {

   },
   methods: {
     fileTreeSelected(f){
       if(this.options.type == 'file' && f.target.type == 'dir')
       return
       this.file_tree_selection = f.path
       this.$forceUpdate()
     },
     loadFile(f){
       if(f.target.type != 'file'){
         if(f.path == this.root){
           f.path = f.path+'/../'
         }
         this.listFiles(f.path, this.options.type, this.options.recursive).then((tree)=>{
           this.root = tree.path
           this.file_tree = tree
           this.$forceUpdate()
         })
       }
       else{
         this.show_=false
         this.resolve(this.file_tree_selection)
       }
     },
     showDialog(options){
       this.show_ = true
       this.options = options
       this.options.title = this.options.title || 'ImJoy File Dialog'
       this.options.root = this.options.root|| '.'
       return new Promise((resolve, reject) => {
         this.resolve = resolve
         this.reject = reject
         this.root = this.options.root
         this.listFiles(options.root, options.type, options.recursive).then((tree)=>{
           this.root = tree.path
           this.file_tree = tree
           this.$forceUpdate()
         })
       })
     }
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.md-dialog {
  max-width: 1024px;
  min-width: 50%;
}

</style>
