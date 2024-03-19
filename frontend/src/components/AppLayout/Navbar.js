import React, { useState, useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
// import { BellIcon, XMarkIcon, Bars3Icon,PlusCircleIcon } from "@heroicons/react/24/outline";

import { BellIcon, XIcon, MenuIcon, PlusIcon } from "@heroicons/react/solid";


import axios from "axios"; // Import axios
import companyLogo from '../../static/images/carbonCompete_logo.webp';
import { useSelector, useDispatch } from "react-redux";
import Api from "../../components/Api";

import {setProducts} from '../../redux/products/produtsSlice';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pathName} = useLocation();

  const products = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");


  const [user, setUser] = useState({
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  });

  
  const navigation = [
    // { name: "Dashboard", href: "#", current: true },
    // { name: "Team", href: "#", current: false },
    // { name: "Projects", href: "#", current: false },
    // { name: "Calendar", href: "#", current: false },
    // { name: "Reports", href: "#", current: false },
  ];
  
  const userNavigation = [
    { name: "Your Profile", href: "#"},
    { name: "Settings", href: "#" },
    { name: "Sign out", href:"#"}
  ];
  
  const fetchProducts = async (searchTerm) => {
    try {
      const url = Api.products;
      const response = await axios.post(`http://localhost:8080${url}`, { search: searchTerm });
      dispatch(setProducts(response.data));
      if (pathName !== "/app/home"){
        navigate('/app/home')
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm); // Fetch products on initial load
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Update search term state
    // fetchProducts(event.target.value); // Fetch products on search term change
  
  };
  const handleNavigateHome = () => {
     navigate("/app/home");
  };


  return (
    <>
      <div className="min-h-full">
        <nav className="bg-white-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    // className="h-8 w-8"
                    style={{height:"40px",width:"141px",cursor: "pointer"}}
                    // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    src= {companyLogo}
                    onClick={() => handleNavigateHome()}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
           
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <form onSubmit={(e) => e.preventDefault()} className="hidden md:block">
                    <label
                      className="relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-1 px-2 rounded-lg gap-2 shadow focus-within:border-gray-300"
                      htmlFor="search-bar"
                    >
                      <input
                        id="search-bar"
                        placeholder="Your keyword here"
                        name="q"
                        className="px-4 py-1 w-full rounded-md flex-1 outline-none bg-white text-sm"
                        onChange={handleSearch}
                        required
                      />
                      <button
                        type="submit"
                        className="w-full md:w-auto px-4 py-2 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-lg transition-all text-sm"
                      >
                        <div className="flex items-center transition-all opacity-1" onClick={()=> fetchProducts(searchTerm)}>
                          <span className="text-xs font-semibold whitespace-nowrap truncate mx-auto">
                            Search
                          </span>
                        </div>
                      </button>
                    </label>
                  </form>

                  <button
                    type="button"
                    onClick={() => navigate('/app/addProduct')}
                    className="relative rounded-full p-1"
                  >
                    <span className="sr-only">Add Products</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-8 w-8 ml-6" // Adjusted className to match PlusIcon
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>

                  </button>

                 
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setOpen(!open)}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

      </div>
    </>
  );
};

export default Navbar;
