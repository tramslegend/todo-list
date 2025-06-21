import LoginForm from "./LoginForm";

export default function Home() {
  return (
    <div className="h-svh grid place-items-center bg-secondary">
      <div className="flex overflow-hidden rounded">
        <div className="max-w-sm w-sm bg-background">
          <LoginForm />
        </div>



      </div>
    </div>
  );
}
