/**
 * Get memes pictures
 * @param {number} length
 * @returns {Promise<Array<{ title: string, url:string }>}
 */
 export const getImages = (length = 10) => {
    return fetch(`https://api.imgflip.com/get_memes`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        let arr = [];
        response.data.memes.slice(0, length).forEach((item) => {
          arr.push({
            path: item.url,
            name: item.name
          });
        });
        return arr;
      });
  };
  