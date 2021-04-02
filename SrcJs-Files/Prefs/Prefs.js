import { useAsyncStorage } from "@react-native-async-storage/async-storage";

class Prefs {

    async save(key,value) {
      try {
        await useAsyncStorage(key).setItem(value);
      } catch (error) {
        // Error saving data
      }
    }
  
    async get(key) {
      try {
        const value = await  useAsyncStorage(key).getItem();
        return value;
      } catch (error) {
        // Error saving data
      }
    }
  };
  const p = new Prefs();
  export default p;
  
  