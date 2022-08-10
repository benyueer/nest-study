import React from 'react'
import { UserListQuery, useUserListQuery } from '../service/graphql/operations/user.generated'
import { QueryWare } from './queryWare'

export default function userList() {
  let query = useUserListQuery
  return (
    <QueryWare
      query={query as any}
    >
      {
        (data: UserListQuery) => {
          return data.userList.map((user) => <p key={user.name}>{user.name}</p>)
        }
      }
    </QueryWare>
  )
}
