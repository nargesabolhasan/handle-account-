import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo } from "../store/actions/userAction";
import SignInForm from "../components/signInForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import { userApi } from "../constant/api";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const { startRequest, loading } = useAxios();

  const onSubmit = (data) => {
    startRequest({
      method: "PATCH",
      url: `${userApi}/${userInfo.id}`,
      data: {
        username: data.username,
        email: data.email,
        Password: data.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      toast.success("update your profile is done ");
      dispatch(
        addUserInfo({
          id: userInfo.id,
          username: data.username,
          email: data.email,
          Password: data.password,
        })
      );
    });
  };

  return (
    <div>
      <SignInForm
        formTitle={
          <>
            <AccountCircleIcon />
            edit profile
          </>
        }
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        emailDefaultValue={userInfo.email}
        usernameDefaultValue={userInfo.username}
        passwordDefaultValue={userInfo.password}
        loading={loading}
      />
    </div>
  );
};

export default Profile;
