const axios = require('axios');
const FormData = require('form-data');

const convertImage = async (req, res, next) => {
  if (req.body.image) {
    const form = new FormData();
    form.append('image', req.body.image);
    axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload?key=6dbae2cbd90698b82f2c5f7938af970d',
      data: form,
      headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}` },
    })
      .then((res) => {
        req.body.image = res.data.data.url;
        next();
      })
      .catch((error) => {
        console.error(error);
        console.log("it's fucket tard");
        next();
      });
  } else {
    next;
  }
};

module.exports = {
  convertImage,
};
