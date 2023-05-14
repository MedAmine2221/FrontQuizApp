import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Billing() {
  const [htmlContent3, setHtmlContent3] = useState("");
  const [certif, setCertif] = useState("");

  useEffect(() => {
    const storedValue = localStorage.getItem("Email");
    if (storedValue) {
    let url = `http://127.0.0.1:8000/certificat/${storedValue}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data); // affiche la valeur de `data` dans la console
        setCertif(data);
        let htmlcontent = '';
        data.forEach(function(row) {
          row.forEach(function(certif) {
            htmlcontent += `
            <style>
          .certificate {
              border: 20px solid #0C5280;
              padding: 25px;
              height: 600px;
              position: relative;
          }
          
          .certificate:after {
              content: '';
              top: 0px;
              left: 0px;
              bottom: 0px;
              right: 0px;
              position: absolute;
              background-image: url(https://image.ibb.co/ckrVv7/water_mark_logo.png);
              background-size: 100%;
              z-index: -1;
          }
          
          .certificate-header > .logo {
              width: 80px;
              height: 80px;
          }
          
          .certificate-title {
              text-align: center;    
          }
          
          .certificate-body {
              text-align: center;
          }
          
          h1 {
          
              font-weight: 400;
              font-size: 48px;
              color: #0C5280;
          }
          
          .student-name {
              font-size: 24px;
          }
          
          .certificate-content {
              margin: 0 auto;
              width: 750px;
          }
          
          .about-certificate {
              width: 380px;
              margin: 0 auto;
          }
          
          .topic-description {
          
              text-align: center;
          }          
            </style>

            <div class="certificate" id='content'>
            <div class="water-mark-overlay"></div>
            <div class="certificate-header">
                <img src="${certif.image}"  class="logo" alt="">
            </div>
            <div class="certificate-body">
               
                <p class="certificate-title"><strong>certificat agrégé par l'Etat</strong></p>
                <h1>Certificat d'achèvement</h1>
                <p class="text-center">
                Ceci est à certifier que ${certif.prenom} a satisfait aux exigences du programme de formation ${certif.nom} avec succès. Cette personne a suivi et achevé tous les tests de l'application et a démontré une compréhension approfondie des sujets abordés.
                Nous attestons que ${certif.prenom} est maintenant compétent(e) dans les domaines traités par cette formation et qu'il/elle est capable de mettre en pratique les connaissances acquises de manière efficace.
                Cette certification est délivrée le [Date de délivrance] et est valable pour toujours.
                Félicitations pour votre réussite dans ce programme de formation. Nous vous souhaitons beaucoup de succès dans votre carrière professionnelle.
                <h1>QUIZZ APP </h1>
                </p>
            </div>
        </div>
        </br></br>
            `;
          });
        });
        setHtmlContent3(htmlcontent); // met à jour la variable d'état pour afficher le contenu HTML
      })
      console.log("helloo"+certif);
    }
}, []);
const htmlContent=
`
<html><body>
${htmlContent3}
</body></html>`
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
