export function GetData(hash) {
  let BaseUrl = "http://192.168.43.183/api/";

  return new Promise((resolve, reject) => {
    fetch(BaseUrl + hash, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJSON => {
        // return responseJSON.data;
        resolve(responseJSON);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function PostData(hash, data) {
  let BaseUrl = "http://sheethub.cluster/";

  return new Promise((resolve, reject) => {
    fetch(BaseUrl + hash, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJSON => {
        // return responseJSON.data;
        resolve(responseJSON);
      })
      .catch(error => {
        // console.log(error)
        reject(error);
      });
  });
}
