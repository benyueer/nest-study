## 前端项目使用Graphql

### 初始化
安装相关包
```
yarn add graphql

yarn add @graphql-codegen/cli @graphql-codegen/introspection @graphql-codegen/typescript @graphql-codegen/typescript-apollo-angular @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo @graphql-codegen/typescript-react-query @graphql-codegen/import-types-preset @graphql-codegen/near-operation-file-preset -D
```
初始化
```
yarn graphql-code-generator init
```
执行该命令后会在根目录出现`codegen.yml`配置文件
在`codegrn.yml`填写配置信息
```yml
overwrite: true
schema: "../nestdemo/schema.graphql"  # 源graphql文件位置
documents: "src/**/*.graphql" # 导出文档的路径
generates:  # generates配置
  src/service/graphql/generated/models.ts: # 生成的类型文件
    plugins:    # 插件
      - typescript
  src/service/graphql/generated:
    preset: near-operation-file # 用于输出的预设列表
    presetConfig:
      extension: .generated.ts
      baseTypesPath: models.ts
    plugins:
      # - "typescript"
      - "typescript-operations"
      # - "typescript-apollo-angular"
      # - "typescript-react-query"
      - "typescript-react-apollo" # react推荐使用该插件
  ./graphql.schema.json:
    plugins:
      - "introspection"
```
当配置无误后执行 `yarn codegen`命令，会在配置的目录生成结果文件
至此，graphql的相关配置和生成文件都完成

### 在react中使用
安装`@apollo/client`


#### 配置ApolloClient
```ts
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/',
  cache: new InMemoryCache(),
});
```
到此基本的配置已完成，在这种情况下可以不依赖`generater`的结果文件，直接手动构造语句发送请求，稍显麻烦：
```ts
client.query({
  query: gql`
    query userList {
      userList {
        name
      }
    }
  `
}).then(result => console.log(result))
```

在之前的配置中，我们使用`typescript-react-apollo`插件，生成hooks形式的调用，那么怎么使用它呢？
首先在React中配置 client
```tsx
<ApolloProvider client={client}>
  <App />
</ApolloProvider>,
```
将刚才实例化的`ApolloClient`通过`provider`传递给`App`及所有子组件
然后使用`useQuery`发送请求
一个标准的示例就是之前的`useUserListQuery`
```ts
function App() {
  const { loading, error, data, refetch } = useUserListQuery()
  if (loading) return <p>loading...</p>

  if (error) return <p>'error'</p>

  return (
    <div>
      <button onClick={() => refetch()}>refresh</button>
      {
        data?.userList.map((user: User) => user.name)
      }
    </div>
  );
}
```
当组件被渲染时，会执行`useUserListQuery`，他会返回请求的状态和结果，你可以根据这些结果定义不同的渲染状态
