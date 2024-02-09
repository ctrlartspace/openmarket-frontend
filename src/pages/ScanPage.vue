<template>
  <div class="p-4 bg-black text-white">
    <video class="hidden" id="video" autoplay muted playsinline></video>
    <canvas ref="canvasEl" class="w-full" id="canvas"></canvas>
    <button class="select-none" @click="captureCode">SCAN</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Quagga from "quagga"

const canvasEl = ref(null)

const captureCode = () => {
  console.log("start")
  const canvas = canvasEl.value
  const ctx = canvas.getContext("2d", { willReadFrequently: true })

  let scale = 3

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const scaledWidth = canvas.width * scale
  const scaledHeight = canvas.height * scale
  const x = (canvas.width - scaledWidth) / 2
  const y = (canvas.height - scaledHeight) / 2

  ctx.drawImage(video, x, y, scaledWidth, scaledHeight)

  const urlData = canvas.toDataURL("image/jpeg")

  Quagga.decodeSingle(
    {
      src: urlData,
      decoder: {
        readers: ["ean_reader"],
      },
      inputStream: {
        size: 100,
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
      if (result && result.codeResult) {
        window.alert(result.codeResult.code)
      }
    }
  )
}

onMounted(async () => {
  try {
    const constraints = {
      video: {
        facingMode: "environment",
        width: { ideal: 2160 },
        height: { ideal: 2160 },
        aspectRatio: { ideal: 1 },
      },
      audio: false,
    }

    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    if (stream) {
      // const video = document.getElementById("video")
      // video.srcObject = stream
      // video.play()

      // const canvas = document.getElementById("canvas")
      // const ctx = canvas.getContext("2d")

      const scale = 3

      // video.addEventListener("loadedmetadata", () => {
      //   canvas.width = video.videoWidth
      //   canvas.height = video.videoHeight
      //   window.alert(canvas.height)
      // })

      // const fps = 24
      const canvas = document.getElementById("canvas")

      // Получаем контекст WebGL
      const gl = canvas.getContext("webgl")

      // Создаем текстуру
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)

      // Задаем параметры, чтобы можно было отрисовать изображение любого размера
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)

      const captureAndDraw = () => {
        // ctx.clearRect(0, 0, canvas.width, canvas.height)

        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video
        )
        const scaledWidth = canvas.width * scale
        const scaledHeight = canvas.height * scale
        const x = (canvas.width - scaledWidth) / 2
        const y = (canvas.height - scaledHeight) / 2

        console.log(scaledWidth, scaledHeight)
        // ctx.drawImage(video, x, y, scaledWidth, scaledHeight)
        // ctx.drawImage(video, 0, 0)

        // ctx.drawImage(
        //   video,
        //   0,
        //   0,
        //   video.videoWidth,
        //   video.videoHeight,
        //   x,
        //   y,
        //   scaledWidth,
        //   scaledHeight
        // )

        const urlData = canvas.toDataURL("image/jpeg")

        // Quagga.decodeSingle(
        //   {
        //     src: urlData,
        //     decoder: {
        //       readers: ["ean_reader"],
        //     },
        //     inputStream: {
        //       size: 600,
        //     },
        //     numOfWorkers: navigator.hardwareConcurrency
        //       ? navigator.hardwareConcurrency
        //       : 4,
        //     locator: {
        //       halfSample: true,
        //       patchSize: "medium",
        //     },
        //   },
        //   (result) => {
        //     if (result && result.codeResult) {
        //       window.alert(result.codeResult.code)
        //     }
        //   }
        // )
        requestAnimationFrame(captureAndDraw)
      }

      captureAndDraw()
    }
  } catch (error) {
    window.alert(error)
    console.log(error)
  }
})
</script>
