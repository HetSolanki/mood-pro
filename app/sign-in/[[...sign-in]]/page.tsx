import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignIn signUpUrl="sign-up" />
    </div>
  );
};

export default SignInPage;
