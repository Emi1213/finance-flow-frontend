import { LoginView } from "../../features/auth/presentation/views/login-view";

import { Navbar } from "@/shared/components/navbar-login";

const LoginPage = () => {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="h-3/4 justify-center items-center pt-14 px-14">
        <LoginView />
      </div>
    </div>
  );
};

export default LoginPage;
