import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Subscription,
  Root,
  PubSub,
  PubSubEngine
} from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  // the second parm {} is optional tweaking
  @Query(() => String)
  async hello(@PubSub() pb: PubSubEngine) {
    return "Hello World";
  }

  @Query(() => User)
  async getByEmail(@Arg("email") email: string) {
    return await User.findOne({ email: email });
  }

  @Mutation(() => User)
  async register(
    @Arg("data") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();
    console.log("create user", user);
    return user;
  }

  @Subscription(() => String, {
    topics: "NOTIFY",
    filter: ({ payload, args }) => payload.includes(args.id)
  })
  async mySub(
    @Root() payload: string,
    @Arg("id", type => String)
    id: string = ""
  ) {
    return payload;
  }
}
