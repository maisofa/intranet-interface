'use client';

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      console.log(response)
      localStorage.setItem("token", response.data.user.access_token);
      localStorage.setItem("userId", response.data.user.id);
      //router.push("/events");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const send = () => {
    router.push("/events");
  }

  return (
    <div className="flex h-screen">
      {/* Left side image */}
      <div className="md:flex w-1/2 h-full bg-[url('loginImg.png')] bg-cover">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bottom-64 flex flex-col justify-center items-center">
            <img src="https://static.wixstatic.com/media/7b141e_74124efc9e054ae7b98c9038549ec9b7~mv2.png/v1/fill/w_270,h_45,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/LOGO%20PNG%20-%20BRANCA.png" 
              alt="" 
              className="w-96"
            />
            <h2 className="text-4xl font-normal text-white mt-2">Intranet</h2>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex w-full md:w-1/2 justify-center items-center">
        <div className="w-1/2">
          <div className="flex justify-center">
            <img src="https://static.wixstatic.com/media/7b141e_bbe9c27f29bd4a4e943034d0a8f4fe72~mv2.png/v1/fill/w_161,h_27,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/LOGO%20PNG%20-%20PRETO.png" 
              alt="" 
              className="w-80 h-100 object-cover " 
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
                Password
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
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              Entrar
            </button>

            <div className="text-center mt-4">
              <a href="#" className="text-lg text-gray-600 hover:text-gray-900">
                Esqueceu a senha?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
