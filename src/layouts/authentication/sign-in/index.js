import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/login?email=${email}&password=${password}`
      );

      if (response.data === "verified") {
        navigate(`/Forum`);
        localStorage.setItem("Email", email);
      } else {
        setErrors("Adresse e-mail ou mot de passe invalide");
      }
    } catch (error) {
      console.log(error);
      setErrors("Erreur lors de l\'authentification");
    }
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
            Sign in
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
            <MDBox mb={2}>
              <MDInput label="Email" type="email"id="email"name="email" value={email} onChange={(event) => setEmail(event.target.value)} required fullWidth />
              
            </MDBox>
            <MDBox mb={2}>
              <MDInput label="Mot de passe" type="password" id="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} required fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
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

export default Basic;
/*
import React, { useState } from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import AWS from 'aws-sdk';

import Card from "@mui/material/Card";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [code, setCode] = useState("");
  const [theme, setTheme] = useState("monokai");
  const [mode, setMode] = useState("javascript");
  const [output, setOutput] = useState("");

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const handleRunCode = () => {
    fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: '591eece9941e51cd69c9d793aac53649',
        clientSecret: '49f2c899040d2e33b9f81cf11f7042b95369250d8a891b1f9002a36a7f441a54',
        script: code,
        language: mode,
        versionIndex: '0',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setOutput(data.output);
        console.log(output);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <BasicLayout image={bgImage}>
    <Card>
    <div>
      <div>
        <label htmlFor="mode">Mode:</label>
        <select id="mode" onChange={handleModeChange}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>
        <label htmlFor="theme">Theme:</label>
        <select id="theme" onChange={handleThemeChange}>
          <option value="monokai">Monokai</option>
          <option value="terminal">Terminal</option>
          <option value="github">GitHub</option>
        </select>
        <button onClick={handleRunCode}>Run Code</button>
      </div>
      <AceEditor
        mode={mode}
        theme={theme}
        onChange={handleCodeChange}
        name="code-editor"
        value={code}
        editorProps={{ $blockScrolling: true }}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        style={{ width: "100%", height: "500px" }}
      />
    </div>
      <h5>{output}</h5>
      </Card>
    </BasicLayout>
  );
}

export default Basic;*/