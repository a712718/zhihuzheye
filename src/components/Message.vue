<template>
  <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
    v-if="isVisible"
    :class="classObject"
    >
    <span>{{ message }}</span>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>
<script lang='ts' >
import { defineComponent, PropType, reactive, ref } from 'vue';
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
  setup(props, context) {
    const isVisible = ref(true);
    const classObject = reactive({
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default',

    })

    const close = () =>{
      isVisible.value = false;
    }
    return {
      isVisible,
      close,
      classObject
    }
  },
})
</script>
<style scoped>

</style>