import { useState } from 'react';
import LoginPane from './LoginPane';
import SignUpPane from './SignUpPane';
import ForgotPasswordPane from './ForgotPasswordPane'


function LoginContainer() {

    const [signUpClicked, updateSignUp] = useState(false);
    const [forgotPasswordClicked, updateForgotPassword] = useState(false);

    const handleSignUp = () => {
        updateSignUp(!signUpClicked);
    }

    const handleForgotPassword = () => {
        updateForgotPassword(!forgotPasswordClicked);
    }

    return (
        <div>
            {!signUpClicked && !forgotPasswordClicked &&
                <LoginPane onSignUp={handleSignUp} onForgotPassword={handleForgotPassword} />
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

export default LoginContainer
