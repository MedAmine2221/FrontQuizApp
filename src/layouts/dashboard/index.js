// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import { useEffect, useState } from "react";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import { useLocation, Link } from 'react-router-dom';
// import './style.css'
// import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

// function Dashboard() {
//   const [iduser, setIduser] = useState(0);
//   const [forumpub, setForumpub] = useState([]);
//   const [userReply, setUserReply] = useState("");
//   const [showInput, setShowInput] = useState(false);
//   const [newQuestion, setNewQuestion] = useState("");
//   const [msg, setMsg] = useState("");

//   const storedValue = localStorage.getItem("Email");


  
//   useEffect(() => {
//     if (storedValue) {
//       fetch(`http://127.0.0.1:8000/api/affichage/${storedValue}`)
//         .then(response => response.json())
//         .then(data => setIduser(data[0].id))
//         .catch(error => console.error(error));
//     }
//   }, [storedValue]);

 
//   useEffect(() => {
//     let forum = [];

//     fetch(`http://localhost:8000/api/afficheForum`)
//       .then(response => response.json())
//       .then(data => {
//         forum = data[0].map(frm => ({ id: frm.id, iduser: frm.idUser, qst: frm.question, rep: [] }));
//         // Récupérer toutes les réponses pour chaque question
//         const promises = forum.map(frm => (
//           fetch(`http://localhost:8000/api/afficheReponses/${frm.qst}`)
//             .then(response => response.json())
//             .then(data => {
//               frm.rep = data[0].map(option => ({ id: option.id, nom: option.prenom, reponse: option.reponse }));
//             })
//             .catch(error => console.error(error))
//         ));
//         // Attendre que toutes les requêtes soient terminées avant de mettre à jour l'état
//         Promise.all(promises).then(() => {
//           setForumpub(forum);
//         });
//       })
//       .catch(error => console.error(error));
//   }, [storedValue]);
//   const handleLike = (id) => {
//     // gérer la logique de "j'aime" ici
//   }

//   const handleReply = (id) => {
//     // gérer la logique de la réponse ici
//   }
//   const handleSubmit = (event, questionId) => {
//     event.preventDefault();
//     fetch(`http://localhost:8000/api/Repforum?idUser=${iduser}&idQuestion=${questionId}&reponse=${userReply}`)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         setUserReply("");
//         setForumpub((prevState) => {
//           const updatedForum = prevState.map((forum) => {
//             if (forum.id === questionId) {
//               return {
//                 ...forum,
//                 rep: [
//                   ...forum.rep,
//                   {
//                     id: data.id,
//                     nom: "Vous",
//                     reponse: userReply,
//                   },
//                 ],
//               };
//             }
//             return forum;
//           });
//           return updatedForum;
//         });
//       })
//       .catch((error) => console.error(error));
//   };
//   const handleSubmitQuestion = (event) => {
//     event.preventDefault();
//     fetch(`http://localhost:8000/api/forum?idUser=${iduser}&question=${newQuestion}`)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setForumpub(data[0].map(frm => ({ id: frm.id, iduser: frm.idUser, qst: frm.question, rep: [] })));
//         setShowInput(false);
//         setMsg("votre question est enrgistrer avec succées")
//       })
//       .catch(error => console.error(error));
//   }
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Container>
//         <Row>
//           <Col>
//             <button variant="primary" onClick={() => setShowInput(true)}>Ajouter une question</button>
//             {showInput &&
//               <Row>
//                 <Col>
//                   <Card>
//                     <Card.Body>
//                       <Form onSubmit={handleSubmitQuestion}>
//                         <Form.Group controlId="formQuestion">
//                           <Form.Label>Ajouter une question</Form.Label>
//                           <Form.Control
//                             as="textarea"
//                             rows={3}
//                             placeholder="Écrivez votre question ici"
//                             value={newQuestion}
//                             onChange={(e) => setNewQuestion(e.target.value)}
//                           />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">Envoyer</Button>
//                       </Form>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>
//             }
//           </Col>
//         </Row>
//         {forumpub.map(forum => (
//   <Row key={forum.id}>
//     <Col>
//       <Card className="my-4">
//         <Card.Body>
//           <Card.Title>{forum.qst}</Card.Title>
//           <Button variant="primary" onClick={() => handleLike(forum.id)}>J'aime</Button>
//           {


//           forum.rep.map((reponse) => (
//             <div key={reponse.id}>
//               <p>{reponse.nom} : {reponse.reponse}</p>
//             </div>
//           ))}
//         </Card.Body>
//       </Card>
//       <Card>
//         <Card.Body>
//           <Form onSubmit={(e) => handleSubmit(e, forum.id)}>
//             <Form.Group controlId={`formReply-${forum.id}`}>
//               <Form.Label>Ajouter une réponse</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Écrivez votre réponse ici"
//                 value={userReply}
//                 onChange={(e) => setUserReply(e.target.value)}
//               />
//             </Form.Group>
            
//             <Button variant="primary" type="submit">Envoyer</Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Col>
//   </Row>
// ))}
//       </Container>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Dashboard;


import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import './style.css';
import { FaLaugh, FaThumbsUp, FaHeart } from 'react-icons/fa';

