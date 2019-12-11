# moda-web
### 一个基于vue的内容管理WebApp —— 英雄联盟
#### 使用的技术栈
- 后端：Koa2、MongoDB、mongoose
- 前端：VueJs

#### 启动项目
1. 第一步：构建admin页面
   
   ```
   cd ./admin
   npm install
   npn run build
   ```
2. 第二部：构建WebApp页面
   ```
   cd ./web
   npm install
   npn run build
   ```
3. 启动项目
   ```
   cd ./server
   npm run dev
   ```
4. 打开初始化数据页面，生成默认的用户名`admin`和密码`admin`
   ```
   http://localhost:3000/init
   ```
5. 预览
   
   - 前台：`http://localhost:3000/`
   - 后台：`http://localhost:3000/admin`