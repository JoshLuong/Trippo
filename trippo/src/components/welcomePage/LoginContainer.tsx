import React from "react";
import * as sc from "./LoginContainer.styles";
import { useState } from "react";
import LoginPane from "./LoginPane";
import SignUpPane from "./SignUpPane";
import ForgotPasswordPane from "./ForgotPasswordPane";

function LoginContainer() {
  const [signUpClicked, updateSignUp] = useState(false);
  const [forgotPasswordClicked, updateForgotPassword] = useState(false);

  const handleSignUp = () => {
    updateSignUp(!signUpClicked);
  };

  const handleForgotPassword = () => {
    updateForgotPassword(!forgotPasswordClicked);
  };

  return (
    <sc.loginDiv>
      {!signUpClicked && !forgotPasswordClicked && (
        <LoginPane
          onSignUp={handleSignUp}
          onForgotPassword={handleForgotPassword}
        />
      )}
      {signUpClicked && <SignUpPane handleBack={handleSignUp} />}
      {forgotPasswordClicked && (
        <ForgotPasswordPane handleBack={handleForgotPassword} />
      )}
    </sc.loginDiv>
  );
}

export default LoginContainer;
