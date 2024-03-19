import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../../components/Api";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const products = useSelector((state) => state.products.products);
    const { id } = useParams(); // assuming you're using React Router for routing
    const product = products.find(product => product._id === id);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState (''); // Changed 'about' to 'description'
    const [selectedMaterials, setSelectedMaterials] = useState([]);
    const [availableMaterials, setAvailableMaterials] = useState([]);

    const fetchMaterials = async () => {
      // try {
        const url = Api.materails;
      //   const response = await axios.get(`http://localhost:8080${url}`);
      //   const materialNames = response.data.map(material => material.name);
      //   setAvailableMaterials(materialNames);
      // } catch (error) {
      //   console.error("Error fetching materials:", error);
      // }
      axios({
        "method": "GET",
        "url": `http://localhost:8080${url}`,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          console.log("data", data);
          const materialNames = data.map(material => material.name);
        setAvailableMaterials(materialNames);
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
    };

 
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleDescriptionChange = (e) => { // Changed function name and variable name
      setDescription(e.target.value);
    };
  
    const handleMaterialChange = (e) => {
      const selectedMaterial = e.target.value;
      console.log(selectedMaterial)
      if (selectedMaterial) {
        setSelectedMaterials((prev)=>([...prev, selectedMaterial]));
      }
    };
    
    
    const removeFromSelected = (material) => {
      setSelectedMaterials(selectedMaterials.filter(item => item !== material));
    };
    

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = Api.editProduct;
        await axios.post(`http://localhost:8080${url}?id=${id}`, {
          name: name,
          description: description, // Changed variable name
          materials: selectedMaterials
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Product added successfully!");
        window.alert("Product updated successfully!");
        navigate(-1);
        // setName("");
        // setDescription(""); // Changed variable name
        // setSelectedMaterials([]);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }

    const handleCancel = () => {
      navigate(-1);
      };
  
 useEffect( ()=> {
  if(product){
    setName(product.name);
    setDescription(product.description);
    setSelectedMaterials(product.materials.map(material => material.name))
  }
  },[product]);

  useEffect(() => {
    fetchMaterials();
}, []);


  return (
    <div>
    { product ? (<>
    <div  className="max-w-screen-xl mx-auto">
      <div className="flex justify-center items-center mt-20">
        <form  className="bg-white shadow-md rounded px-8 pt-6 pb-4 mb-4 w-full max-w-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2"> {/* Changed 'about' to 'description' */}
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description} 
              onChange={handleDescriptionChange}
              rows={6}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Write a few sentences about the product."
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="material" className="block text-gray-700 text-sm font-bold mb-2">
              Available Materials
            </label>
            <select
              id="material"
              name="material"
              onChange={handleMaterialChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" key="select">Select Material</option>
              {availableMaterials.map(material => (
                    <option key={material} value={material}>{material}</option>

                    ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="selectedMaterials" className="block text-gray-700 text-sm font-bold mb-2">
              Selected Materials
            </label>
            <div className="flex flex-wrap">
            {selectedMaterials.map(material => (
            <div key={material} className="flex items-center  py-1 px-3 mr-2 mb-2">
              <span>{material}</span>
              <button type="button" onClick={() => removeFromSelected(material)} className="ml-1 bg-red-300 hover:bg-red-500 text-white font-bold py-0.5 px-1.5 rounded-full focus:outline-none focus:shadow-outline">
                X
              </button>
            </div>
          ))}

            </div>
          </div>
          <div className="flex items-center justify-between">
            <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
     </>) : <h1>Product Not Found</h1>}
     </div>
  );
};

export default EditProduct;
