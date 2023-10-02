import axios from "axios";
import $api from "@/utils/http";

export default class HomeService {
  static getSliderMain(lang, limit) {
    return $api.get(`slider/all?lang=${lang}&limit=${limit}`);
  }
  static getSocial(limit) {
    return $api.get(`social_site?limit=${limit}`);
  }
  static async getYoutubeVideos(part, channelId, maxResults, order, key) {
    return await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=${part}&channelId=${channelId}&maxResults=${maxResults}&order=${order}&key=${key}`,
    );
  }

  static getPartners() {
    return $api.get("partners");
  }
}
