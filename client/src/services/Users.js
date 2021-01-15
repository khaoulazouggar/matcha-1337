import Axios from "axios";
// eslint-disable-next-line
export default {
  checktoken(token) {
    return new Promise((resolve, reject) => {
      Axios.post("http://localhost:3001/token", { token: token }).then((res) => {
        if (res.data.message === "token not found") {
          resolve("0");
        } else if (res.data.message === "Done") {
          resolve("1");
        }
      });
    });
  },

  //   register() {},
};
