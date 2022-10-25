import * as yup from "yup";

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([aA-zZ]+[aA-zZ\s]+)+$/, "Just letters in your name please ^^")
    .required("Name is required!!"),
  email: yup
    .string()
    .email("Invalid email 'o'")
    .required("Email is required ;)"),
  password: yup
    .string()
    .required("Password is required ;)")
    .length(8, "Your password must be 8 characters long ;)")
    .matches(
      /^((?=.*[\W]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
      "The password must contain at least one capital letter, one number and one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match 'o'")
    .required("ConfirmPassword is required ;)"),
});

export { signupSchema };
