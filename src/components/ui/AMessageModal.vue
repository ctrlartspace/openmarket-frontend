<template>
  <teleport to="body">
    <div v-if="modal.isOpen" class="modal-window relative z-10">
      <div
        :aria-hidden="!modal.isOpen"
        class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md"
        @click="modal.close"
      >
        <div class="fixed inset-0 z-10 flex w-screen">
          <div class="flex h-full w-full items-center justify-center">
            <div
              class="flex w-4/5 animate-shake flex-col gap-2 rounded-xl bg-white p-4 md:max-w-xs"
              @click.stop
            >
              <h1
                class="whitespace-break-spaces text-center text-xl font-medium"
              >
                {{ modal.title }}
              </h1>
              <p
                v-if="modal.message"
                class="rounded-xl bg-rose-50 p-4 text-center text-rose-600"
              >
                {{ modal.message }}
              </p>
              <div class="flex flex-col gap-2">
                <slot :close-modal="modal.close" name="content">
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
import { useModalStore } from "@/stores/modal.store.js"
import { defineEmits, defineProps } from "vue"

const modal = useModalStore()
const emits = defineEmits(["yes", "no", "finish", "handle"])
const props = defineProps({
  isOpenOut: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "Ошибка",
  },
  yesCaption: {
    type: String,
    default: "Да",
  },
  noCaption: {
    type: String,
    default: "Закрыть",
  },
  hideYes: {
    type: Boolean,
    default: false,
  },
})

const onNoClick = () => {
  modal.close()
  emits("no")
}
</script>
