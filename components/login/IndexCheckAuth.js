import react from "react";

export default function IndexCheckAuth(props) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col justify-center text-center my-20">{props.children}</div>
    </div>
  );
}
