<template>
  <div @click="triggerUpload">点击上传头图</div>
  <input style="display: none" type="file" ref="fileInput" accept="image/png,image/jpeg, image/jpg" @change="handleFileChange" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import http from '@/utils/http'

export default defineComponent({
  setup(props, context) {
    const fileInput = ref<null | HTMLElement>(null)
    const triggerUpload = () => {
      if(fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileChange = (e: Event) => {
      console.log('handleFileChange,,,,', e);
      const fileInput = e.target as HTMLInputElement;
      if(!fileInput.files){
        return;
      }
      const fileList = Array.from(fileInput.files);
      if(!fileList[0]) {
        return;
      }
      const formData = new FormData();
     
      formData.append('file', fileList[0]);
      console.log('form data,,,', formData);
      http.post('/upload', formData, {
        headers: {'Content-Type':  'multipart/form-data'}
      }).then(res=> {
        console.log('res,,,,', res);
      }).catch(error => {
        console.log('error,,,,', error);
      })

    }

    return {
      fileInput,
      triggerUpload,
      handleFileChange
      };
  },
})
</script>
<style scoped>

</style>