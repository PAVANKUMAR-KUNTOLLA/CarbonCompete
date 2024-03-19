import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../../components/Api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const url = Api.materails;
        const response = await axios.get(`http://localhost:8080${url}`);
        const materialNames = response.data.map(material => material.name);
        setAvailableMaterials(materialNames);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleMaterialChange = (e) => {
    const selectedMaterial = e.target.value;
    if (selectedMaterial) {
      setSelectedMaterials([...selectedMaterials, selectedMaterial]);
      setAvailableMaterials(availableMaterials.filter(material => material !== selectedMaterial));
    }
  };

  const removeFromSelected = (material) => {
    setSelectedMaterials(selectedMaterials.filter(item => item !== material));
    setAvailableMaterials([...availableMaterials, material]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = Api.addProduct;
      await axios.post(`http://localhost:8080${url}`, {
        name: name,
        description: about,
        materials: selectedMaterials
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Product added successfully!");
      setName("");
      setAbout("");
      setSelectedMaterials([]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  const handleCancel = () => {
   navigate(-1);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-center items-center mt-20">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-4 mb-4 w-full max-w-lg">
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
            <label htmlFor="about" className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              id="about"
              name="about"
              value={about}
              onChange={handleAboutChange}
              rows={3}
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
              <option value="">Select Material</option>
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
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
