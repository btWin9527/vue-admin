<template>
  <div>
    <!-- 插入公式 -->
    <div id="container" ref="editor" contenteditable="true"
         style="width: 300px;height: 300px;background-color: pink;"></div>
    <button @click="insertText">插入文本</button>
  </div>
</template>

<script>

export default {
  methods: {
    // 在光标处插入文本信息
    insertText(event, txt = 'text') {
      event.stopPropagation();

      // 在富文本编辑器光标位置插入粘贴的文本
      let isContainer = this.getContainerIdAtCursor()
      if (isContainer) {
        document.execCommand('insertText', false, 'testt');
      }
    },
    getContainerIdAtCursor() {
      const selection = window.getSelection();

      if (selection.rangeCount === 0) {
        return false;
      }

      const range = selection.getRangeAt(0);
      const container = range.startContainer;
      // 从当前节点开始向上遍历父元素，找到第一个具有 ID 的父元素
      let currentNode = container.parentNode;

      while (currentNode !== null) {
        if (currentNode.nodeType === 1 && currentNode.id && currentNode.id === 'container') {
          return true;
        }

        currentNode = currentNode.parentNode;
      }

      return false;
    }
  }
}
</script>

<style scoped>

</style>
