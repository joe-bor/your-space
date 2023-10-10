import FollowButton from "@/app/components/FollowButton/FollowButton"
import { prisma } from "@/lib/prisma"
import { Metadata } from "next"


interface Props {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const user = await prisma.user.findUnique({ where: { id: params.id }})
    return { title: `${user?.name}'s Profile Page`}
}


export default async function UserProfilePage({ params }: Props) {
    const user = await prisma.user.findUnique({ where: { id: params.id }})
    const { name, age, bio, image } = user ?? {}

  return (
    <div className=" flex flex-col justify-center items-center" >
        <img src={image ?? '/user-icon.svg'} alt={`${name}'s profile image`} />
        <h3>{name}</h3>
        <p>Age: {age}</p>
        <p>Bio: {bio}</p>
        
        <FollowButton targetUserId={params.id}/>
    </div>
  )
}