import { SignUp } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div>
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default SignInPage;
