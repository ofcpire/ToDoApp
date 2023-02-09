export const dateParser = (date) => {
  if (!date) return "";
  else if (date === "Special") return "중요한 ToDo"
  let result = "";
  const dateObj = new Date(date);
  const today = new Date();
  if (today.getFullYear() === dateObj.getFullYear() && today.getMonth() === dateObj.getMonth() && today.getDate() === dateObj.getDate()) result = "오늘";
  else if(isTommorow(dateObj)) result="내일";
  else if (today.getFullYear() === dateObj.getFullYear()) result = `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`
  else result = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  return result;
}
export const dateStrictParser = (date) => {
  if (!date) return "";
  let result = "";
  const dateObj = new Date(date);
  result = `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  return result;
}

export const dateToString = (dateObj) => {
  let month = String(dateObj.getMonth() + 1);
  if (Number(month) < 10) month = `0` + month;
  let date = String(dateObj.getDate());
  if (Number(date) < 10) date = `0` + date;
  return `${dateObj.getFullYear()}-${month}-${date}`;
}

export const isTommorow = (dateObj) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return dateToString(tomorrow)===dateToString(dateObj);
}