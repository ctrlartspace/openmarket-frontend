<template>
  <slot :props="activatorProps"></slot>
  <div v-if="isOpen" class="modal-window relative z-10">
    <div class="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true">
      <div class="fixed inset-0 z-10 flex w-screen">
        <div class="flex h-full w-full items-center justify-center">
          <div
            class="w-4/5 rounded-xl border border-neutral-400 bg-white p-4 md:max-w-xs"
          >
            <h1
              class="mb-4 whitespace-break-spaces text-center text-xl font-medium md:text-lg"
            >
              {{ title }}
            </h1>
            <div class="flex flex-col gap-2">
              <button
                class="flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-lg font-medium text-blue-600 hover:bg-neutral-50 md:border-neutral-200 md:text-base md:active:bg-neutral-100"
                :disabled="isLoading"
                @click="onYesClick"
                v-press
              >
                <span
                  v-if="isLoading"
                  class="material-symbols-rounded animate-spin text-lg font-semibold"
                  >progress_activity</span
                >
                <span v-else>
                  {{ yesCaption }}
                </span>
              </button>
              <button
                class="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-lg font-medium text-black hover:bg-neutral-50 md:border-neutral-200 md:text-base md:active:bg-neutral-100"
                @click="onNoClick"
                v-press
              >
                {{ noCaption }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue"

const emits = defineEmits(["yes", "no", "finish"])
const props = defineProps({
  title: {
    type: String,
    default: "Подтвердите",
  },
  yesCaption: {
    type: String,
    default: "Да",
  },
  noCaption: {
    type: String,
    default: "Отмена",
  },
  asyncOperation: {
    type: Function,
  },
})

const isOpen = ref(false)
const isLoading = ref(false)

const openModal = () => {
  isOpen.value = true
}

const activatorProps = ref({
  onClick: openModal,
})

const onYesClick = async () => {
  emits("yes")
  isLoading.value = true
  await props.asyncOperation()
  isLoading.value = false
  isOpen.value = false
  emits("finish")
}

const onNoClick = () => {
  isOpen.value = false
  emits("no")
}
</script>

<style lang="scss" scoped></style>
