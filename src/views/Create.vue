<template>
  <div>create</div>
  <uploader action="/upload"></uploader>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Uploader from '@/components/Uploader.vue'
export default defineComponent({
  name: 'Create',
  components: {
    Uploader
  },
  setup() {
    console.log('Create');
  },
})
</script>
<style scoped>

</style>