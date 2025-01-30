import { SignUp } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
};

export default SignInPage;
