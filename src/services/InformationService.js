import $api from "@/utils/http";

export default class InformationService {
  static getAboutCountryCategory(lng) {
    return $api.get(`about_kazakhstan/category?lang=${lng}`);
  }

  static getAboutCountryContent(id, lng) {
    return $api.get(`about_kazakhstan/category/content?lang=${lng}&id=${id}`);
  }
}
