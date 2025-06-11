import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import useFetch from "../hooks/use-fetch";
import { useNavigate, useSearchParams } from "react-router";
import { UrlState } from "../context";

const Login = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const { data, error, loading, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();
  useEffect(() => {
    if (!error && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [data, error]);

  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters long")
          .required("Password is required"),
      });
      await schema.validate(formData, { abortEarly: false });
      // api call
      await fnLogin();
    } catch (error) {
      const newErrors = {};
      error.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>to your account if you've one</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className=" space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            className="border border-blue-400"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className=" space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            className="border border-blue-400"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin} className="cursor-pointer">
          {loading ? (
            <BeatLoader className=" size-10 items-center " color="#36d7b7" />
          ) : (
            "Login"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Login;
