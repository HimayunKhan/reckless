
// export const authOptions: AuthOptions = {
// 	providers: [
// 	  CredentialsProvider({
// 		name: 'Credentials',
// 		credentials: {
// 		  email: { label: "Email", type: "text" },
// 		  password: { label: "Password", type: "password" }
// 		},
// 		async authorize(credentials, req) {
// 		  dbConnect(); // Connect to the database
  
// 		  const { email, password } = credentials;
  
// 		  const user = await User.findOne({ email }).select("+password");
  
// 		  if (!user) {
// 			throw new Error("Invalid Email or Password");
// 		  }
  
// 		  const isPasswordMatched = await bcrypt.compare(
// 			password,
// 			user.password
// 		  );
  
// 		  if (!isPasswordMatched) {
// 			throw new Error("Invalid Email or Password");
// 		  }
  
// 		  // Return the authenticated user
// 		  return { ...user._doc, id: user._id.toString() };
// 		}
// 	  })
// 	],
// 	session: { strategy: "jwt" },
// 	pages: {
// 	  signIn: "/login",
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
//   };