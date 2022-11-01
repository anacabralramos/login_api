import repository from "./repository";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const serviceSignup = async (profile: any) => {
  const passwordHash = await bcrypt.hash(profile.password, 8);

  const result = repository.repositorySignup({
    email: profile.email,
    name: profile.name,
    password: passwordHash,
  });

  return result;
};

const serviceSignin = async (profile: any) => {
  const user = await repository.repositoryGetProfile(profile.email);

  if (!user) throw { message: `Ops! Email does not exist 'o'` };

  const verifyPassword = await bcrypt.compare(profile.password, user.password);
  if (!verifyPassword) {
    throw { message: `Ops! Incorrect email or password 'o'` };
  }

  const token = jwt.sign({ id: user.email }, process.env.JWT_PASS ?? "", {
    expiresIn: 60 * 60,
  });

  return { message: "Login success ;D", token };
};

const profile = async (id: string) => {
  console.log("id: ");
  console.log(id);

  const user = await repository.repositoryGetProfile(id);

  if (!user) throw { message: `Usuário inexistente! 'o'` };
  delete user.password;

  return user;
};

export default { serviceSignup, serviceSignin, profile };
