<template>
   <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <!-- <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" :value="modelValue" @change="change"> -->
      <!-- <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="inputRef.value" @change="change"> -->
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="inputRef.value" @blur="validateInput">
      <div id="emailHelp" class="form-text" v-if="inputRef.err">{{ inputRef.message }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from 'vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[]
export default defineComponent({
  name: 'ValidateInput',
  props: {
    modelValue: {
      type: String,
      default: 'input'
    },
    rules: {
      type: Array as PropType<RulesProp>
    }
  },
  inheritAttrs: false, // 组件的属性给当前组件 不往父组件传递
  emits: ['update:modelValue'],
  setup(props, context) {
    // const inputRef = reactive({
    //   value: props.modelValue,
    //   err: false,
    //   message: ''
    // })
    // const change = (e: any) => {
    //   context.emit('update:modelValue', e.target.value)
    // }
    const inputRef = reactive({
      value: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
      err: false,
      message: ''
    })

    const validateInput = ()=>{
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case 'required':
              passed = (inputRef.value.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.value)
              break
            case 'custom':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed;
        })

        inputRef.err = !allPassed;
        return allPassed;
      }

      return true

    }
    return {
      // change,
      inputRef,
      validateInput
    }
  }
})
</script>

<style scoped>

</style>