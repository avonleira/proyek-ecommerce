import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";

import { useAuth } from "../../hooks/authHook";

interface IProps {
  path?: string
  children?: JSX.Element | any
}

function AuthMiddleware(props: IProps) {
  const { children, path = "/auth/login" } = props;
  const { userNow } = useAuth();
  const router = useRouter();
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (!userNow) router.replace(path);
    else setIsValid(false)
  }, [userNow])

  if (isValid) return(
    <div className="">
      Unauthorized!
    </div>
  )
  return <Fragment>{children}</Fragment>;
}

export default AuthMiddleware;