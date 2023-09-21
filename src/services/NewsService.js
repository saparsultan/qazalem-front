import $api from "@/utils/http";

export default class NewsService {
  static getNewsOriginCountry() {
    return $api.get("news/kazakhstan/filter/preview?lang=kk");
  }
  static getNewsWorld() {
    return $api.get("news/world/filter/preview?lang=kk");
  }

  static getOneNewsWorld(id, lang, signal) {
    return $api.get(`news/world/body?id=${id}&lang=${lang}`, {
      signal,
    });
  }
}
