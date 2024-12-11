const day = 24 * 60 * 60 * 1000;

const formatDate = (date: Date | string | number) =>
  new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");

const getLastWeek = () => formatDate(new Date().getTime() - 7 * day);

const getTodayDate = () => formatDate(new Date());

export { formatDate, getLastWeek, getTodayDate };
