export const formatPaymentType = (paymentType) => {
  const paymentTypes = {
    online: "Перевод",
    kaspi_qr: "Kaspi QR",
    cash: "Наличные",
  }

  return paymentTypes[paymentType] || "Неизв."
}
