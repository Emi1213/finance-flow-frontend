"use client";
import { Card } from "@nextui-org/card";

import { SignUpForm } from "../components/signup-form";
export const SignUpView = () => {
  return (
    <div className="h-full">
      <Card className="h-full py-8 mx-11">
        <div className="flex">
          <div className="w-1/2">
            <p className="text-center mt-4 text-2xl font-sans font-semibold">
              Gestiona tus finanzas de manera inteligente y eficiente.
            </p>
            <div className="flex justify-center items-center p-7">
              <img
                alt="icon"
                className=""
                src="https://web.mobills.com.br/static/media/mobills-path.f981a3d0.svg"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 pr-10 ">
            <div className="flex justify-center h-1/4 pt-4">
              <h2 className="text-4xl text-center font-bold">
                Registrate Ahora
              </h2>
            </div>
            <div className="flex justify-center items-center h-3/5 pb-4 w-full px-16">
              <SignUpForm />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
