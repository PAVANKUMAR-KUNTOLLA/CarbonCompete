import React from "react";
import { useNavigate } from "react-router-dom";

const BlogPost = ({ product }) => {

  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }; // Include hour and minute
    return date.toLocaleDateString("en-US", options);
  };

  const handleArticleClick = () => {
    // Dynamically construct the URL with the product ID and navigate to it
    navigate(`/app/productview/${product._id}`);
  };

  return (
    // <article className="flex max-w-xl flex-col items-start justify-between">
    <article key={product._id} class="flex max-w-xl flex-col items-start justify-between cursor-pointer" onClick={handleArticleClick}>
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={product.createdAt} className="text-gray-500">
          {formatDate(product.createdAt)}
        </time>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          {product.name}
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {product.description}
        </p>
      </div>
      <div className="relative mt-8">
        <p className="font-semibold text-gray-900">
          Total Carbon Footprint: {parseFloat(product.totalCarbonFootprint).toFixed(2)} tonnes of CO2e
        </p>
      </div>
    </article>
  );
};

export default BlogPost;
