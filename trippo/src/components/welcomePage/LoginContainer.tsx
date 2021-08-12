import { FC, useState } from 'react';
import LoginPane from './LoginPane';
import SignUpPane from './SignUpPane';
import ForgotPasswordPane from './ForgotPasswordPane'

interface Props {
  handleLoginError: () => void;
}


const LoginContainer: FC<Props> = (Props) => {
  const [signUpClicked, updateSignUp] = useState(false);
  const [forgotPasswordClicked, updateForgotPassword] = useState(false);

  const handleSignUp = () => {
    updateSignUp(!signUpClicked);
  };

  const handleForgotPassword = () => {
    updateForgotPassword(!forgotPasswordClicked);
  };

    return (
        <div>
            {!signUpClicked && !forgotPasswordClicked &&
                <LoginPane handleLoginError={Props.handleLoginError} onSignUp={handleSignUp} onForgotPassword={handleForgotPassword} />
            }
            {signUpClicked &&
                <SignUpPane handleBack={handleSignUp} />
            }
            {forgotPasswordClicked &&
                <ForgotPasswordPane handleBack={handleForgotPassword} />
            }
        </div>
    )
}

export default LoginContainer;
