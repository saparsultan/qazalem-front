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

  static getEvents({
    event_date,
    event_date_end,
    type_of_event,
    countries,
    search,
    archive,
    limit,
    offset,
    lang,
  }) {
    return $api.get(
      `events/preview?event_date=${event_date}&event_date_end=${event_date_end}&type_of_event=${type_of_event}&countries=${countries}&search=${search}&archive=${archive}&limit=${limit}&offset=${offset}&lang=${lang}`,
    );
  }

  static getEventsCountry(lang) {
    return $api.get(`events/country?lang=${lang}`);
  }

  static getEventsType(lang) {
    return $api.get(`events/type_of_events?lang=${lang}`);
  }
}
