import React,{useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import axios from "axios";
import "./Button.css";

function Tables() {
  const [data, setData] = useState([]);
  useEffect(() => {
 
        axios
          .get("http://127.0.0.1:8000/api/competences")
          .then((response) => setData(response.data[0]))
          .catch((error) => console.log(error));
  }, []);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Niveau/Quizz');
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <table border="1" width="100%">
        <thead>
        <tr>
            <th scope="col">Nom</th>
            <th scope="col">Image</th>
            <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td align="center" valign="middle">{item.nom}</td>
            <td align="center" valign="middle"><img src={item.image} alt="My Image" width='180px' height='110px' /></td>
            <td align="center" valign="middle">
            <button className={`my-button`} onClick={()=>{handleClick();localStorage.setItem('CompId', item.id);}}>Test</button>
            </td>
            </tr>
        ))}
      </tbody>
    </table>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
