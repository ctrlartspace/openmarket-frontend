export default {
  beforeMount(el) {
    // Добавляем слушатели событий для touchstart и touchend
    const handleTouchStart = () => {
      el.classList.add(
        "scale-95",
        "transition-transform",
        "duration-200",
        "ease-in-out",
      )
      el.classList.remove("scale-100")
    }

    const handleTouchEnd = () => {
      el.classList.remove("scale-95")
      el.classList.add(
        "scale-100",
        "transition-transform",
        "duration-200",
        "ease-in-out",
      )
    }

    // Сохраняем обработчики, чтобы иметь возможность их удалить позже
    el.__handleTouchStart__ = handleTouchStart
    el.__handleTouchEnd__ = handleTouchEnd

    el.addEventListener("touchstart", handleTouchStart)
    el.addEventListener("touchend", handleTouchEnd)
  },
  unmounted(el) {
    // Удаляем слушатели событий при размонтировании
    el.removeEventListener("touchstart", el.__handleTouchStart__)
    el.removeEventListener("touchend", el.__handleTouchEnd__)

    delete el.__handleTouchStart__
    delete el.__handleTouchEnd__
  },
}
