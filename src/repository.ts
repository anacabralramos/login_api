var knex = require("./database/connection");

const repositorySignup = async (profile: any) => {
  try {
    var query = await knex
      .insert({
        email: `${profile.email}`,
        name: `${profile.name}`,
        password: `${profile.password}`,
      })
      .into("profile");

    return {
      message: "User registered successfully!!! :D",
    };
  } catch (error: any) {
    throw { message: `Ops! Email provided already exists 'o'` };
  }
};

const repositoryGetProfile = async (email: string) => {
  var query = await knex
    .select()
    .table("profile")
    .where({ email: `${email}` })
    .first();

  return query;
};

export default { repositorySignup, repositoryGetProfile };
