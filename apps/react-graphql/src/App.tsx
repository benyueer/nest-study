import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import './App.css';
import UserList from './components/userList';
import { User } from './service/graphql/generated/models';
import { useUserListQuery, useUserQuery } from './service/graphql/operations/user.generated';

function App() {
  // const { loading, error, data, refetch } = useUserListQuery()
  const { loading, error, data, refetch } = useUserQuery({ variables: { id: 'qwe' } })
  const [count, setCount] = useState(0)
  if (loading) return <p>loading...</p>

  if (error) return <p>'error'</p>

  return (
    <div>
      <button onClick={() => refetch()}>refresh</button>
      {
        data?.user.name
      }
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <UserList></UserList>
    </div>
  );
}

export default App;
