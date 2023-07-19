export default function unixDate() {
  const currentDate = new Date();
  return  new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
    ).getTime()
}

