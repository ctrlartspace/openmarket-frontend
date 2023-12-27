<template>
  <slot name="activator" :action="action"> </slot>
  <div v-if="isOpened">
    <div
      class="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full bg-black bg-opacity-10"
      @click="isOpened = false"
    >
      <div
        class="flex flex-col max-w-2xl w-1/3 h-2/3 bg-white border border-gray-300 rounded"
      >
        <div class="px-4 py-2 border-b border-gray-200">
          <slot name="header">
            <span class="text-lg font-semibold">{{ title }}</span>
          </slot>
        </div>
        <div class="px-4 py-2 flex-1 border-b border-gray-200 last:border-none">
          <slot name="content"> </slot>
        </div>
        <slot name="footer"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps(["title"])

const isOpened = ref(false)

const action = ref({
  click: () => {
    isOpened.value = !isOpened.value
  },
})
</script>
