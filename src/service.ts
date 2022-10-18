import jwt from "jsonwebtoken";
import repository from "./repository";
import * as bcrypt from "bcrypt";

// type JwtPayload = {
//   id: string;
// };

interface UserPayload {
  id: string;
}

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

const profile = async (authorization: undefined | string) => {
  if (!authorization) {
    throw { message: `Ops! Não autorizado 'o'` };
  }

  const token = authorization.split(" ")[1];
  // console.log(token);

  // let isJWTValid = false;
  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as UserPayload;
  //   if (err) {
  //     console.log("Houve erro");
  //     console.log(token);

  console.log(id);
  //     return err;
  //   }
  //   isJWTValid = true;
  // });
  // console.log("é válido: " + isJWTValid);

  // try {
  //   console.log("preto");
  //   const decoded = jwt.verify(token, process.env.JWT_PASS!) as UserPayload;
  //   console.log("preto");
  //   const { id } = decoded;
  // } catch (error) {
  //   throw { message: `Ops! Não autorizado 'o'` };
  // }

  const user = await repository.repositoryGetProfile(id);
  // console.log(user);
  if (!user) throw { message: `Ops! Não autorizado 'o'` };
  // console.log(user);

  const { password: _, ...loggedUser } = user;
  return loggedUser;
};

export default { serviceSignup, serviceSignin, profile };
