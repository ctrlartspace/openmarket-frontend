<template>
  <slot name="activator" :action="action"> </slot>
  <div
    v-if="isOpened"
    class="fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full bg-black bg-opacity-10 shadow-md shadow-black"
    @click="isOpened = false"
  >
    <div
      class="flex flex-col max-w-lg w-1/4 h-2/3 bg-white border border-gray-300 rounded overflow-hidden"
      @click.stop
    >
      <div class="p-4 bg-gray-50">
        <slot name="header">
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold">{{ title }}</span>
            <button class="flex items-center" @click="isOpened = false">
              <span class="material-icons-outlined">close</span>
            </button>
          </div>
        </slot>
      </div>
      <div class="flex-1 overflow-auto">
        <slot name="content"> </slot>
      </div>
      <div class="p-4">
        <slot name="footer" :action="action"> </slot>
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
