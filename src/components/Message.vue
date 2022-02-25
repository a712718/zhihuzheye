<template>
  <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2" v-if="isVisible">
    <span>{{ message }}</span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>
<script lang='ts' >
import { defineComponent, PropType, ref } from 'vue';
type MessageTypes = 'success' | 'error' | 'default';

export default defineComponent({
  name: "Message",
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<MessageTypes>,
      default: 'default'
    }
  },
  setup() {
    const isVisible = ref(true);
    const close = () =>{
      isVisible.value = false;
      console.log('close');
    }
    return {
      isVisible,
      close
    }
  },
})
</script>
<style scoped>

</style>