import * as yup from "yup";

const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email 'o'")
    .required("Email is required ;)"),
  password: yup
    .string()
    .length(8, "Your password must be 8 characters long ;)")
    .matches(
      /^((?=.*[\W]){1})(?=.*\d)((?=.*[A-Z]){1}).*$/,
      "The password must contain at least one capital letter, one number and one special character"
    )
    .required("Password is required ;)"),
});

export { signinSchema };
