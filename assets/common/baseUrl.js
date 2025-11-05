import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://192.168.1.13:3000")
    : (baseURL = "http://192.168.1.13:3000");
}

export default baseURL;
