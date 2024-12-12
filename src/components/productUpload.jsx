import { CircularProgress } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { productsFetch, uploadImageFetch } from "../constant/api";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

const ProductUpload = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const { startRequest, loading } = useAxios();
  const { startRequest: imageRequest, loading: imageLoading } = useAxios();

  const inputs = [
    { id: 1, name: "name", placeHolder: "Product Name", type: "text" },
    { id: 2, name: "count", placeHolder: "Count", type: "number" },
  ];

  const textarea = [
    { id: 4, name: "caption", placeHolder: "Product caption" },
    { id: 5, name: "moreInfo", placeHolder: "Product Info" },
  ];

  const onDrop = (acceptedFiles) => {
    setValue("image", acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const onSubmit = async (userData) => {
    const formData = new FormData();
    formData.append("image", userData.image[0]);

    const responseImage = await imageRequest({
      method: "POST",
      url: uploadImageFetch,
      data: formData,
    });

    if (responseImage) {
      const productData = {
        name: userData.name,
        count: userData.count,
        caption: userData.caption,
        moreInfo: userData.moreInfo,
        imagePath: responseImage?.filePath,
      };
      await startRequest({
        method: "POST",
        url: productsFetch,
        data: productData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("product uploaded!");
      reset();
    } else {
      toast.error("faild to upload image!");
    }
  };

  return (
    <div className="container mx-auto p-4 md:w-[600px]">
      <h2 className="text-2xl font-bold mb-4">Upload new Product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-4"
      >
        <div
          {...getRootProps()}
          className={
            !!errors["image"]?.type
              ? "w-full border-2 border-red-500  p-4 cursor-pointer"
              : "w-full border-2 border-dashed border-gray-300 p-4 cursor-pointer"
          }
        >
          <label>image</label>
          <input
            className="w-full"
            {...register("image", { required: true })}
            {...getInputProps()}
          />

          {!!getValues("image") ? (
            <p className="text-green-500">{getValues("image")[0].name}</p>
          ) : (
            <p className="text-gray-400">
              Drag and drop a image here, or click to select a image
            </p>
          )}
        </div>
        {inputs.map((item) => (
          <input
            type={item.type}
            key={item.id}
            placeholder={item.placeHolder}
            {...register(`${item.name}`, { required: true })}
            className="border border-gray-300 p-2 w-full"
          />
        ))}
        {textarea.map((item) => (
          <textarea
            key={item.id}
            placeholder={item.placeHolder}
            {...register(`${item.name}`, { required: true })}
            className="border border-gray-300 p-2 w-full"
          ></textarea>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {loading || imageLoading ? (
            <CircularProgress size="30px" color="inherit" />
          ) : (
            " Upload Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
