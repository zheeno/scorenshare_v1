export function GetData(hash) {
  let BaseUrl = "https://scroenshare.com/api/";

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
  let BaseUrl = "https://scroenshare.com/";

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
