import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Card from "@mui/material/Card";
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

function Cover() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [description, setDescription] = useState("");
  const [social, setSocial] = useState("");
  const [login, setLogin] = useState("");
  const [image, setImage] = useState("");

  const [errors, setErrors] = useState("");

  const Enregistrer = () => {
    axios
      .get(
        `http://127.0.0.1:8000/api/useer?nom=${nom}&prenom=${prenom}&telephone=${telephone}&image=${image}&adresse=${adresse}&social=${social}&email=${email}&login=${login}&password=${password}&description=${description}`
      )
      .then((res) => {
        console.log(res.data);
        setErrors("votre compte est creer avec succees");
      });
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign up
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2} display="flex" justifyContent="space-between">
              <MDBox mr={2}>
                <MDInput
                  type="text"
                  label="Nom"
                  variant="standard"
                  value={nom}
                  onChange={(event) => setNom(event.target.value)}
                  required
                  fullWidth
                />
              </MDBox>
              <MDBox>
                <MDInput
                  type="text"
                  label="Prénom"
                  variant="standard"
                  value={prenom}
                  onChange={(event) => setPrenom(event.target.value)}
                  required
                  fullWidth
                />
              </MDBox>
            </MDBox>
            <MDBox mb={2} display="flex" justifyContent="space-between">
              <MDBox mr={2}>
                <MDInput
                  type="number"
                  label="Téléphone"
                  variant="standard"
                  value={telephone}
                  onChange={(event) => setTelephone(event.target.value)}
                  required
                  fullWidth
                />
              </MDBox>
              <MDBox>
                <MDInput
                  type="text"
                  label="Description"
                  variant="standard"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                  fullWidth
                />
              </MDBox>
            </MDBox>
            <MDBox mb={2} display="flex" justifyContent="space-between">
              <MDBox mr={2}>
                <MDInput
                  type="text"
                  label="social"
                  variant="standard"
                  value={social}
                  onChange={(event) => setSocial(event.target.value)}
                  required
                  fullWidth
                />
              </MDBox>
              <MDBox>
                <MDInput
                  type="text"
                  label="Image"
                  variant="standard"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  required
                  fullWidth
                />
              </MDBox>
            </MDBox>
            <MDBox mb={2} display="flex" justifyContent="space-between">
              <MDBox mr={2}>
                <MDInput
                  type="text"
                  label="Adresse"
                  variant="standard"
                  fullWidth
                  value={adresse}
                  onChange={(event) => setAdresse(event.target.value)}
                  required
                />
              </MDBox>
              <MDBox>
                <MDInput
                  type="text"
                  label="Login"
                  variant="standard"
                  fullWidth
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                  required
                />
              </MDBox>
            </MDBox>
            <MDBox mb={2} display="flex" justifyContent="space-between">
              <MDBox mr={2}>
                <MDInput
                  type="email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </MDBox>
              <MDBox>
                <MDInput
                  type="password"
                  label="Password"
                  variant="standard"
                  fullWidth
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </MDBox>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={Enregistrer} variant="gradient" color="info" fullWidth>
                Register
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
                {errors && <div>{errors}</div>}
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
