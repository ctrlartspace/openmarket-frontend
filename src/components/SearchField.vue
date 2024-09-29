<template>
  <v-form @submit.prevent="submit">
    <div class="relative text-lg">
      <input
        ref="searchInput"
        v-model="value"
        class="mb-0 w-full appearance-none rounded border border-neutral-300 px-4 py-2 text-lg font-medium placeholder:font-normal placeholder:text-gray-300 focus:bg-white focus:outline-2 focus:outline-black"
        placeholder="Код товара, название, модель"
        type="text"
        v-bind="$attrs"
        @input="onInputChange"
      />
      <div v-if="value" class="absolute inset-y-0 right-2 flex items-center">
        <span
          class="material-symbols-outlined cursor-pointer text-gray-400 hover:text-gray-800 active:text-gray-800"
          @click="onClearClick"
          >close</span
        >
      </div>
      <div
        :class="value ? 'block' : 'hidden'"
        class="absolute mt-2 w-full rounded border border-neutral-300 bg-white py-2 shadow-sm"
      >
        <ul v-if="searchItems && searchItems.length > 0">
          <li
            v-for="(item, index) in searchItems"
            :key="index"
            :value="index"
            class="cursor-pointer px-4 py-2 hover:bg-gray-100 active:bg-gray-100"
            @click="onSearchItemClick(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul v-else>
          <li class="px-4 py-2 text-gray-300">Ничего не найдено</li>
        </ul>
      </div>
    </div>
  </v-form>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue"

const props = defineProps({
  searchItems: {
    type: Object,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  autoclear: {
    type: Boolean,
    default: false,
  },
  modelValue: {},
})

const emit = defineEmits([
  "submit",
  "update:modelValue",
  "change",
  "onSearchItemClick",
])
const searchInput = ref(null)
const isPrinting = ref(false)

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})

const onInputChange = (event) => {
  value.value = event.target.value
  if (isPrinting.value) {
    return
  }
  isPrinting.value = true
  setTimeout(() => {
    isPrinting.value = false
    emit("change", value.value)
  }, 2500)
}

const onSearchItemClick = (id) => {
  console.log(id)
  value.value = ""
  emit("onSearchItemClick", id)
}
const submit = () => {
  if (!value.value) {
    return
  }

  emit("submit", value.value)

  if (props.autoclear) {
    value.value = ""
  }
}

const onClearClick = () => {
  value.value = ""
}

const setInputFocus = async () => {
  if (searchInput.value) {
    await nextTick()
    searchInput.value.focus()
  }
}
onMounted(async () => {
  window.addEventListener("keypress", setInputFocus)
})
onBeforeUnmount(() => {
  window.removeEventListener("keypress", setInputFocus)
})
</script>
