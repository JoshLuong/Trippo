import { FC } from 'react';
import LoginPane from './LoginPane';


interface Props {
  handleLoginError: () => void;
}


const LoginContainer: FC<Props> = (Props) => {

  return (
    <div>
      <LoginPane handleLoginError={Props.handleLoginError} />
    </div>
  )
}

export default LoginContainer;
