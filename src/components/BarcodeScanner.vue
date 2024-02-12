<template>
  <div class="bg-gray-200">
    <div
      class="relative bg-green-400 text-white flex items-center justify-center"
    >
      <div id="canvas" class="bg-red-100 w-full"></div>
      <div class="absolute w-full bottom-0 flex justify-between">
        <button
          class="w-full px-4 py-2 text-center text-white bg-black opacity-20 flex items-center justify-center"
          @click="zoomOut"
        >
          <span class="material-icons-outlined">zoom_out</span>
        </button>
        <button
          class="w-full px-4 py-2 text-center text-white bg-black opacity-20 flex items-center justify-center"
          @click="zoomIn"
        >
          <span class="material-icons-outlined">zoom_in</span>
        </button>
      </div>
    </div>
    <audio class="hidden" id="beepSound" controls preload="none">
      <source src="../assets/beep.wav" type="audio/wav" />
    </audio>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

import Quagga from "quagga"
import P5 from "p5"

const props = defineProps({
  isStopped: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["success"])

const resultCode = ref("")
const scaleFactor = ref(2)
const canvas = ref(null)

const zoomIn = () => {
  if (scaleFactor.value < 6) {
    scaleFactor.value += 1
  }
}

const zoomOut = () => {
  if (scaleFactor.value > 2) {
    scaleFactor.value -= 1
  }
}

onMounted(async () => {
  try {
    const SIZE = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )
    let video = null
    let lastScanTime = 0
    const script = (p5) => {
      p5.setup = () => {
        p5.createCanvas(SIZE, SIZE)
        const constraints = {
          video: {
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1920 },
          },
          audio: false,
        }
        video = p5.createCapture(constraints)
        video.hide()
        p5.frameRate(30)
      }
      p5.draw = () => {
        const s1 = SIZE / scaleFactor.value
        const s2 = SIZE * scaleFactor.value
        p5.image(video, 0 - s1, 0 - s1, s2, s2)

        const currentTime = Date.now()
        const timeSinceLastScan = currentTime - lastScanTime
        if (timeSinceLastScan >= 500 && !props.isStopped) {
          const urlData = p5.canvas.toDataURL("image/jpeg")

          Quagga.decodeSingle(
            {
              src: urlData,
              decoder: {
                readers: ["ean_reader"],
              },
              inputStream: {
                size: 400,
              },
              numOfWorkers: navigator.hardwareConcurrency
                ? navigator.hardwareConcurrency
                : 4,
              locator: {
                halfSample: true,
                patchSize: "medium",
              },
            },
            (result) => {
              if (result && result.codeResult && !props.isStopped) {
                resultCode.value = result.codeResult.code
                emit("success", resultCode.value)
              }
            }
          )
          lastScanTime = currentTime
        }
      }
    }
    canvas.value = new P5(script, "canvas")
  } catch (error) {
    window.alert(error)
    console.log(error)
  }
})
onBeforeUnmount(() => {
  canvas.value.remove()
  console.log("canvas destroyed")
})
</script>
