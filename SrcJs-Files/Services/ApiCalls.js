
const Base_url = 'http://207.180.212.174:8080/qinvite/api/';

class ApiCalls{
  
      async postApicall(formadata,apiname) {
        try {
            var fullurl=Base_url+apiname;
            console.log(fullurl);
            console.log(formadata);

          let logindata = await fetch(fullurl, {
            method: 'POST',
            
            body: formadata
          });
    
          let result = await logindata
          return result.json();
        }
        catch (error) {
          console.log("error" +error)
          throw error.message;
        }
      }


      async getapicall(apiname,query) {
        try {
          var fullurl=Base_url+apiname;
          let codeData = await fetch(`${fullurl}?user_id=${query}`, {
            method: 'GET',
            // headers: {
            //   'Accept': 'application/json',
            //   'Content-Type': 'application/json',
            //   'Authorization': token
            // },
          });
    
          let result = await codeData
          return result.json()
    
        }
        catch (error) {
          console.log(error)
          throw error.message;
        }
      }

      async getGenericCall(apiname,query) {
        try {
          var fullurl=Base_url+apiname;
          let codeData = await fetch(`${fullurl}`+query, {
            method: 'GET',
            // headers: {
            //   'Accept': 'application/json',
            //   'Content-Type': 'application/json',
            //   'Authorization': token
            // },
          });
    
          let result = await codeData
          return result.json()
    
        }
        catch (error) {
          console.log(error)
          throw error.message;
        }
      }

      async deletapicall(apiname,query) {
        try {
          var fullurl=Base_url+apiname+"/";
          let codeData = await fetch(`${fullurl}${query}`, {
            method: 'DELETE',
            // headers: {
            //   'Accept': 'application/json',
            //   'Content-Type': 'application/json',
            //   'Authorization': token
            // },
          });
          console.log(codeData.url)
    
          let result = await codeData
          return result.json()
    
        }
        catch (error) {
          console.log(error)
          throw error.message;
        }
      }
    
}
const b = new ApiCalls();
export default b;