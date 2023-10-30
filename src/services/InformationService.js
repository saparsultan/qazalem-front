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

  static getKazakhInvestContent(lng) {
    return $api.get(`kazakh_invest/content?lang=${lng}`);
  }
  static getAstanaHubContent(lng) {
    return $api.get(`astana_hub/content?lang=${lng}`);
  }
}

export class ServicesService {
  static getVisitedKazakhstan(lng) {
    return $api.get(`kazakh_tourism/visited_kazakhstana?lang=${lng}`);
  }
  static getVisitedKazakhstanFuture(lng) {
    return $api.get(
      `kazakh_tourism/visited_kazakhstana_in_the_future?lang=${lng}`,
    );
  }
  static getKazakhstanBrands(lng) {
    return $api.get(
      `kazakh_tourism/kazakhstani_brands_or_products?lang=${lng}`,
    );
  }
  static getKazakhstanCulture(lng) {
    return $api.get(
      `kazakh_tourism/culture_and_history_kazakhstanapi?lang=${lng}`,
    );
  }
  static getKazakhstanAttracts(lng) {
    return $api.get(`kazakh_tourism/attracts_in_kazakhstana?lang=${lng}`);
  }
  static getKazakhTourismAnalytics(lng) {
    return $api.get(`kazakh_tourism/analytics?lang=${lng}`);
  }
  static async kazakhTourismRegister(data) {
    return $api.post("kazakh_tourism/form", data);
  }
}
