function isUsername(username) {
    const re = /^[a-zA-Z0-9]{3,24}$/;
    return re.test(String(username));
  }
   export default isUsername