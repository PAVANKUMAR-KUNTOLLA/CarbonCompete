import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from '../../redux/products/produtsSlice'; // Import setProducts action creator
import Page from "./../../components/Page";
import BlogPost from "../../components/Product";
import { useNavigate } from "react-router-dom";
import LineChartV3 from "../../components/charts/LineChartV3";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Get dispatch function from useDispatch

  // Use useSelector to get products from Redux store
  const products = useSelector((state) => state.products.products);

  return (
    <>
      <Page title="home">
        <div className="max-w-screen-xl mx-auto">
        <div className="mt-10 mb-10 xl:w-full flex justify-center">
            <LineChartV3 />
          </div>
          <div
            className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 md:grid-cols-2 lg:ml-20 md:ml-10"
            style={{ marginTop: 0 }}
          >
            {products.map((product) => (
              <BlogPost key={product.id} product={product}/>
            ))}
          </div>
        </div>
      </Page>
    </>
  );
};

export default HomePage;
