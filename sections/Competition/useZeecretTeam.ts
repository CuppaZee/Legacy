// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest, { useAPIRequestWithoutNav } from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useMemo } from 'react';

export default function useZeecretTeam(username: any, nav: any) {
  const userBookmarks = useSelector((i: any) => i.userBookmarks);
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