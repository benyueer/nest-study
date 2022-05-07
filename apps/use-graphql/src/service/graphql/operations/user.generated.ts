import * as Types from '../generated/models';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type UserListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type UserListQuery = { __typename?: 'Query', userList: Array<{ __typename?: 'User', name: string }> };

export const UserListDocument = gql`
    query userList {
  userList {
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserListGQL extends Apollo.Query<UserListQuery, UserListQueryVariables> {
    document = UserListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }