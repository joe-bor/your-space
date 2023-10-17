import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-1/3 border border-red-400 p-8">
        <h1 className="text-center">Register Page</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
