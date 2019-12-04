import { FormGroup } from '@angular/forms';

export class Validator {

  static getValidatorErrorMessage(code: string) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.'
    };
    return config[code];
  }
  //'^(?:[1-9][0-9]{0,2}(?:\.\d{1,2})?|10000|10000.00)$/' amount less than 10000.
  static amountValidator(control) {
    if (control.value) {
      if (control.value.toString().match(/^(?:[1-9][0-9]{0,2}(?:\.\d{1,2})?|10000|10000.00)$/)) {
        return null;
      }
      else {
        return { 'invalidAmount': true };
      }
    }
  }

  static trimSpaces(value: string) {
    if (value) {
      value = value.replace(/^\s+|\s+$/g, '');
    }
    return value;
  }

  static validatePrice(price: string) {
    if (price) {
      if (price.match(/^(?:[1-9][0-9]{0,2}(?:\.\d{1,2})?|10000|10000.00)$/))
        return true;
    }
    return false;
  }

  static validateJSON(text: string) {
    if (text) {
      if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
        return true;
    }
    return false;
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }
  // ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$
  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.length > 0) {
      // if (control.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      if (control.value.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    }
  }

  static phoneValidator(control) {
    if (control.value && control.value.length > 0) {
      if (control.value.match(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)) {
        return null;
      } else {
        return { 'invalidPhoneNumber': true };
      }
    }
  }

  static mobileValidator(control) {
    if (control.value.length > 0) {
      if (control.value.match(/^(\+\d{1,3}[- ]?)?\d{8,15}$/)) {
        return null;
      } else {
        return { 'invalidPhoneNumber': true };
      }
    }
  }

  static imeiValidator(control) {
    if (control.value && control.value.length > 0) {
      if (control.value.match(/([0-9]{15,16})/)) {
        return null;
      } else {
        return { 'invalidIMEINumber': true };
      }
    }
  }

  static vinValidator(control) {
    if (control.value && control.value.length > 0) {
      if (control.value.match(/([A-Za-z0-9]{17})/)) {
        return null;
      } else {
        return { 'invalidVinNumber': true };
      }
    }
  }

  static url(control) {
    if (control.value.length > 0) {
      if (control.value.match(/^(http|https):/)) {
        return null;
      } else {
        return { 'invalidurl': true };
      }
    }
  }

  static passwordValidator(control) {
    if (control.value && control.value.length > 0) {
      if (control.value.match(/^(?=.*).{8,}$/)) {
        return null;
      } else {
        return { 'invalidPassword': true };
      }
    }

    // // {6,100}           - Assert password is between 6 and 100 characters
    // // (?=.*[0-9])       - Assert a string has at least one number
    // //  if (control.value.match(/\d.*[A-Z]|[A-Z].*\d/)) {
    // if (control.value && control.value.length > 0) {
    //   if (control.value == null || control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)) {
    //     return null;
    //   } else {
    //     return { 'invalidPassword': true };
    //   }
    // }
  }

  static ValidateFile(control) {
    const ext = control.substring(control.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
      return null;
    }
    else {
      return { 'invalidImage': true };
    }
  }


  static ValidatePngFile(control) {
    const ext = control.substring(control.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png') {
      return null;
    }
    else {
      return { 'invalidImage': true };
    }
  }


  static ageValidator(control) {
    if (control.value < 120 && control.value > 0) {
      return null;
    } else {
      if (control.value)
        return { 'invalidAge': true };
    }
  }


  static dropdownListValidator(control) {
    if (control.value == 'Select Title') {
      return { 'chooseOption': true };
    }
    else {
      return null;
    }
  }
  static required(control) {
    // return (control.value.toString().trim() == "") ?
    //   { "required": true } :
    //   null;
    if (!control.value || typeof control.value === 'string' && !control.value.trim()) {
      return {
        required: true
      };
    }
    return null;
  }
  static timeFormat(control) {
    if (control.value && control.value.match(/^[0-9]{1,2}:[0-9]{2} [A|P]M/g)) {
      return null;
    } else {
      return {
        'invalidTimeFormat': true
      };
    }
  }
}


export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string, oldPasswordKey: string = '') {
  return (group: FormGroup) => {
    let passwordInput = group.controls[passwordKey];
    let passwordConfirmationInput = group.controls[passwordConfirmationKey];
    if (oldPasswordKey != '') {
      let oldPasswordInput = group.controls[oldPasswordKey];
      if (passwordInput.value == oldPasswordInput.value && oldPasswordInput.value != '') {
        return passwordInput.setErrors({ Equivalent: true })
      }
    }
    if (passwordInput.value !== passwordConfirmationInput.value) {
      return passwordConfirmationInput.setErrors({ notEquivalent: true })
    }
    // else {
    //   return passwordConfirmationInput.setErrors({ notEquivalent: false })
    // }
  }
}
export function matchPassword(fg: FormGroup) {
  return fg.get('password').value === fg.get('confirmPassword').value ? null : { 'mismatch': true };
}
