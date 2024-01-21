import moment from "moment";

const formatDate = (date) => {
  const now = moment();
  const diff = now.diff(date, "seconds");
  if (diff < 60) {
    return diff < 10 ? "few seconds ago" : `${diff} seconds ago`;
  } else if (diff < 60 * 60) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (diff < 60 * 60 * 24) {
    const hours = Math.floor(diff / (60 * 60));
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (diff < 60 * 60 * 24 * 30) {
    const days = Math.floor(diff / (60 * 60 * 24));
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (diff < 60 * 60 * 24 * 365) {
    const months = Math.floor(diff / (60 * 60 * 24 * 30));
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  } else {
    const years = Math.floor(diff / (60 * 60 * 24 * 365));
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }
};

export default formatDate;
