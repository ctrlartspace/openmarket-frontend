<template>
  <div
    class="p-6 fixed top-0 right-0 left-0 bottom-0 z-50 flex justify-center items-center w-full bg-black bg-opacity-10 shadow-xl shadow-black"
    @click="closeDialog"
  >
    <div
      class="flex flex-col w-80 max-w-lg bg-white border border-gray-300 md:rounded rounded-xl overflow-hidden"
      @click.stop
    >
      <div class="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <slot name="header">
          <div class="flex items-center justify-between">
            <span class="text-lg">{{ title }}</span>
            <button
              class="flex items-center border border-gray-200 rounded text-black hover:bg-gray-200 hover:text-black"
              @click="closeDialog"
            >
              <span class="material-icons-outlined md:text-[28px]"
                >minimize</span
              >
            </button>
          </div>
        </slot>
      </div>
      <div class=""><slot></slot></div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"])
const props = defineProps(["title"])

const closeDialog = () => {
  emit("close")
}
</script>
