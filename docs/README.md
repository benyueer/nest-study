## nestjs
### 创建
```bash
安装nestjs
npm i -g @nestjs/cli

创建项目
nest new project-name
```
按照提示创建完成后会出现新项目
### 目录结构
```
src
 ├── app.controller.spec.ts
 ├── app.controller.ts
 ├── app.module.ts
 ├── app.service.ts
 └── main.ts
```
和所有js项目一样，有一个`package.json`描述项目
有一个ts配置文件和`nest-cli.json`配置文件
代码风格配置（eslint，prettier）
项目入口是`main.ts`

入口文件声明了`bootstrap`函数并执行
`bootstrap`函数通过Nest工厂创建了一个实例，这个实例的配置一般来自`AppModule`
另外，你可以在实例上配置各种插件，如`swigger`等

`AppModule`可以说是另一意义上的项目入口，他是一个`Module`
Nest使用了大量注解，使用了依赖注入模式，这一点和Spring相似，同时Angular也有这一特征，通过大量的配置代码简化了开发



### 核心概念
#### 模块 Module
#### Injectable


### web服务

### 插件
#### nest/config
nest提供了@nestjs/config包，用于加载和读取项目的配置，该包内部使用了`dotenv`
首先，安装这个包：
```bush
yarn add @nestjs/config
```
配置：
在`AppModule`配置`ConfigModule`
```ts
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
       isGlobal: true, // 当要在其他Module使用ConfigModule时，设置global为true，那么ConfigModule会被设置为root Module
    })
  ]
})
// ConfigModuleOption 有以下配置：
export interface ConfigModuleOptions {
    isGlobal?: boolean;
    ignoreEnvFile?: boolean;
    ignoreEnvVars?: boolean;
    envFilePath?: string | string[];
    encoding?: string;
    validationSchema?: any;
    validationOptions?: Record<string, any>;
    load?: Array<ConfigFactory>;
    expandVariables?: boolean;
}
```

使用配置：
使用ConfigService即可获取配置
```ts
const baseUrl = this.configService.get('baseUrl')
```
`get`方法还具有第二个参数，可以配置默认值：
```ts
const base = this.configService.get('base', 'localhost') // 当base不存在时就取得默认值localhost
```
另外，第二个参数设置为`{info: true}`时会自动根据COnfigService配置的泛型检测配置项的类型
```ts
interface ConfigType {
  name: string,
  port: number
}
{
  constructor(private configService: ConfigService<ConfigType>) {
    const port = this.configService.get('port', { infer: true }) // 自动推断port为number

    // typeScript error： url is not defined
    const url = this.configService.get('url', { infer: true })
  }

}
```

#### swagger
OpenAPI规范，安装`@nestjs/swagger`
```bush
yarn add @nestjs/swagger
```
在`main.ts`配置：
```ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

#### WsAdapter
#### graphql
安装相关包
```bush
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```
配置：
```ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // 代码优先的方式要配置生成的graphql文件的位置
      autoSchemaFile: 'schema.graphel'
    }),
  ],
})
export class AppModule {}
```
定义resolver：
```bush
* 先使用nextjs/cli生成module
nest g m user
* 再生成resolver
nest g r user
```
定义entities和dto
```ts
// user.entity.ts
@ObjectType()
class User {
  @Field()
  name: string
}

// user.input.ts
@InputType()
class UserInput {
  @Field()
  name: string
}
```
在resolver中使用：
```ts
@Resolver()
class UserResolver {
  @Query(() => User)
  async getUserByName(@Args({name: 'name', type: () => string}) name: string) => Promise<User> {
    return {name}
  }
}
```


#### redis
#### mysql
安装相关包：
```bush
yarn add @nestjs/typeorm typeorm mysql2
```

配置链接:
```ts
TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('mysqlhost'),
    port: +configService.get('mysqlport'),
    username: configService.get('mysqluser'),
    password: configService.get('mysqlpwd'),
    database: configService.get('database'),
    synchronize: true,
    entities: [User],
  }),
  inject: [ConfigService],
}),
```
配置entity：
```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({
    unique: true
  })
  name: string;
}
```

使用
```ts

```

#### mongo
#### typegoose

### nest设计思想
