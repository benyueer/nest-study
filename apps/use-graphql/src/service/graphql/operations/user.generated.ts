import * as Types from '../generated/models';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
export type UserListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserListQuery = { __typename?: 'Query', userList: Array<{ __typename?: 'User', name: string }> };


export const UserListDocument = `
    query userList {
  userList {
    name
  }
}
    `;
export const useUserListQuery = <
      TData = UserListQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: UserListQueryVariables,
      options?: UseQueryOptions<UserListQuery, TError, TData>
    ) =>
    useQuery<UserListQuery, TError, TData>(
      variables === undefined ? ['userList'] : ['userList', variables],
      fetcher<UserListQuery, UserListQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UserListDocument, variables),
      options
    );