function Dashboard() {
   const [iduser, setIduser] = useState(0);
   const [forumpub, setForumpub] = useState([]);
   const [userReply, setUserReply] = useState("");
   const [showInput, setShowInput] = useState(false);
   const [showInputrep, setShowInputrep] = useState(false);

   const [newQuestion, setNewQuestion] = useState("");
   const [msg, setMsg] = useState("");

   const storedValue = localStorage.getItem("Email");
   const navigate = useNavigate();
   useEffect(() => {
     if (storedValue) {
       fetch(`http://127.0.0.1:8000/api/affichage/${storedValue}`)
         .then(response => response.json())
         .then(data => setIduser(data[0].id))
         .catch(error => console.error(error));
     }
   }, [storedValue]);
  useEffect(() => {
     let forum = [];
    fetch(`http://localhost:8000/api/afficheForum`)
       .then(response => response.json())
       .then(data => {
         forum = data[0].map(frm => ({ id: frm.id, iduser: frm.idUser, qst: frm.question, rep: [] }));
         // Récupérer toutes les réponses pour chaque question
         const promises = forum.map(frm => (
           fetch(`http://localhost:8000/api/afficheReponses/${frm.qst}`)
             .then(response => response.json())
             .then(data => {
               frm.rep = data[0].map(option => ({ id: option.id, mail: option.email, nom: option.prenom, reponse: option.reponse }));
             })
             .catch(error => console.error(error))
         ));
         // Attendre que toutes les requêtes soient terminées avant de mettre à jour l'état
         Promise.all(promises).then(() => {
           setForumpub(forum);
         });
       })
       .catch(error => console.error(error));
   }, [storedValue]);
   const handleLike = (id) => {
     // gérer la logique de "j'aime" ici
   }
   const handleSubmit = (event, questionId) => {
     event.preventDefault();
     fetch(`http://localhost:8000/api/Repforum?idUser=${iduser}&idQuestion=${questionId}&reponse=${userReply}`)
       .then((response) => response.json())
       .then((data) => {
         console.log(data);
         setUserReply("");
         setForumpub((prevState) => {
           const updatedForum = prevState.map((forum) => {
             if (forum.id === questionId) {
               return {
                 ...forum,
                 rep: [
                   ...forum.rep,
                   {
                     id: data.id,
                     nom: "Vous",
                     reponse: userReply,
                   },
                 ],
               };
             }
             return forum;
           });
           return updatedForum;
         });
       })
       .catch((error) => console.error(error));
   };
   const handleSubmitQuestion = (event) => {
     event.preventDefault();
     fetch(`http://localhost:8000/api/forum?idUser=${iduser}&question=${newQuestion}`)
       .then(response => response.json())
       .then(data => {
         console.log(data);
         setForumpub(data[0].map(frm => ({ id: frm.id, iduser: frm.idUser, qst: frm.question, rep: [] })));
         setShowInput(false);
         setMsg("votre question est enrgistrer avec succées")
       })
       .catch(error => console.error(error));
  }
  const [likes, setLikes] = useState(0);
  const [haha, setHaha] = useState(0);
  const [adore, setAdore] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };
  const handleHahaClick = () => {
    setHaha(haha + 1);
  };
  const handleAdoreClick = () => {
    setAdore(adore + 1);
  };
  return (
  <DashboardLayout>
  <DashboardNavbar />
    <BasicLayout image={bgImage}>
    <Card style={{ width: 1000, left: -600, marginBottom: 20 }}>
      <MDBox pt={4} pb={3} px={3} style={{width:'100%'}}>
          <MDBox component="form" role="form">
          <MDButton variant="primary" onClick={() => setShowInput(true)}>Ajouter une question</MDButton>
          { showInput &&
              <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput label="Ajouter une question" type="text" placeholder="Écrivez votre question ici"  
                  value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} required fullWidth />
                  <MDButton          
                  variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                    type="submit" onClick={handleSubmitQuestion}>Envoyer</MDButton>
                </MDBox>
              </MDBox>
              </MDBox>}
          </MDBox>
        </MDBox>
      </Card>
      {forumpub.map(forum => (
        <Card style={{ width: 1000, left: -600, marginTop: 20 }}>
                <MDBox pt={4} pb={3} px={3} style={{width:'100%'}} key={forum.id}>
                     <MDBox pt={4} pb={3} px={3}>
                         <MDBox style={{fontSize: "1.2em", fontWeight: "bold"}}>{forum.qst}<MDButton onClick={()=>setShowInputrep(true)}>{forum.rep.length} réponse(s)</MDButton></MDBox>
                         { showInputrep &&
                            <MDBox pt={4} pb={3} px={3}>
                            <MDBox component="form" role="form"onSubmit={(e)=>handleSubmit(e,forum.id)}>
                              <MDBox mb={2}>
                                <MDInput label="Ajouter une reponse" type="text" placeholder="Écrivez votre reponse ici"  value={userReply} onChange={(e) => setUserReply(e.target.value)} required fullWidth />
                                <MDButton variant="primary" type="submit">Envoyer</MDButton>                            
                              </MDBox>
                            </MDBox>
                            </MDBox>}
                            <MDBox style={{fontSize: "1.0em", fontWeight: "bold"}}>Réponse : </MDBox>
                         {
                         forum.rep.map((reponse) => (
                           <div key={reponse.id}>
                             <p  onClick={()=>{navigate('/Profils');localStorage.setItem('compte', reponse.mail);}}>{reponse.nom} : {reponse.reponse}</p>
                             <div>
                              <MDButton onClick={handleHahaClick}>
                                <FaLaugh />
                                {haha}
                              </MDButton>
                              <MDButton onClick={handleLikeClick}>
                                <FaThumbsUp />
                                {likes}
                              </MDButton>
                              <MDButton onClick={handleAdoreClick}>
                                <FaHeart />
                                {adore}
                              </MDButton>
                            </div>
                           </div>
                         ))}
                     </MDBox>   
                 </MDBox>
              </Card>
               ))
          }   
    </BasicLayout>
    <Footer />

</DashboardLayout>
  );
}

export default Dashboard;
