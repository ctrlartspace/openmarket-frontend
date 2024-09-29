<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-10 p-6 shadow-xl shadow-black"
    @click="closeDialog"
  >
    <div
      class="flex w-80 max-w-lg flex-col overflow-hidden rounded-xl border border-gray-300 bg-white md:rounded-lg"
      @click.stop
    >
      <div class="border-b border-gray-200 bg-gray-50 px-4 py-2">
        <slot name="header">
          <div class="flex items-center justify-between">
            <span class="text-lg">{{ title }}</span>
            <button
              class="flex items-center rounded border border-gray-200 text-black hover:bg-gray-200 hover:text-black active:bg-gray-200 active:text-black"
              @click="closeDialog"
            >
              <span class="material-symbols-outlined md:text-[28px]"
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
