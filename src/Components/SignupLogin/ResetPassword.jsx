import {
  Modal,
  TextInput,
  Button,
  PinInput,
  PasswordInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../../Services/UserService";
import { signupValidation } from "../../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../../Services/NotificationService";
import { useInterval } from "@mantine/hooks";
const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passErr, setPassErr] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1);
  }, 1000);
  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email)
      .then((res) => {
        successNotification("OTP sent Successfully", "Enter OTP to reset.");
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        setOtpSending(false);
        errorNotification("OTP Sending Failed", err.response.data.errorMessage);
      });
  };

  const handleVerifyOtp = (otp) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        successNotification("OTP Verified", "Enter new password.");
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "OTP Verification Failed",
          err.response.data.errorMessage
        );
      });
  };

  const resendOtp = () => {
    if (resendLoader) return;
    handleSendOtp();
  };

  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };

  const handleResetPassword = () => {
    changePass(email, password)
      .then((res) => {
        successNotification("Password Changed", "Login with new password");
        props.close();
        setEmail("");
        setPassword("");
        setPassErr("");
        setOtpSent(false);
        setOtpSending(false);
        setVerified(false);
        setResendLoader(false);
        setSeconds(60);
        interval.stop();
      })
      .catch((err) => {
        errorNotification(
          "Password Reset Failed",
          err.response.data.errorMessage
        );
      });
  };
  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6">
        <TextInput
          value={email}
          name="email"
          size="md"
          onChange={(e) => setEmail(e.target.value)}
          leftSection={<IconAt size={16} />}
          rightSection={
            <Button
              loading={otpSending && !otpSent}
              size="xs"
              className="mr-1"
              autoContrast
              disabled={email === "" || otpSent}
              variant="filled"
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          }
          rightSectionWidth="xl"
          label="Email"
          withAsterisk
        />
        {otpSent && (
          <PinInput
            onComplete={handleVerifyOtp}
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
            type="number"
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-2">
            <Button
              fullWidth
              loading={otpSending}
              color="brightSun.4"
              autoContrast
              variant="light"
              onClick={resendOtp}
            >
              {resendLoader ? seconds : "Resend"}
            </Button>
            <Button
              fullWidth
              autoContrast
              variant="filled"
              onClick={changeEmail}
            >
              Change Email
            </Button>
          </div>
        )}
        {verified && (
          <PasswordInput
            value={password}
            error={passErr}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPassErr(signupValidation("password", e.target.value));
            }}
            leftSection={<IconLock size={16} />}
            label="Password"
            withAsterisk
            placeholder="Password"
          />
        )}
        {verified && (
          <Button onClick={handleResetPassword} autoContrast variant="filled">
            Change Password
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
