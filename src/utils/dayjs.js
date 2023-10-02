import * as dayjs from "dayjs";
import kk from "dayjs/locale/kk";
import ru from "dayjs/locale/ru";
import en from "dayjs/locale/en";
import zh from "dayjs/locale/zh";
export const RedableFormat = ({ date, lng, format }) => {
  const lngDateFunc = () => {
    switch (lng) {
      case "ru":
        return ru;
      case "kk":
        return kk;
      case "en":
        return en;
      case "cn":
        return zh;
      default:
        return kk;
    }
  };
  const lngDate = lngDateFunc();
  return date ? dayjs(new Date(date)).locale(lngDate).format(format) : null;
};
