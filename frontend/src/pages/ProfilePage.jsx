import useUserAuth from "../hooks/useUserAuth";

const ProfilePage = () => {
  const { token } = useUserAuth();

  return (
    <section>
      <p>ProfilePage</p>
      <p>nickname: {token?.nickname}</p>
      <p>Vanya</p>
    </section>
  );
};

export default ProfilePage;
