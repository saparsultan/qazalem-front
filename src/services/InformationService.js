import $api from "@/utils/http";

export default class InformationService {
  static getSOSCountry(lng) {
    return $api.get(`sos/counrty?lang=${lng}`);
  }
  static async SOSRegister(data) {
    return $api.post("sos/register", data);
  }
  static getAboutCountryCategory(lng) {
    return $api.get(`about_kazakhstan/category?lang=${lng}`);
  }
  static getAboutCountryContent(id, lng) {
    return $api.get(`about_kazakhstan/category/content?lang=${lng}&id=${id}`);
  }
  static getHelpfulInformationCategory(lng, limit) {
    return $api.get(`usefull_information/category?lang=${lng}&limit=${limit}`);
  }
  static getHelpfulInformationContent(id, lng) {
    return $api.get(`usefull_information/content?lang=${lng}&id=${id}`);
  }
}
