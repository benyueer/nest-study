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
#### swagger
#### WsAdapter
#### graphql
#### redis
#### mysql
#### mongo
#### typegoose

### nest设计思想
