<template>
  <div class="codemirror-div">
    <textarea v-model="value" style="width:200px"
              id="sqlDom" cols="30" rows="10"></textarea>
    <el-button @click="getEditorInfo" type="primary">执行</el-button>
  </div>
</template>
<script>
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";

let CodeMirror = require("codemirror/lib/codemirror");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/selection/active-line");
require("codemirror/mode/sql/sql");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/sql-hint");
export default {
  mounted() {
    this.initEditor()
  },
  data() {
    return {
      value: '',
      editor: null
    }
  },
  methods: {
    initEditor() {
      let editorDom = document.querySelector('#sqlDom');
      this.editor = CodeMirror.fromTextArea(editorDom, {
        mode: 'text/x-sql',//选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        indentWithTabs: false, //在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false
        smartIndent: true,//自动缩进，设置是否根据上下文自动缩进（和上一行相同的缩进量）。默认为true。
        lineNumbers: true,//是否在编辑器左侧显示行号。
        matchBrackets: true,// 匹配括号
        cursorHeight: 1, //光标高度。默认为1，也就是撑满行高。对一些字体，设置0.85看起来会更好。
        lineWrapping: true,// 自动换行
        // readOnly: this.readOnly, //是否只读
        //theme: theme,// 主题配置
        // autofocus: true,//是否在初始化时自动获取焦点。默认情况是关闭的。但是，在使用textarea并且没有明确指定值的时候会被自动设置为true。
        extraKeys: {'Ctrl': 'autocomplete'},//自定义快捷键
        hintOptions: {//自定义提示选项
          // 当匹配只有一项的时候是否自动补全
          // completeSingle: false,
          tables: {
            users: ['name', 'score', 'birthDate'],
            countries: ['name', 'population', 'size']
          }
        }
      })
      this.autoComplete()
    },
    autoComplete() {
      this.editor.on('keyup', (cm, event) => {
        if (!cm.state.completeActive && (
          (event.keyCode >= 65 && event.keyCode <= 90)
          || event.keyCode == 52 || event.keyCode == 219
          || event.keyCode == 190)) {
          CodeMirror.commands.autocomplete(cm, null, {completeSingle: false})
        }
      })
    },
    getEditorInfo() {
      console.log(this.editor.getValue(), ' this.editor.getValue()')
      return this.editor.getValue()
    }
  },
}
</script>
