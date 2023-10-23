import $api from "@/utils/http";

export default class InformationService {
  static getAbout(lng) {
    return $api.get(`about_us/about_us?lang=${lng}`);
  }
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
  static getAboutCountrySubContent(id, lng) {
    return $api.get(
      `about_kazakhstan/subcategory/content?lang=${lng}&id=${id}`,
    );
  }
  static getRegionsCategory(lng) {
    return $api.get(`regions/category?lang=${lng}`);
  }
  static getRegionsContent(id, lng) {
    return $api.get(`regions/category/content?lang=${lng}&id=${id}`);
  }
  static getHelpfulInformationCategory(lng, limit) {
    return $api.get(`usefull_information/category?lang=${lng}&limit=${limit}`);
  }
  static getHelpfulInformationContent(id, lng) {
    return $api.get(`usefull_information/content?lang=${lng}&id=${id}`);
  }
  static getCallCenters(lng) {
    return $api.get(`call_center/content?lang=${lng}`);
  }
}
