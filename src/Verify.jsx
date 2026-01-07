import ReCAPTCHA from "react-google-recaptcha";

export default function Verify({ onVerified }) {
  const handleCaptcha = (token) => {
    // token exists = user completed captcha
    if (token) {
      localStorage.setItem("verified", "true");
      onVerified();
    }
  };

  return (
    <div >
      <h2>Human Verification</h2>
      <p>Please confirm you are not a robot to continue.</p>

      <ReCAPTCHA
  sitekey="6LdaZ0MsAAAAANN6mwvWJNn5Fao-5-7xGkU3O_yD"
  onChange={handleCaptcha}
/>
    </div>
  );
}