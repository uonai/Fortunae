export default class Helper {
  static generateUUIDv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  static getTimeFromUNIXTimestamp(item) {
    const unixTimestamp = item;
    let x = new Date(unixTimestamp * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = x.getFullYear();
    const month = months[x.getMonth()];
    const date = x.getDate();
    const hour = x.getHours();
    const min = x.getMinutes();
    const sec = x.getSeconds();
    const time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  static removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b);
  }
}
