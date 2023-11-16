<template>
  <v-form @submit.prevent="submit">
    <v-text-field
      ref="searchInput"
      v-model="value"
      label="Поиск"
      density="compact"
      hide-details
      clearable
      single-line
      variant="outlined"
      hint="Нажмите Enter для поиска"
      :loading="loading"
      :disabled="loading"
      @click:append-inner="submit"
      @input="onInputChange"
      v-bind="$attrs"
    >
    </v-text-field>
    <v-menu v-if="value" v-model="isMenu" activator="parent">
      <v-list
        v-if="searchItems && searchItems.length > 0"
        class="border elevation-0"
      >
        <v-list-item
          v-for="(item, index) in searchItems"
          :key="index"
          :value="index"
          @click="onSearchItemClick(item.id)"
        >
          <v-list-item-title>{{ item.model }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list v-else class="border elevation-0">
        <v-list-item>
          <v-list-item-title>Не найдено</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
const isMenu = ref(true)

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
  isMenu.value = true
  setTimeout(() => {
    isPrinting.value = false
    emit("change", value.value)
  }, 2500)
}

const onSearchItemClick = (id) => {
  console.log(id)
  emit("onSearchItemClick", id)
}
const submit = () => {
  emit("submit", value.value)

  if (props.autoclear) {
    value.value = ""
  }
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
