import { type ReactNode, useEffect, useState } from "react";

import { SplashScreen } from "@components";
import { TurningLogo } from "@assets";
import { useLazyAuthMeQuery } from "@services/auth-api";
import { useDispatch, useSelector } from "@store";
import { authActions } from "@slices";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material";
import toast from "react-hot-toast";
import { getExpirationTime, isValidToken } from "@utils";

interface AuthProviderProps {
  children: ReactNode;
}

let interval: NodeJS.Timeout | undefined = undefined;

export function AuthInitializer(props: AuthProviderProps): JSX.Element {
  const { children } = props;
  const [isInitialized, setIsInitialized] = useState(true);

  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state: any) => state.auth);
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  const [getAuthMe] = useLazyAuthMeQuery();

  useEffect(() => {
    const authMe = async () => {
      try {
        await getAuthMe({ refreshToken }).unwrap();
      } catch (error: any) {
        toast.error(error?.data?.message || "Something Went Wrong");
        dispatch(authActions.logout());
      }
    };

    if (isValidToken(accessToken)) {
      const oneMinBeforeExpTime = getExpirationTime(accessToken); // This is the time 1 Min Before Expiration Time in milliseconds
      interval = setInterval(() => authMe(), oneMinBeforeExpTime);
    } else {
      dispatch(authActions.logout()); // As I used Persistent for Auth Slice that's why i have to remove store on Token InValidation
    }

    setIsInitialized(false);

    return () => clearInterval(interval);
  }, []);

  if (isInitialized) {
    return (
      <SplashScreen>
        <Image src={TurningLogo} alt="" width={matches ? 230 : 450} />
      </SplashScreen>
    );
  }

  return <>{children}</>;
}
