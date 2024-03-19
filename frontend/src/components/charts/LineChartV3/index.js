import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Import axios for making HTTP requests
import { useSelector, useDispatch } from "react-redux";

// Highcharts
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import LineChartOptions from "./LineChartOptions";
import { intToString } from "../../../utils";
import Api from '../../Api';

const LineChartV3 = ({
  title,
  subtitle,
  chartHeight,
  isLoading,
  xLabel,
  yLabel,
  x_field,
  y_field,
}) => {
  const [chartOptions, setChartOptions] = useState(LineChartOptions);
  // const [productsData, setProductsData] = useState([]);

  const productsData = useSelector((state) => state.products.products);


  // useEffect(() => {
  //   const fetchProducts = async (searchTerm) => {
  //     try {
  //       const url = Api.products;
  //       const response = await axios.post(`http://localhost:8080${url}`, { search: searchTerm });
  //       setProductsData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts(""); // Initial fetch with empty search term
  // }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    if (productsData.length) {
      setChartOptions({
        ...chartOptions,
        chart: {
          height: `${chartHeight}px`,
          marginLeft: 0,
          marginRight: 0,
        },
        title: {
          text: title,
          style: {
            fontSize: "24px",
          },
        },
        subtitle: { text: subtitle },
        xAxis: {
          title: {
            text: xLabel,
            style: {
              fontSize: "16px",
            },
          },
          categories: productsData.map(product => product[x_field]), // Assuming x_field is the property for product names
        },
        yAxis: {
          title: {
            text: yLabel,
            style: {
              fontSize: "16px",
            },
          },
          labels: {
            formatter: function () {
              return intToString(this.value) ;
            },
          },
        },
        series: [
          {
            name: yLabel,
            data: productsData.map(product => product[y_field]), // Display totalCarbonFootprint values on the y-axis
          },
        ],
        plotOptions: {
          series: {
            type: "line",
            lineWidth: 2,
          },
        },
      });
    } else {
      setChartOptions(LineChartOptions); // Reset chart options if no data available
    }
  }, [productsData]); // Re-run effect when productsData changes

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{
        style: {
          height: "100%",
          width: "100%",
          margin: "0",
          padding: "0",
        },
      }}
    />
  );
};

LineChartV3.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  x_field: PropTypes.string,
  y_field: PropTypes.string,
  chartHeight: PropTypes.number,
  isLoading: PropTypes.bool,
};

LineChartV3.defaultProps = {
  title: "Carbon FootPrint Analysis",
  chartHeight: 700,
  isLoading: false,
  xLabel: "Products",
  yLabel: "Total Carbon Footprint",
  x_field: "name",
  y_field: "totalCarbonFootprint",
};

export default LineChartV3;
