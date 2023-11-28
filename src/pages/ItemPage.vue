<template>
  <div class="px-4 py-2 bg-white w-full h-full rounded border border-gray-300">
    <div v-if="item">
      <h5 class="text-lg font-semibold">Информация о товаре</h5>
      <label class="text-lg">Штрихкод</label>
      <input
        type="text"
        class="block px-2 mt-4 text-lg font-semibold rounded border border-gray-300 focus:outline-none"
        :value="item.item_code"
        disabled
      />
      <input
        type="text"
        class="block px-4 py-2 mt-2 text-lg rounded border border-gray-300 focus:outline-none"
        :value="item.item_brand.name"
      />
      <input
        type="text"
        class="block px-4 py-2 mt-2 text-lg rounded border border-gray-300 focus:outline-none"
        :value="item.item_brand.name"
      />
      <input
        type="text"
        class="block px-4 py-2 mt-2 text-lg rounded border border-gray-300 focus:outline-none"
        :value="item.item_brand.name"
      />
      <input
        type="text"
        class="block px-4 py-2 mt-2 text-lg rounded border border-gray-300 focus:outline-none"
        :value="item.item_brand.name"
      />
      <input
        type="text"
        class="block px-4 py-2 mt-2 text-lg rounded border border-gray-300 focus:outline-none"
        :value="item.item_brand.name"
      />
      <input
        type="text"
        class="block px-4 py-2 mt-2 text-lg rounded border border-gray-300 focus:outline-none"
        :value="item.item_brand.name"
      />
      <input
        type="text"
        class="block px-4 py-2 mt-2 text-lg rounded border border-gray-300 focus:outline-none"
        :value="item.item_brand.name"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getItem } from "@/services/ItemSearch"

const route = useRoute()

const item = ref(null)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    item.value = await getItem(id)
  }
})
</script>
