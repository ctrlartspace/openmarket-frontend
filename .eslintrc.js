module.exports = {
  extends: [
    "plugin:vue/vue3-recommended", // Если используешь Vue 3
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  rules: {
    "import/no-unresolved": "error", // Показывает ошибки, если не удается найти импорт
  },
}
