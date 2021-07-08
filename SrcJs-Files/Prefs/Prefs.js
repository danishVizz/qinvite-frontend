import { useAsyncStorage } from "@react-native-async-storage/async-storage";

class Prefs {

    async save(key,value) {
      try {
        await useAsyncStorage(key).setItem(value);
      } catch (error) {
        console.log('PREFS save ERROR')
        console.log(error)
        // Error saving data
      }
    }
  
    async get(key) {
      try {
        const value = await  useAsyncStorage(key).getItem();
        return value;
      } catch (error) {
        // Error saving data
        console.log('PREFS get ERROR')
        console.log(error)
      }
    }
  };
  const p = new Prefs();
  export default p;
  
  