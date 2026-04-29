import { Platform } from 'react-native'


let fastAPI_Url = '';

{Platform.OS == 'android'
//? fastAPI_Url = 'http://192.168.0.110:8000'
//: fastAPI_Url = 'http://192.168.0.110:8000'
? fastAPI_Url = 'https://incredi-bills-server-side.vercel.app/api'
: fastAPI_Url = 'https://incredi-bills-server-side.vercel.app/api'
}

export default fastAPI_Url;