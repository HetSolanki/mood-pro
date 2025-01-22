import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div>
      <SignIn signUpUrl="sign-up" />
    </div>
  );
};

export default SignInPage;
