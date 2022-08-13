import React, { useEffect } from 'react'
import { UserListQuery, useUserListLazyQuery, useUserListQuery } from '../service/graphql/operations/user.generated'
import { QueryWare } from './queryWare'

export default function UserList() {
  const [getUserList, { loading, error, data }] = useUserListLazyQuery();
  useEffect(() => {
    getUserList()
  }, [getUserList])
  return (
    <div>
      {
        data?.userList.map((user) => user.name)
      }
    </div>
  )
}
