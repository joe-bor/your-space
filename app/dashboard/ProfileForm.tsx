'use client'

interface Props {
    user: {
        id: string;
        name: string | null;
        bio: string | null;
        age: number | null;
        email: string | null;
        emailVerified: Date | null;
        image: string | null;
    } | null
}

export default function ProfileForm({ user }: Props) {
  return (
    <div>
        <h2>Edit Your Profile</h2>
        <form >
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" defaultValue={user?.name ?? ''} />
            <label htmlFor="bio">Bio: </label>
            <textarea name="bio"  cols={30} rows={10} defaultValue={user?.bio ?? '' }></textarea>
            <label htmlFor="age">Age: </label>
            <input type="text" name="age" defaultValue={user?.age ?? 0} />
            <label htmlFor="image">Profile Image URL: </label>
            <input type="text" name="image" defaultValue={user?.image ?? ''} />

            <button className=" border-lime-500  rounded border" type="submit">Save</button>
        </form>
    </div>
  )
}