import React, { useEffect } from "react";
import { data, useNavigate, useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "../components/login";
import Signup from "../components/signup";
import { UrlState } from "../context";

const Auth = () => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = UrlState();
  const longLink = searchParams.get("createNew");

  useEffect(() => {
    if (isAuthenticated && !loading)
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
  }, [isAuthenticated, loading, navigate]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center">
        {longLink ? "Hold up! Let's login first.." : "Login / Signup"}
      </h1>
      <Tabs defaultValue="login" className="w-full max-w-md px-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
