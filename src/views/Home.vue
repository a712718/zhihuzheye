<template>
  <div style="display: flex;justify-content: center; align-items: center; flex-direction: column">
    <img src="@/assets/callout.png"/>
    <h3>随心写作，自由表达</h3>
    <button style="padding:5px 10px; background: #0d6efd; color: #fff;border: 1px solid #0d6efd; border-radius: 4px; margin: 10px" @click="create">开始写文章</button>
  </div>
  <column-list :list="list"></column-list>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import ColumnList, { IColumnProps } from '../components/ColumnList.vue';
let testData: IColumnProps[] = [
  {
    id: '1',
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: '2',
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: '3',
    title: 'test3的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: '4',
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
export default defineComponent({
  name: 'Home',
  components: {
    ColumnList
  },
  setup() {
    const router = useRouter();
    const list = ref(testData);
    const create = () => {
      router.push({
        name: 'create'
      })
    }
    return {
      list,
      create
    }
  },
})
</script>
<style scoped>

</style>