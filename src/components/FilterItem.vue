<template>
  <li
    v-for="(item, i) in items"
    class="flex items-center gap-3 px-4 py-2 border-b last:border-none"
  >
    <div class="flex items-center">
      <input
        type="checkbox"
        class="w-4 h-4"
        :value="item[itemValue]"
        :checked="modelValue.find((i) => String(i) === String(item[itemValue]))"
        @input="onCheckedChange"
        @click.stop
      />
    </div>
    <input
      v-model="item[itemName]"
      class="w-full bg-inherit text-lg placeholder:text-gray-300 focus:outline-none capitalize"
      :class="isEditMode ? 'text-blue-600' : 'text-black'"
      type="text"
      placeholder="Название"
      :disabled="!isEditMode"
      @keyup.enter="updateItemClick(item)"
    />
    <button class="flex items-center">
      <span class="material-icons-outlined">expand_more</span>
    </button>
  </li>
</template>

<script setup>
defineProps(["items"])
</script>
