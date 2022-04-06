<template>
   <div class="validate-input-container pb-3">
      <!-- <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" :value="modelValue" @change="change"> -->
      <!-- <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="inputRef.value" @change="change"> -->
      <input 
        v-if="tag!==textarea"
        class="form-control" 
        v-model="inputRef.value" 
        @blur="validateInput"
        v-bind="$attrs"
        >
      <textarea
        v-else
        class="form-control" 
        v-model="inputRef.value" 
        @blur="validateInput"
        v-bind="$attrs"
      >
      </textarea>
      <div class="invalid-feedback" v-if="inputRef.err">{{ inputRef.message }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, onMounted } from 'vue'
import { mitter } from './ValidateForm.vue';

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface IRuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type ITagType = 'input' | 'textarea'
export type IRulesProp = IRuleProp[]
export default defineComponent({
  name: 'ValidateInput',
  props: {
    modelValue: String,
    rules: Array as PropType<IRulesProp>,
    tag: {
      type: String as  PropType<ITagType>,
      default: 'input'
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

    onMounted(() => {
      // console.log('validate input mitter');
      mitter.emit('form-item-create', validateInput)
    })

    const validateInput = () => {
      if (props.rules) {
        // every 返回结果是true 继续往下执行，执行结果为false返回
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