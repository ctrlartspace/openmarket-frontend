<template>
  <div class="bg-gray-200">
    <div
      class="relative bg-green-400 text-white flex items-center justify-center"
    >
      <div id="canvas" class="bg-gray-400 w-full"></div>
      <div class="absolute top-0 left-0 right-0 bottom-0 flex flex-col">
        <div class="mt-auto"></div>
        <div class="p-4 text-center opacity-20">{{ resultCode }}</div>
        <div class="flex justify-between">
          <button
            class="w-full p-4 text-center text-white opacity-40 flex items-center justify-center"
            @click="zoomOut"
          >
            <span class="material-icons-outlined">zoom_out_map</span>
          </button>
          <button
            class="w-full p-4 text-center text-white opacity-40 flex items-center justify-center"
            @click="changeQuality"
          >
            <span class="material-icons-outlined">{{ videoQuality.name }}</span>
          </button>
          <button
            class="w-full p-4 text-center text-white opacity-40 flex items-center justify-center"
            @click="zoomIn"
          >
            <span class="material-icons-outlined">zoom_in_map</span>
          </button>
        </div>
      </div>
    </div>
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
const videoQuality = ref({
  name: "hd",
  size: 1080,
})
const scaleFactor = ref(2)
const canvas = ref(null)
const video = ref(null)

const zoomIn = () => {
  if (scaleFactor.value < 6) {
    scaleFactor.value += 1
  }
}

const zoomOut = () => {
  if (scaleFactor.value > 1) {
    scaleFactor.value -= 1
  }
}

const changeQuality = () => {
  switch (videoQuality.value.name) {
    case "hd":
      videoQuality.value = {
        name: "4k",
        size: 2160,
      }
      resetCamera()
      setupCamera()
      return
    case "4k":
      videoQuality.value = {
        name: "hd",
        size: 1080,
      }
      resetCamera()
      setupCamera()
      return
  }
}

const setupCamera = async () => {
  try {
    const SIZE = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    )
    let lastScanTime = 0
    const script = (p5) => {
      p5.setup = () => {
        p5.createCanvas(SIZE, SIZE)
        const constraints = {
          video: {
            facingMode: "environment",
            width: { ideal: videoQuality.value.size },
            height: { ideal: videoQuality.value.size },
          },
          audio: false,
        }
        video.value = p5.createCapture(constraints)
        video.value.hide()
        p5.frameRate(30)
      }
      p5.draw = () => {
        const scale = SIZE * scaleFactor.value
        const offsetX = (SIZE - scale) / 2
        const offsetY = (SIZE - scale) / 2
        p5.image(video.value, offsetX, offsetY, scale, scale)

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
    console.log("camera initizlized")
  } catch (error) {
    window.alert(error)
    console.log(error)
  }
}

const resetCamera = () => {
  if (canvas.value) {
    canvas.value.remove()
    console.log("canvas removed")
  }
  if (video.value) {
    video.value.remove()
    console.log("video removed")
  }
}
onMounted(async () => {
  await setupCamera()
})

onBeforeUnmount(() => {
  resetCamera()
  console.log("unmount")
})
</script>
