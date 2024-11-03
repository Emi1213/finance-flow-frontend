import { SignUpView } from "@/features/auth/presentation/views/signUp-view";
import { Navbar } from "@/shared/components/navbar-login";

const SingUpPage = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="h-3/4 justify-center items-center pt-14 px-14">
        <SignUpView />
      </div>
    </div>
  );
};

export default SingUpPage;
