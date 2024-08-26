'use client';

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      console.log(response)
      localStorage.setItem("token", response.data.user.access_token);
      localStorage.setItem("userId", response.data.user.id);
      router.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side image */}
      <div className="md:flex w-1/2 h-full bg-[url('loginImg.png')] bg-cover">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bottom-64 flex flex-col justify-center items-center">
            <Image
              src="/LOGOW.webp"
              alt="Logo"
              width={200}
              height={200}
            />
            <h2 className="text-4xl font-normal text-white mt-2">Intranet</h2>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="w-1/2">
          <div className="flex justify-center">
            <Image
              src="/LOGOB.webp"
              alt="Logo"
              width={200}
              height={200}
            />
          </div>
          <h2 className="text-2xl text-center mt-4 font-bold">Entrar</h2>
          <form className="mt-8 w-full"  onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                placeholder="Digite sua senha"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              Entrar
            </button>

            <div className="text-center mt-4">
              <a href="#" className="text-base text-gray-600 hover:text-gray-900">
                Esqueceu a senha?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
