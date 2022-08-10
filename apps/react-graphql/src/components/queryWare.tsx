import { QueryHookOptions, QueryResult } from '@apollo/client'
import React from 'react'
interface WareProps {
  query: (baseOptions: QueryHookOptions) => QueryResult
  variables?: any
  children: any
}

export const QueryWare: React.FC<WareProps> = ({ children, query, variables }) => {
  const { loading, error, data, refetch } = query({ variables })
  if (loading) return <p>loading...</p>
  if (error) return <p>error</p>
  console.log(children)
  return (
    children(data)
    // React.Children.map(children, (child) => {
    //   return child(data)
    // })
  )
}
