import moment from "moment"
import "moment/dist/locale/ru"
moment.locale("ru")

export const formatDate = (
  inputDate,
  format = "DD.MM.YYYY",
  { substract = 0, add = 0 } = {},
) => {
  return moment(inputDate)
    .locale("ru")
    .utc()
    .local()
    .subtract(substract, "days")
    .add(add, "hours")
    .format(format)
}

export const fromNow = (date) => {
  const currentDate = moment()
  const targetDate = moment(date)

  if (currentDate.isSame(targetDate, "day")) {
    return "Сегодня"
  } else if (currentDate.subtract(1, "days").isSame(targetDate, "day")) {
    return "Вчера"
  } else {
    return targetDate.fromNow() // Вернет, например: "2 дня назад"
  }
}
