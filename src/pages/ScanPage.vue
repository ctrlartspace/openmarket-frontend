<template>
  <main class="wrapper" style="padding-top: 2em">
    <section class="container" id="demo-content">
      <h1 class="title">Scan 1D/2D Code from Video Camera</h1>

      <p>
        <a class="button-small button-outline" href="../../index.html"
          >HOME 🏡</a
        >
      </p>

      <p>
        This example shows how to scan any supported 1D/2D code with ZXing
        javascript library from the device video camera. If more than one video
        input devices are available (for example front and back camera) the
        example shows how to read them and use a select to change the input
        device.
      </p>

      <div>
        <a class="button" id="startButton">Start</a>
        <a class="button" id="resetButton">Reset</a>
      </div>

      <div>
        <video
          id="video"
          width="300"
          height="200"
          style="border: 1px solid gray"
        ></video>
      </div>

      <div id="sourceSelectPanel" style="display: none">
        <label for="sourceSelect">Change video source:</label>
        <select id="sourceSelect" style="max-width: 400px"></select>
      </div>

      <label>Result:</label>
      <pre><code id="result"></code></pre>

      <p>
        See the
        <a
          href="https://github.com/zxing-js/library/tree/master/docs/examples/multi-camera/"
          >source code</a
        >
        for this example.
      </p>
    </section>

    <footer class="footer">
      <section class="container">
        <p>
          ZXing TypeScript Demo. Licensed under the
          <a
            target="_blank"
            href="https://github.com/zxing-js/library#license"
            title="MIT"
            >MIT</a
          >.
        </p>
      </section>
    </footer>
  </main>
</template>

<script setup>
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library"

const codeReader = new BrowserMultiFormatReader()

codeReader
  .listVideoInputDevices()
  .then((videoInputDevices) => {
    const sourceSelect = document.getElementById("sourceSelect")
    const selectedDeviceId = videoInputDevices[0].deviceId
    if (videoInputDevices.length >= 1) {
      videoInputDevices.forEach((element) => {
        const sourceOption = document.createElement("option")
        sourceOption.text = element.label
        sourceOption.value = element.deviceId
        sourceSelect.appendChild(sourceOption)
      })

      sourceSelect.onchange = () => {
        selectedDeviceId = sourceSelect.value
      }

      const sourceSelectPanel = document.getElementById("sourceSelectPanel")
      sourceSelectPanel.style.display = "block"
    }

    document.getElementById("startButton").addEventListener("click", () => {
      codeReader.decodeFromVideoDevice(
        selectedDeviceId,
        "video",
        (result, err) => {
          if (result) {
            console.log(result)
            document.getElementById("result").textContent = result.text
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err)
            document.getElementById("result").textContent = err
          }
        }
      )
      console.log(
        `Started continous decode from camera with id ${selectedDeviceId}`
      )
    })

    document.getElementById("resetButton").addEventListener("click", () => {
      codeReader.reset()
      document.getElementById("result").textContent = ""
      console.log("Reset.")
    })
  })
  .catch((err) => {
    console.error(err)
  })
</script>
