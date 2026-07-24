import { Suspense } from "react";
import VerifyOtpClient from "../../../components/VerifyOtpClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyOtpClient />
    </Suspense>
  );
}