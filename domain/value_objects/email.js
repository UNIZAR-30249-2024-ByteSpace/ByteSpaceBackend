// /domain/value_objects/email.js

class Email {
    constructor(value) {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(value)) {
        throw new Error('El formato del email no es válido');
      }
      this.value = value;
    }
  
    toString() {
      return this.value;
    }
  }
  
  module.exports = Email;
  