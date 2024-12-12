import axios from "axios";
import React from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { productsFetch, uploadImageFetch } from "../constant/api";

const ProductUpload = () => {
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
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

  const onSubmit = async (data) => {
    if (!data.image) {
      console.error("No image selected.");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);
    try {
      const response = await axios.post(uploadImageFetch, formData);
      const imagePath = response.data.filePath;

      const productData = {
        name: data.name,
        count: data.count,
        caption: data.caption,
        moreInfo: data.moreInfo,
        imagePath: imagePath,
      };

      await axios.post(productsFetch, productData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Product data submitted successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
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
          className="w-full border-2 border-dashed border-gray-300 p-4 cursor-pointer"
        >
          <label>image : </label>
          <input {...getInputProps()} />

          {!!getValues("image") ? (
            <p className="text-green-500">{getValues("image")[0].name}</p>
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
