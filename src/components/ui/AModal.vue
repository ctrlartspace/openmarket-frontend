<template>
  <slot :props="activatorProps"></slot>
  <teleport to="body">
    <div v-if="isOpen || isOpenOut" class="modal-window relative z-10">
      <div class="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true">
        <div class="fixed inset-0 z-10 flex w-screen">
          <div class="flex h-full w-full items-center justify-center">
            <div
              class="w-4/5 rounded-xl border border-neutral-400 bg-white p-4 md:max-w-xs"
            >
              <h1
                class="md: mb-4 whitespace-break-spaces text-center text-xl font-medium"
              >
                {{ title }}
              </h1>
              <div class="flex flex-col gap-2">
                <slot name="content" :close-modal="closeModal"></slot>
                <button
                  v-if="!hideYes"
                  class="pointer-events-auto flex items-center justify-center rounded-xl border border-neutral-100 bg-white px-4 py-3 font-medium text-blue-600 hover:bg-neutral-50 md:active:bg-neutral-100"
                  :disabled="isLoading"
                  @click="onYesClick"
                  v-press
                >
                  <span
                    v-if="isLoading"
                    class="material-symbols-rounded animate-spin font-semibold"
                    >progress_activity</span
                  >
                  <span v-else>
                    {{ yesCaption }}
                  </span>
                </button>
                <button
                  class="pointer-events-auto rounded-xl border border-neutral-100 bg-white px-4 py-3 font-medium text-black hover:bg-neutral-50 md:active:bg-neutral-100"
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
  </teleport>
</template>

<script setup>
import { ref, defineEmits, defineProps, defineModel } from "vue"

const inputValue = defineModel()
const emits = defineEmits(["yes", "no", "finish"])
const props = defineProps({
  isOpenOut: {
    type: Boolean,
    default: false,
  },
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
  hideYes: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(false)
const isLoading = ref(false)

const openModal = () => {
  isOpen.value = true
}
const closeModal = () => {
  isOpen.value = false
}

const activatorProps = ref({
  onClick: openModal,
})

const onYesClick = async () => {
  emits("yes")
  if (props.asyncOperation) {
    isLoading.value = true
    await props.asyncOperation()
    isLoading.value = false
    isOpen.value = false
    emits("finish")
  }
}

const onNoClick = () => {
  isOpen.value = false
  emits("no")
}
</script>

<style lang="scss" scoped></style>
