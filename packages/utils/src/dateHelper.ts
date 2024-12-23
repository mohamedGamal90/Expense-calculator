const day = 24 * 60 * 60 * 1000;

const formatDate = (date: Date | string | number) =>
  new Date(date)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

const getNextWeek = () => formatDate(new Date().getTime() + 7 * day);
const getTommorowDate = () => formatDate(new Date().getTime() + day);
const getTodayDate = () => formatDate(new Date());
const getLastWeek = () => formatDate(new Date().getTime() - 7 * day);
const getLastMonth = () => formatDate(new Date().getTime() - 31 * day);

export { formatDate, getLastMonth, getLastWeek, getNextWeek, getTommorowDate, getTodayDate };
