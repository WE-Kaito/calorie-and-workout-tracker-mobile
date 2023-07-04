export default function unixDate() {
  return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    ).getTime();
}