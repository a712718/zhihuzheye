<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">submit</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt';
type IValidateFunc = ()=> boolean;
type Events = { 'form-item-create': IValidateFunc}

export const mitter = mitt<Events>()

export default defineComponent({
  name: 'ValidateForm',
  setup(props, context) {
    let funcArray:IValidateFunc[] = [];
    const callback = (func?: IValidateFunc) => {
      if(func) {
        funcArray.push(func);
      }
      // console.log('funcArray,,,', funcArray);
    }
    mitter.on('form-item-create', callback)
    onUnmounted(() => {
      mitter.off('form-item-create', callback);
      funcArray = []
    })

    const submitForm = () => {
      const result = funcArray.map(func=> func()).every(result => result);
      context.emit('form-submit', result);
    }

    return {
      submitForm
    }
  },
})
</script>

<style scoped>

</style>