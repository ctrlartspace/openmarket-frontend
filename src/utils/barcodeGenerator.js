import JsBarcode from "jsbarcode"
import jsPDF from "jspdf"

export const generateBarcodePDF = (barcodeData) => {
  const canvas = document.createElement("canvas")

  JsBarcode(canvas, barcodeData, {
    format: "EAN13", // Выберите нужный формат
  })

  const pdfWidth = 28
  const pdfHeight = 20

  const pdf = new jsPDF({
    text: "sdf",
    textPosition: "top",
    orientation: "landscape",
    unit: "mm",
    format: [pdfWidth, pdfHeight],
    putOnlyUsedFonts: true,
  })

  const imgData = canvas.toDataURL("image/png")

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)

  // Включаем автопечать
  pdf.autoPrint()

  const pdfBlob = pdf.output("blob")

  // Создаём URL для Blob и открываем его в новом окне
  const url = URL.createObjectURL(pdfBlob)
  const printWindow = window.open(url)

  // Ждём загрузки и запускаем печать
  printWindow.onload = () => {
    printWindow.focus()
    printWindow.print()
  }
}

export const generateEAN13 = (productName, price, categoryId) => {
  // Функция для генерации 12-значного идентификатора
  function generateUniqueId(productName, price, categoryId) {
    const combinedString = `${productName}-${price}-${categoryId}`
    let hash = 0
    for (let i = 0; i < combinedString.length; i++) {
      hash = (hash << 5) - hash + combinedString.charCodeAt(i)
      hash = hash | 0 // Приводим к 32-битному целому
    }
    const id = Math.abs(hash).toString().slice(-12)
    return id.padStart(12, "9")
  }

  // Функция для расчета контрольной цифры EAN-13
  function calculateEAN13CheckDigit(ean) {
    let sum = 0
    for (let i = 0; i < ean.length; i++) {
      const digit = parseInt(ean[i], 10)
      sum += i % 2 === 0 ? digit : digit * 3 // Учитываем четные и нечетные позиции
    }
    const checkDigit = (10 - (sum % 10)) % 10 // Контрольная цифра
    return checkDigit
  }

  // Генерируем 12-значный идентификатор
  const eanBase = generateUniqueId(productName, price, categoryId)

  // Рассчитываем контрольную цифру
  const checkDigit = calculateEAN13CheckDigit(eanBase)

  // Формируем окончательный EAN-13 код
  const ean13 = eanBase + checkDigit

  return ean13
}
