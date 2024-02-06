"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";

interface IProps {
  url: string;
  icon: React.ReactNode;
}
// we saperate this button to render the whole navbar on the server using server components ,left the interactive part on the client-ide
const NavigationBtn: FC<IProps> = ({ url, icon }) => {
  const { lang } = useParams();
  return <Link href={`${lang}/${url}`}>{icon}</Link>;
};

export default NavigationBtn;
