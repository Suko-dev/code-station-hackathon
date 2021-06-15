import { useState } from 'react';

import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
} from 'react-google-login';

import { Text, Image } from '@chakra-ui/react';

import { clientId } from '../services/clientId';

type User = {
  name: string;
  email: string;
  photo: string;
  token: string;
};

export function LoginLogout(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const responseGoogleLogin = (response: any): void => {
    const responseTyped: GoogleLoginResponse = response;

    if (responseTyped.profileObj?.email) {
      const { email, name, imageUrl } = responseTyped.profileObj;
      const token = responseTyped.tokenId;

      setUser({
        name,
        email,
        photo: imageUrl,
        token,
      });

      // Backend verify URL
      // const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;
      // Backend verify URL Example https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5ZmUyYTdiNjc5NTIzOTYwNmNhMGE3NTA3OTRhN2JkOWZkOTU5NjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjIyMjU2ODQzMDMwLWM3NXI5OGoxcW90czQ4bzI3bjlhamlmcGFzYmRhNjg5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjIyMjU2ODQzMDMwLWM3NXI5OGoxcW90czQ4bzI3bjlhamlmcGFzYmRhNjg5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4NTI3MzY3OTAwNzg1ODE5MjQ5IiwiZW1haWwiOiJkZXYuZGFuLnByb2dyYW1hZG9yQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiYUhCVjlsTms0d01wYlRDVFBNdWNIUSIsIm5hbWUiOiJEYW5pZWwgVsOtbmljaXVzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoZTdqeV8zWm5hVF9KUkppaXk0SGFyOFNzaUpqcmZXZURVNHI3aj1zOTYtYyIsImdpdmVuX25hbWUiOiJEYW5pZWwiLCJmYW1pbHlfbmFtZSI6IlbDrW5pY2l1cyIsImxvY2FsZSI6InB0LUJSIiwiaWF0IjoxNjIzNzIzNTQwLCJleHAiOjE2MjM3MjcxNDAsImp0aSI6ImFmMjM3Njc0OGVkMTc2YWM5ODcwYzUyMjM3N2ZmNDk4NzBlMzBkMGEifQ.qlux4PgJde1Pomy1BgZojJvh8prWabV91gG2DISFT3r3aGYlSf2gwbpuiKG-tvSQ1VwiEkt-yd8RPc1kubP4qUT1FGmaM7GDmwEufvxM0if5VR2lIkqCz8Qau3WS6nNyKh_8XNu1878BcN9oSpT5l3nl0McXpMuM23okRUMMi3sTGxuXysNrSLDODVVJ-MUjAbaBKhXCEQeQEBBivQbPB4-tqS-J5Eu3n8944guicYsbGQB--ZrW4ahK9aut47C3Joemov7peuS5osZB2fTOOtnYYfebeNvyvuWJspjxC3Ai_j9opR8X1cVqOExhlC3AYoXNCbyTS1EW2jj4WBc4pQ

      setIsSignedIn(true);
    }
  };

  const responseGoogleLogout = (): void => {
    setTimeout(() => {
      setUser(null);
      setIsSignedIn(false);
    }, 1000);
  };

  return (
    <>
      {!isSignedIn ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login com o Google"
          theme="dark"
          cookiePolicy={'single_host_origin'}
          accessType="online"
          onSuccess={responseGoogleLogin}
          onFailure={() => console.log('fail')}
        />
      ) : (
        <>
          <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={responseGoogleLogout}
            onFailure={() => console.log('fail')}
          />
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
          <Image src={user?.photo} w="10rem" />
        </>
      )}
    </>
  );
}
