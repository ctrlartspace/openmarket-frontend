<template>
  <div class="relative flex items-center border-b border-gray-200">
    <input
      type="text"
      class="block w-full px-4 py-2 text-lg text-blue-600 bg-inherit appearance-none cursor-pointer placeholder:text-gray-300 placeholder:font-normal focus:outline-none"
      placeholder="Защитные стекла"
      @click="dropdown.category = !dropdown.category"
      readonly
      :value="item.item_category_id"
    />
    <span
      v-if="isEditMode"
      class="px-4 py-2 text-black material-icons-outlined cursor-pointer hover:text-gray-600"
      @click="dropdown.category = !dropdown.category"
      >expand_more</span
    >
    <div
      class="absolute z-10 w-full left-0 top-full bg-white border-t rounded-b border-gray-200 shadow-xl"
      :class="dropdown.category ? 'block' : 'hidden'"
    >
      <ul class="text-lg">
        <li
          v-for="category in categories"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer border- border-gray-200"
          @click="
            ;(item.item_category_id = category.id), (dropdown.category = false)
          "
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
