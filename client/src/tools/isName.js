function isName(name) {
    const re = /^[a-zA-Z]{3,24}$/;
    return re.test(String(name));
  }
   export default isName