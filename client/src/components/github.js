import React from "react";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { signinWithGitHub } from "../api/api";
import Typography from "@mui/material/Typography";
import { toast } from 'react-toastify';

export default function GithubSignin() {

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  useEffect(() => {
    if (code) {
        signinWithGitHub(code)
      .then((response) => {
        const token = response.data.data.token;
        console.log(response.data.data)
        localStorage.setItem("token", token);

        window.location = "/";
      })
      .catch(err => {
        toast('Error while logging you in with github', {
          type: 'error'
        })
      });;
    }
  }, [code]);

  return (
    <CardContent style={{marginTop:"90px"}}>
      <CircularProgress />
      <Typography>Logging you in with GitHub</Typography>
    </CardContent>
  );
}