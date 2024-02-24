<template>
  <v-form @submit.prevent="submit">
    <div class="relative text-lg">
      <input
        ref="searchInput"
        v-model="value"
        class="mb-0 border border-gray-200 px-4 py-2 text-lg placeholder:font-normal placeholder:text-gray-300 appearance-none font-medium rounded w-full focus:outline-2 focus:outline-black focus:bg-white"
        placeholder="Код товара, название, модель"
        type="text"
        @input="onInputChange"
        v-bind="$attrs"
      />
      <div v-if="value" class="absolute inset-y-0 right-2 flex items-center">
        <span
          class="material-icons text-gray-400 hover:text-gray-800 cursor-pointer"
          @click="onClearClick"
          >close</span
        >
      </div>
      <div
        class="absolute mt-2 w-full bg-white py-2 border border-gray-200 rounded shadow-sm"
        :class="value ? 'block' : 'hidden'"
      >
        <ul v-if="searchItems && searchItems.length > 0">
          <li
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            v-for="(item, index) in searchItems"
            :key="index"
            :value="index"
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
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from "vue"

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
