import React,{useEffect,useState } from 'react'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Update } from '@mui/icons-material';
import { Link,useNavigate } from "react-router-dom";

import "./style.css";
const Quizzniv = () => {
    const navigate = useNavigate();
    useEffect(() => {
    }, []);
  return(
    <DashboardLayout>
    <DashboardNavbar />
    <div class="niveau-box">
      <h1>Niveau de Test </h1>
      <div class="option-container" id="choix">
        <div class="option" onClick={()=>{navigate('/Quizz');localStorage.setItem('NivTest', 1);}}>Facile</div>
      </div>
      <div class="option-container" id="choix">       
        <div class="option" onClick={()=>{navigate('/Quizz');localStorage.setItem('NivTest', 2);}}>Moyen</div>
      </div>
      <div class="option-container" id="choix">        
        <div class="option" onClick={()=>{navigate('/Quizz');localStorage.setItem('NivTest', 3);}}>Difficile</div>
      </div>
    </div>    
    <Footer />
  </DashboardLayout>
  )
}
export default Quizzniv;


