import $api from "@/utils/http";

export default class HomeService {
  static getPartners() {
    return $api.get("partners/");
  }
}
