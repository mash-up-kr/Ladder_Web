import React, { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { useLocalToken } from "~/hooks/domains";

const defaultEndPoint = process.env
  .NEXT_PUBLIC_SERVER_DEFAULT_END_POINT as string;

const LoginRedirectedPage: NextPage = () => {
  const router = useRouter();
  const [localToken, setLocalToken] = useLocalToken();

  useEffect(() => {
    const getToken = async () => {
      const { data } = await axios.post(`${defaultEndPoint}/api/v1/auth`, {
        code: router.query.code,
        redirectUri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI,
        socialType: "KAKAO",
      });

      return data.token;
    };

    type GetToken = typeof getToken;

    const setAsLocalToken = async (
      getToken: GetToken,
      callback?: (token: string) => void
    ) => {
      const token = await getToken();

      const bearerToken = `Bearer ${token}`;

      setLocalToken(bearerToken);
      await callback?.(bearerToken);
    };

    if (router.query.code) {
      setAsLocalToken(getToken, async (bearerToken) => {
        const { data } = await axios.get(`${defaultEndPoint}/api/v1/accounts`, {
          headers: {
            Authorization: bearerToken,
          },
        });

        console.log("내 정보 전역상태로 관리하기", data);
        router.replace("/");
        alert(`로그인이 되었습니다.${JSON.stringify(data)}`);
      });
    }
  }, [router.query.code]);

  return <div></div>;
};

export default LoginRedirectedPage;