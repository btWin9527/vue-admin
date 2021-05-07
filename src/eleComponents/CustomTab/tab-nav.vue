<!-- tabNav -->
<script>
  import TabBar from './tab-bar';
  import {addResizeListener, removeResizeListener} from '@/utils/resize-event';

  function noop() {
    const firstUpperCase = str => {
      return str.toLowerCase().replace(/(|^)[a-z]/g, (L) => L.toUpperCase());
    };

    export default {
      name: 'TabNav',
      components: {
        TabBar
      },
      inject: ['rootTabs'],
      props: {
        panes: Array,
        currentName: String,
        editable: Boolean, // 标签是否同时可增加和关闭
        onTabClick: {
          type: Function,
          default: noop
        },
        onTabRemove: {
          type: Function,
          default: noop
        },
        type: String, // 风类型
        stretch: Boolean, // 标签的宽度是否自撑开
      },
      data() {
        return {
          scrollable: false,
          navOffset: 0,
          isFocus: false,
          focusable: true
        };
      },

    }
  }


</script>
