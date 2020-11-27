import useAPIRequest, { useAPIRequestWithoutNav } from 'utils/hooks/useAPIRequest';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function useZeecretTeam(username, nav) {
  const userBookmarks = useSelector(i => i.userBookmarks);
  const navCached = useMemo(()=>nav)
  const { data, status } = (navCached ? useAPIRequestWithoutNav : useAPIRequest)(
    (!username || userBookmarks.some(i => i.username === username)) ? {
      endpoint: "competition/users/v2",
      data: {
        users: userBookmarks.map(i => i.username).join(',')
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