import service from "../service";

// SERVICE
describe("Service functions() ", () => {
  test("Signup function", async () => {
    const res = await service.serviceSignup({
      name: "Maria",
      email: "maria@rethink.dev",
      password: "aS1d@134",
      confirmPassword: "aS1d@134",
    });
    expect(res).toHaveProperty("message");
    expect(res.message).toBe("User registered successfully!!! :D");
  });

  test("Signin function", async () => {
    const res = await service.serviceSignin({
      email: "ana.cc.ramos@rethink.dev",
      password: "as1d@G34",
    });
    expect(res).toHaveProperty("message");
    expect(res).toHaveProperty("token");
    expect(res.message).toBe("Login success ;D");
  });

  test("Profile", async () => {
    const res = await service.profile("ana.cc.ramos@rethink.dev");
    expect(res).toHaveProperty("email");
    expect(res).toHaveProperty("name");
    expect(res.email).toBe("ana.cc.ramos@rethink.dev");
    expect(res.name).toBe("Ana CLeures");
  });
});
