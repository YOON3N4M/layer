import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/utils";
import ModalPortal from "@/components/modal/ModalPortal";
import ToastPortal from "@/components/toast/ToastPortal";
import Header from "@/components/Header";
import SideMenu from "@/components/SideMenu";
import CreateMemoButton from "@/components/CreateMemoButton";
import Controller from "@/components/Controller";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(pretendard.variable)}>
        <Header />
        <SideMenu />
        <Controller />
        <CreateMemoButton />
        {children}
        <ModalPortal />
        <ToastPortal />
      </body>
    </html>
  );
}
