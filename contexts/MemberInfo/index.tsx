import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthMember } from "~/features/auth/member";
import type { Member } from "~/types/members";

let count = 0;

const MemberInfoContext = createContext({
  memberInfo: {} as Member | null,
  refetchMemberInfo: (() => {}) as ReturnType<typeof useAuthMember>["refetch"],
  isLoading: false,
  isFetching: false,
  error: null as unknown | null, // TODO: unknown 정의하기
  isError: false,
});

interface Props {
  children: React.ReactNode;
}

const MemberInfoProvider = ({ children }: Props) => {
  const router = useRouter();
  const { isLoading, isFetching, error, isError, data, refetch } =
    useAuthMember();

  useEffect(() => {
    if (isError && count === 0) {
      alert("인증에 실패했습니다. 다시 로그인해주세요");
      localStorage.clear();
      router.replace("/login");
      count += 1;
    }
  }, [isError]);

  return (
    <MemberInfoContext.Provider
      value={{
        memberInfo: data || null,
        refetchMemberInfo: refetch,
        isLoading,
        isFetching,
        isError,
        error,
      }}
    >
      <MemberInfo.DevTools />
      {children}
    </MemberInfoContext.Provider>
  );
};

interface MemberInfoOnlyProps {
  fallback: React.ReactNode;
  children: (props: {
    memberInfo: Member;
    refetchMemberInfo: ReturnType<
      typeof useMemberInfoContext
    >["refetchMemberInfo"];
  }) => React.ReactElement;
}

const MemberInfoOnly = ({ fallback, children }: MemberInfoOnlyProps) => {
  const { isLoading, isFetching, memberInfo, refetchMemberInfo } =
    useMemberInfoContext();

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (memberInfo) {
    return children({ memberInfo, refetchMemberInfo });
  }

  return null;
};

const useMemberInfoContext = () => useContext(MemberInfoContext);

const MemberInfoDevTools = () => {
  return (
    <MemberInfo.Only fallback={<>MemberInfoLoading</>}>
      {({ memberInfo, refetchMemberInfo }) => (
        <div>
          <p>accountConnectType: {memberInfo.accountConnectType}</p>
          <p>nickname: {memberInfo.nickname}</p>
          <p>profileUrl: {memberInfo.profileUrl}</p>
          <button onClick={() => refetchMemberInfo()}>refetch</button>
        </div>
      )}
    </MemberInfo.Only>
  );
};

const MemberInfo = {
  Provider: MemberInfoProvider,
  use: useMemberInfoContext,
  Only: MemberInfoOnly,
  DevTools: MemberInfoDevTools,
};

export default MemberInfo;
