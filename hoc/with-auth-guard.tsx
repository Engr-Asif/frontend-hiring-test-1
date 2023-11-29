import type { FC } from "react";

import { AuthGuard } from "@guards/auth-guard";
import { AuthInitializer } from "./with-auth-initializer";

export const withAuthGuard = <P extends object>(Component: FC<P>): FC<P> => {
  return function WithAuthGuard(props: P) {
    return (
      <AuthInitializer>
        <AuthGuard>
          <Component {...props} />
        </AuthGuard>
      </AuthInitializer>
    );
  };
};
