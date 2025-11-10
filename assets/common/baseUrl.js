import { Platform } from "react-native";
import { BASEIP } from '@env';

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = `http://${BASEIP}:3000`)
    : (baseURL = `http://${BASEIP}:3000`);
}

export default baseURL;
