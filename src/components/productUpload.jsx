import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { productsFetch } from "../constant/api";
import { toast, Toaster } from "react-hot-toast";

const ProductUpload = () => {
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const inputs = [
    { id: 1, name: "name", placeHolder: "Product Name", type: "text" },
    { id: 2, name: "count", placeHolder: "Count", type: "number" },
  ];

  const textarea = [
    { id: 4, name: "caption", placeHolder: "Product caption" },
    { id: 5, name: "Info", placeHolder: "Product Info" },
  ];

  const onDrop = (acceptedFiles) => {
    setValue("file", acceptedFiles);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("name", data.name);
    formData.append("count", data.count);
    formData.append("info", data.info);

    try {
      await axios.post(productsFetch, {
        name: data.name,
        count: data.count,
        info: data.info,
        imagePath: data.file[0].name,
      });
      toast.success("Product uploaded successfully");
      reset();
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Failed to upload product");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div className="container mx-auto p-4 md:w-[600px]">
      <h2 className="text-2xl font-bold mb-4">Upload new Product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-4"
      >
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-4 cursor-pointer"
        >
          <label>image : </label>
          <input {...getInputProps()} />

          {!!getValues("file") ? (
            <p className="text-green-500">{getValues("file")[0].name}</p>
          ) : (
            <p className="text-gray-400">
              Drag and drop a imge here, or click to select a image
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
          Upload Product
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default ProductUpload;
