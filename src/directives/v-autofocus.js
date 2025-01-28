export default {
  mounted(el) {
    el.focus()
    // Находим все вложенные input элементы
    const inputs = el.querySelectorAll("input")

    // Перебираем их и ставим фокус на каждый
    inputs.forEach((input) => {
      input.focus()
    })
  },
}
