import React, {useState} from 'react';
import SignUp1 from './signup1/SignUp1';
import SignUp2 from './signup2/SignUp2';
import SignUpComplete from './signup2/SignUpComplete';

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState(null);

  const handleNext = (data: any) => {
    setUserData(data);
    setStep(step + 1);
  };

    return (
        <>
        {step === 1 && <SignUp1 onNext={handleNext} />}
        {step === 2 && <SignUp2 userData={userData} onNext={() => setStep(3)} />}
        {step === 3 && <SignUpComplete />}
      </>
    );
};

export default SignUpPage;