import { $apiPrivate } from "@/utils/http";

export default class UserService {
  static getUserMain(id) {
    return $apiPrivate.get(`user/profile/main/${id}`);
  }
  static getUserPersonal(id) {
    return $apiPrivate.get(`user/profile/personal/${id}`);
  }
  static getUserSocial(id) {
    return $apiPrivate.get(`user/profile/social/${id}`);
  }
  static getUserAdditional(id) {
    return $apiPrivate.get(`user/profile/additional/${id}`);
  }
  static updateMain(id, data) {
    return $apiPrivate.put(`user/profile/main/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  static updatePersonal(id, data) {
    return $apiPrivate.put(`user/profile/personal/${id}`, data);
  }
  static updateSocial(id, data) {
    return $apiPrivate.put(`user/profile/social/${id}`, data);
  }
  static updateAdditional(id, data) {
    return $apiPrivate.put(`user/profile/additional/${id}`, data);
  }
  static registerEvents(data) {
    return $apiPrivate.post("events/register_events", data);
  }
  static getSelectEvents(lang) {
    return $apiPrivate.get(`events/select_events?lang=${lang}`);
  }
}