<template>
  <slot :props="activatorProps"></slot>
  <teleport to="body">
    <div v-if="isOpen || isOpenOut" class="modal-window relative z-10">
      <div
        :aria-hidden="!isOpen"
        class="animate-fade fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md"
        @click="closeModal"
      >
        <div class="fixed inset-0 z-10 flex w-screen">
          <div class="flex h-full w-full items-center justify-center">
            <div
              class="animate-popIn w-4/5 rounded-xl bg-white p-4 md:max-w-xs"
              @click.stop
            >
              <h1
                class="md: mb-4 whitespace-break-spaces text-center text-xl font-medium"
              >
                {{ title }}
              </h1>
              <div class="flex flex-col gap-2">
                <slot :close-modal="closeModal" name="content">
                  <button
                    v-if="!hideYes"
                    v-press
                    :disabled="isLoading"
                    class="pointer-events-auto flex items-center justify-center rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-600 hover:brightness-95"
                    @click="onYesClick"
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
                    v-press
                    class="pointer-events-auto rounded-xl bg-gray-50 px-4 py-3 font-medium text-black hover:brightness-95"
                    @click="onNoClick"
                  >
                    {{ noCaption }}
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { defineEmits, defineProps, ref, watch } from "vue"

const emits = defineEmits(["yes", "no", "finish", "handle"])
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

const isOpen = defineModel(true)
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

watch(isOpen, (newValue, oldValue) => {
  emits("handle", newValue)
})
</script>

<style lang="scss" scoped></style>
