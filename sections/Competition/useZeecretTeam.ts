
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest, { useAPIRequestWithoutNav } from 'utils/hooks/useAPIRequest';

import { useSelector } from 'react-redux';

import { useMemo } from 'react';

export default function useZeecretTeam(username: any, nav: any) {
  const userBookmarks = useSelector((i: any) => i.userBookmarks);


  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  const navCached = useMemo(()=>nav)
  const { data, status } = (navCached ? useAPIRequestWithoutNav : useAPIRequest)(
    (!username || userBookmarks.some((i: any) => i.username === username)) ? {
      endpoint: "competition/users/v2",
      data: {
        users: userBookmarks.map((i: any) => i.username).join(',')
      },
      cuppazee: true
    } : {
        endpoint: "competition/users/v2",
        data: {
          users: username
        },
        cuppazee: true
      }, true)
  return {
    data: username ? data?.[username] : data,
    status: status
  }
}