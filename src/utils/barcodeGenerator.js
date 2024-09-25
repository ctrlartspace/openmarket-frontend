import JsBarcode from "jsbarcode"
import jsPDF from "jspdf"

export const generateBarcodePDF = (barcodeData) => {
  const canvas = document.createElement("canvas")

  JsBarcode(canvas, barcodeData, {
    format: "CODE128", // Выберите нужный формат
    width: 4,
    height: 70,
    fontOptions: "bold",
  })

  const pdfWidth = canvas.width / 2
  const pdfHeight = canvas.height / 2

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: [pdfWidth, pdfHeight],
    putOnlyUsedFonts: true,
    floatPrecision: 16,
  })

  const imgData = canvas.toDataURL("image/png")

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

  pdf.output("dataurlnewwindow")
}
