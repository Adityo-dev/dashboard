import AuthLayout from "@/components/account/AuthLayout";
import RegisterFrom from "./RegisterFrom";

export default function Register() {
  return (
    <div>
      <AuthLayout>
        <RegisterFrom />
      </AuthLayout>
    </div>
  );
}
