import tab from './index.vue'
export default tab
/*
  tab选项卡组件

  使用方式：
  1、引入组件
    import tab from '@/components/tab/index'
  2、在components选项里注册
    components: {
      tab
    }
  3、在template里调用
    <tab
      :tabMenu="tabMenu"
      @changeTab="handle"
    >
      <div slot="slot1"></div> // 有几个选项就写几个div slot的序号依次排列
    </tab>
  4、如果要处理选项卡点击事件
    methods: {
      handle (index) {
        // index 为当前的选项卡序号
        // do something
      }
    }

  API配置列表：
    <tab
      tabMenu  // 选项卡菜单 (必填项)
      tabIndex // 显示第几个  默认为 0 也就是第一个
    >
    </tab
*/
