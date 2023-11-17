<template>
  <v-form @submit.prevent="submit">
    <div class="relative text-lg">
      <input
        ref="searchInput"
        v-model="value"
        class="bg-white mb-0 placeholder:font-normal appearance-none border border-gray-400 font-semibold rounded w-full py-2 px-4 text-gray-700 focus:outline-2 focus:outline-black"
        placeholder="Код товара"
        type="text"
        @input="onInputChange"
        v-bind="$attrs"
        @focus=""
      />
      <div v-if="value" class="absolute inset-y-0 right-2 flex items-center">
        <span
          class="material-icons text-gray-400 hover:text-gray-800 cursor-pointer"
          @click="onClearClick"
          >close</span
        >
      </div>
      <div
        class="absolute mt-2 w-full bg-white py-2 border border-gray-400 rounded"
        :class="value ? 'block' : 'hidden'"
      >
        <ul>
          <li
            v-if="searchItems && searchItems.length > 0"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            v-for="(item, index) in searchItems"
            :key="index"
            :value="index"
            @click="onSearchItemClick(item.id)"
          >
            {{ item.model }}
          </li>
          <li v-else class="px-4 py-2 text-gray-400">Ничего не найдено</li>
        </ul>
      </div>
    </div>
  </v-form>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from "vue"

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
  emit("submit", value.value)

  if (props.autoclear) {
    value.value = ""
  }
}

const onClearClick = () => {
  value.value = ""
}

// каждый раз когда изменяется loading
// ставим фокус на поле вводе::w
watch(value, async () => {
  await nextTick()
  searchInput.value.focus()
})

onMounted(async () => {
  await nextTick()
  searchInput.value.focus()
})
</script>
