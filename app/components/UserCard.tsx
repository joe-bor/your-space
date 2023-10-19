import Link from "next/link";

interface Props {
  id: string;
  name: string | null;
  age: number | null;
  image: string | null;
}

export default function UserCard({ id, name, age, image }: Props) {
  return (
    <div className=" bg-violet-500 w-80 border border-red-600 rounded-lg grid-rows-2  ">
      <img src={image ?? "/user-icon.svg"} alt={`${name}'s profile image`} />
      <div className=" bg-blue-300 w-full">
        <h3>
          <Link
            className=" text-blue-600 hover:underline"
            href={`/users/${id}`}
          >
            {name}
          </Link>
        </h3>
        <p>Age: {age ?? ""}</p>
      </div>
    </div>
  );
}
