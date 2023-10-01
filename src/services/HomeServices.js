import $api from "@/utils/http";

export default class HomeService {
  static getSliderMain(lang, limit) {
    return $api.get(`slider/all?lang=${lang}&limit=${limit}`);
  }
  static getSocial(limit) {
    return $api.get(`social_site?limit=${limit}`);
  }
  static getPartners() {
    return $api.get("partners");
  }
}
