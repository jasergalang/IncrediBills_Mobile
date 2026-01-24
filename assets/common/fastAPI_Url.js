import { Platform } from 'react-native'


let fastAPI_Url = '';

{Platform.OS == 'android'
? fastAPI_Url = 'http://192.168.0.100:8000'
: fastAPI_Url = 'http://192.168.0.100:8000'
}

export default fastAPI_Url;