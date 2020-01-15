import Validator from "validator";
import isEmpty from "./isEmpty";

interface Input {
  email: string;
  password: string;
}

function validateRegisterInput(data: Input) {
  const errors: Input | object = {};
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    (errors as Input).email = "The email is required";
  }
  if (!Validator.isEmail(data.email)) {
    (errors as Input).email = "The email is invalid";
  }
  if (
    !Validator.isLength(data.password, {
      min: 5,
      max: 30,
    })
  ) {
    (errors as Input).password = "The password must contain between 5 and 30 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
}
export { validateRegisterInput };
