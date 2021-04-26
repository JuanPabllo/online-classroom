import { signIn, SignInResponse, signOut, useSession } from 'next-auth/client';
import { NextPage } from 'next';

const AppPage: NextPage = () => {
  const [session, loading] = useSession();

  return (
    <div>
      <h1>Bem vindo</h1>
      {!session && (
        <div className="text-3xl">
          Not signed in <br />
          <button onClick={(): Promise<SignInResponse> => signIn('auth0')}>
            Sign in
          </button>
        </div>
      )}
      {session && (
        <div className="text-3xl">
          Signed in as {session.user.email} <br />
          <button onClick={(): Promise<void> => signOut()}>Sign out</button>
        </div>
      )}
      {loading && (
        <div className="text-5xl">
          <h1>Carregando...</h1>
        </div>
      )}
    </div>
  );
};

export default AppPage;
