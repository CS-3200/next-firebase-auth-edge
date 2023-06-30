'use client'
import "./globals.css";
import { Raleway, Dancing_Script } from "next/font/google";
import { AuthProvider } from "../auth/client-auth-provider";
import { FirestoreProvider } from "../firestore/context";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body 
       suppressHydrationWarning={true} 
      className={`${raleway.variable} ${dancing.variable} text-gray-900 font-sans mx-auto flex justify-center bg-gray-50`}>
      <main className="flex flex-col items-center container bg-gradient-to-br from-pink-50 to-pink-100 px-4">
            <div className="justify-center mx-auto mt-5 mb-2 font-serif text-4xl">
              <p>{`Britt & Alexander`}</p>
            </div>
            <div className="mb-8">
              <p className="font-serif text-lg text-gray-600">
                Wer kennt das Brautpaar am besten?
              </p>
            </div>
            <AuthProvider defaultTenant={null}>

            {children}
          </AuthProvider>
          </main>
      </body>
    </html>
  );
}
