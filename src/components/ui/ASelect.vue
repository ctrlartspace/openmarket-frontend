<template>
  <div class="relative rounded-lg">
    <input
      ref="dropdownInput"
      class="peer block w-full cursor-pointer rounded-xl border px-4 py-2 focus:outline-black md:rounded-lg"
      :class="{
        'placeholder:text-gray-300': disabled || loading,
        'animate-pulse': loading,
      }"
      :placeholder="loading ? 'Загрузка...' : placeholder"
      :value="selectedItemTitles"
      @focus="calculateDirection"
      :disabled="disabled || loading"
      v-bind="$attrs"
      @input="handleInput"
      :readonly="!searchable"
      autocomplete="off"
    />
    <div
      class="pointer-events-none absolute bottom-0 right-0 top-0 hidden items-center justify-end px-4 peer-focus:flex"
    >
      <span class="material-symbols-outlined md:text-[28px]">expand_less</span>
    </div>
    <div
      class="pointer-events-none absolute bottom-0 right-0 top-0 flex items-center justify-end px-4 peer-focus:hidden"
    >
      <span
        class="material-symbols-outlined md:text-[28px]"
        :class="{ 'text-gray-300': disabled || loading }"
        >expand_more</span
      >
    </div>
    <div class="relative z-20 hidden peer-focus:block">
      <div class="absolute left-0 right-0" :class="dropdownDirection">
        <div
          ref="dropdownList"
          class="mb-2 mt-2 max-h-64 overflow-auto rounded-lg border bg-white shadow-xl"
        >
          <slot>
            <ul>
              <li v-if="selectedItemTitle">
                <button
                  class="w-full px-4 py-2 text-left text-gray-400 hover:bg-gray-50"
                  @mousedown="clearInput"
                >
                  Сбросить
                </button>
              </li>
              <li v-for="item in items" :key="item.id">
                <button
                  class="w-full px-4 py-2 text-left hover:bg-gray-50"
                  @mousedown="selectItem(item)"
                >
                  {{ item.name }}
                </button>
              </li>
              <li v-if="inputValue && items.length === 0">
                <button
                  class="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-50"
                  @mousedown="selectItem(inputValue)"
                >
                  {{ inputValue }}
                </button>
              </li>

              <li v-if="items.length === 0" class="px-4 py-2 text-gray-300">
                Не найдено
              </li>
            </ul>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from "vue"

const props = defineProps({
  items: { type: Array, required: true, default: () => [] },
  placeholder: { type: String, required: false, default: "Выбрать" },
  disabled: { type: Boolean },
  loading: { type: Boolean },
  searchable: { type: Boolean },
  modelValue: {},
})
const emit = defineEmits(["change", "search", "update:modelValue"])

const dropdownInput = ref(null)
const dropdownList = ref(null)
const dropdownDirection = ref("top")

const inputValue = ref("")

const selectedItemTitle = computed(
  () =>
    props.items.find((item) => item.id === props.modelValue)?.name ||
    inputValue.value,
)
const selectedItemTitles = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.items
      .filter((item) => props.modelValue.includes(item.id))
      .map((item) => item.name)
      .join(", ")
  }

  return selectedItemTitle.value
})

const handleInput = (event) => {
  const value = event.target.value
  inputValue.value = value
}

const selectItem = (item) => {
  if (item) {
    emit("update:modelValue", item.id)
    emit("change", item)
  } else {
    emit("update:modelValue", null)
    emit("change", null)
  }
}

const clearInput = () => {
  selectItem(null)
  inputValue.value = ""
}

const calculateDirection = () => {
  const dropdownHeight = dropdownList.value.clientHeight * 1.4
  const windowHeight = window.innerHeight
  const dropdownTop = dropdownInput.value.getBoundingClientRect().top

  if (windowHeight - dropdownTop < dropdownHeight) {
    dropdownDirection.value = "bottom-10"
  } else {
    dropdownDirection.value = "top-0"
  }
}
</script>

<style lang="scss" scoped></style>
