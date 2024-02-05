"use client";

import { ReactNode } from "react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
export interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  function getData(): Promise<number> {
    const data = 5;
    return Promise.resolve(data);
  }
  const { data, isError } = useQuery({
    //    ^? const data: number | undefined
    queryKey: ["test"],
    queryFn: getData,
  });
  // console.log("test data", data);
  return (
    <button
      className={className}
      onClick={() => alert(`Hello from your ${appName} app!`)}
    >
      {children}
    </button>
  );
};
