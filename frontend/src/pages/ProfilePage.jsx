import useUserAuth from "../hooks/useUserAuth";

const ProfilePage = () => {
  const { user } = useUserAuth();

  return (
    <section>
      <p>ProfilePage</p>
      <p>Игорь молодец</p>
      <p>nickname: {user?.nickname}</p>
    </section>
  );
};

export default ProfilePage;
