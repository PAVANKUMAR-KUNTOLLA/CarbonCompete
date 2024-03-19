import React,{useEffect,useState} from 'react';
import { PencilIcon, TrashIcon,PaperClipIcon } from '@heroicons/react/solid';
import { setProducts } from '../redux/products/produtsSlice'; // Import setProducts action creator
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Api from './Api';


const ProductView = () => {

  const { id } = useParams();
  console.log(id)

  const dispatch = useDispatch(); // Get dispatch function from useDispatch
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);


  const products = useSelector((state) => state.products.products);
  const product = products.find(product => product._id === id);

  const editClick = () => {
    // Dynamically construct the URL with the product ID and navigate to it
    navigate(`/app/editProduct/${product._id}`);
  };

  const fetchProducts = async (searchTerm) => {
    try {
      const url = Api.products;
      const response = await axios.post(`http://localhost:8080${url}`, { search: searchTerm });
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }; // Include hour and minute
    return date.toLocaleDateString("en-US", options);
  };


  const deleteProduct = async () => {
    const url = Api.deleteProduct;
    axios({
      method: "POST",
      url: `http://localhost:8080${url}?id=${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const { status} = response;
        if (status === 200) {
          console.log("Product deleted successfully!"); // <-- Print statement added here
          fetchProducts("");
          window.alert("Product Deleted Sucessfully");
          navigate("/app/home")
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };


  const openDialog = () => {
    setIsModalOpen(true);
  };

  console.log("isModalOpen:", isModalOpen); // Debugging statement

  // Number of items to display initially
  return (
<div>
    { product ? (<>
    <div className="max-w-screen-xl mx-auto mt-10">
       <div className="px-4 sm:px-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Product Details</h3>
        <div className="flex space-x-2">
          <button className="text-indigo-600 hover:text-indigo-500" title="Edit" onClick={editClick}>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
          <button className="text-red-600 hover:text-red-500" title="Delete"  onClick={() => openDialog()}>
         
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          </button>
        </div>
      </div>
      {/* <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p> */}
    </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Product name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{product.name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {product.description}
            </dd>
          </div>
         
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Materials</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-56 overflow-y-auto">
                {product.materials.map((material, index) => (
                  <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-full items-center">
                      <div className="flex w-1/2 min-w-0 gap-2">
                        <span className="truncate font-medium">{material.name}</span>
                      </div>
                      <div className="flex-shrink-0 text-gray-400 w-1/2 text-start">
                        {material.quantity}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Total Carbon Footprint</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{product.totalCarbonFootprint}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Created At</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{formatDate(product.createdAt)}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Updated At</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{formatDate(product.updatedAt)}</dd>
          </div>
        </dl>
      </div>
    </div>
    {isModalOpen && (
            <div id="popup-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-500 bg-opacity-50">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Are you sure you want to delete this product?</h3>
                  <div className="mt-4 flex justify-center space-x-4">
                    <button onClick={deleteProduct} className="bg-red-500 text-white px-4 py-2 rounded-md">Yes</button>
                    <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">No</button>
                  </div>
                </div>
              </div>
            </div>
          )}
    </>) : <h1>Product Not Found</h1>}
    </div>
  );
}

export default ProductView;
