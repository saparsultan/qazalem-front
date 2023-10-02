import $api from "@/utils/http";

export default class NewsService {
  static getNewsOriginCountryCategory(lng) {
    return $api.get(`news/kazakhstan/subcategory?lang=${lng}`);
  }

  static getNewsOriginCountry({
    lang,
    subcategory,
    published_date_start,
    published_date_end,
    search,
    limit,
    offset,
  }) {
    return $api.get(
      `news/kazakhstan/filter/preview?lang=${lang}&subcategory=${subcategory}&published_date_start=${published_date_start}&published_date_end=${published_date_end}&search=${search}&limit=${limit}&offset=${offset}`,
    );
  }

  static getOneOriginCountry(id, lang, signal) {
    return $api.get(`news/kazakhstan/body?id=${id}&lang=${lang}`, {
      signal,
    });
  }

  static getNewsWorldCategory(lng) {
    return $api.get(`news/world/subcategory?lang=${lng}`);
  }

  static getNewsWorld({
    lang,
    subcategory,
    published_date,
    search,
    limit,
    offset,
  }) {
    return $api.get(
      `news/world/filter/preview?lang=${lang}&subcategory=${subcategory}&published_date=${published_date}&search=${search}&limit=${limit}&offset=${offset}`,
    );
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

  static getOneEvents(id, lang, signal) {
    return $api.get(`events/body?id=${id}&lang=${lang}`, {
      signal,
    });
  }

  static getEventsCountry(lang) {
    return $api.get(`events/country?lang=${lang}`);
  }

  static getEventsType(lang) {
    return $api.get(`events/type_of_events?lang=${lang}`);
  }

  static getInterview({
    published_date_start,
    published_date_end,
    search,
    limit,
    offset,
    lang,
  }) {
    return $api.get(
      `interview/filter/preview?lang=${lang}&published_date_start=${published_date_start}&published_date_end=${published_date_end}&search=${search}&limit=${limit}&offset=${offset}`,
    );
  }

  static getOneInterview(id, lang, signal) {
    return $api.get(`interview/body?id=${id}&lang=${lang}`, {
      signal,
    });
  }

  static getFaq({ published_date, direction, search, limit, offset, lang }) {
    return $api.get(
      `for_bloods/filter?lang=${lang}&published_date=${published_date}&direction=${direction}&search=${search}&limit=${limit}&offset=${offset}`,
    );
  }

  static getFaqDirection(lang) {
    return $api.get(`for_bloods/direction?lang=${lang}`);
  }
}
