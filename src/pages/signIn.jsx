import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import SignInForm from "../components/signInForm";
import { userApi } from "../constant/api";
import { LOGIN_ROUTE } from "../constant/routes";
import useAxios from "../hooks/useAxios";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const { startRequest, loading } = useAxios();

  const onSubmit = (data) => {
    const randomId = uuidv4();
    const postData = {
      id: randomId,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    startRequest({
      method: "POST",
      url: `${userApi}`,
      data: postData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        toast.success("your account created");
      })
      .catch(() => toast.error("try again"));

    setTimeout(() => {
      navigate(LOGIN_ROUTE);
    }, 1000);
  };

  return (
    <>
      <SignInForm
        formTitle={"Sign In"}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        loading={loading}
      />
      <Link to={LOGIN_ROUTE} className="block text-center">
        login
      </Link>
    </>
  );
};

export default SignIn;
