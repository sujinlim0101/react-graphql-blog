export default (date) => {
  const SEC = 1000; // millisecond
  const MIN = 60 * SEC;
  const HOUR = 60 * MIN;
  const DAY = 24 * HOUR;
  const DAY2x = 2 * DAY;
  const DAY7x = 7 * DAY;

  const UNIT_JUST = "방금전";
  const UNIT_MINUTE = "분전";
  const UNIT_HOUR = "시간전";
  const UNIT_YESTERDAY = "어제";
  const UNIT_WEEK = "주일전";

  const getFullDate = (date, dateNow) => {
    if (date.getFullYear() == dateNow.getFullYear()) return date.getMonth() + 1 + "월 " + date.getDate() + "일";
    else return date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일";
  };

  const updated = date;
  const now = Date.now();
  const diff = now - updated;

  if (diff < MIN) {
    return UNIT_JUST;
  } else if (diff < HOUR) {
    return Math.floor(diff / MIN) + UNIT_MINUTE;
  } else if (diff < DAY) {
    return Math.floor(diff / HOUR) + UNIT_HOUR;
  } else if (diff < DAY2x) {
    return UNIT_YESTERDAY;
  } else if (diff < DAY7x) {
    return Math.floor(diff / DAY) + UNIT_WEEK;
  } else {
    const date = new Date(updated);
    const dateNow = new Date(now);
    return getFullDate(date, dateNow);
  }
};
