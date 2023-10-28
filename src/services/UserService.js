import $api, { $apiPrivate } from "@/utils/http";

export default class UserService {
  static getUserMain(id, token) {
    return $api.get(`user/profile/main/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getUserPersonal(id, token) {
    return $api.get(`user/profile/personal/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getUserSocial(id, token) {
    return $apiPrivate.get(`user/profile/social/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static getUserAdditional(id, token) {
    return $apiPrivate.get(`user/profile/additional/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  static updateMain(id, token, data) {
    return $api.put(`user/profile/main/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static updatePersonal(id, token, data) {
    return $api.put(`user/profile/personal/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static updateSocial(id, token, data) {
    return $apiPrivate.put(`user/profile/social/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static updateAdditional(id, token, data) {
    return $apiPrivate.put(`user/profile/additional/${id}`, data, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static registerEvents(data) {
    return $apiPrivate.post("events/register_events", data);
  }
  static getSelectEvents(lang) {
    return $apiPrivate.get(`events/select_events?lang=${lang}`);
  }
}
