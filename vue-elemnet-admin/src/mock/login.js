const userMap = {
  admin: {
    code: 200,
    msg: 200,
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://raw.githubusercontent.com/mgbq/nx-admin/master/src/assets/img/home/logo.png',
    name: 'Super Admin'
  },
  editor: {
    code: 200,
    msg: 200,
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
};
const userInfo = {
  "msg": "操作成功", "code": 200, "permissions": ["*:*:*"], "roles": ["admin"], "user": {
    "searchValue": null,
    "createBy": "admin",
    "createTime": "2020-11-20 19:29:42",
    "updateBy": null,
    "updateTime": null,
    "remark": "管理员",
    "params": {},
    "userId": 1,
    "deptId": 103,
    "userName": "admin",
    "nickName": "若依",
    "email": "ry@163.com",
    "phonenumber": "15888888888",
    "sex": "1",
    "avatar": "",
    "salt": null,
    "status": "0",
    "delFlag": "0",
    "loginIp": "127.0.0.1",
    "loginDate": "2020-11-20T19:29:42.000+0800",
    "dept": {
      "searchValue": null,
      "createBy": null,
      "createTime": null,
      "updateBy": null,
      "updateTime": null,
      "remark": null,
      "params": {},
      "deptId": 103,
      "parentId": 101,
      "ancestors": null,
      "deptName": "研发部门",
      "orderNum": "1",
      "leader": "若依",
      "phone": null,
      "email": null,
      "status": "0",
      "delFlag": null,
      "parentName": null,
      "children": []
    },
    "roles": [{
      "searchValue": null,
      "createBy": null,
      "createTime": null,
      "updateBy": null,
      "updateTime": null,
      "remark": null,
      "params": {},
      "roleId": 1,
      "roleName": "超级管理员",
      "roleKey": "admin",
      "roleSort": "1",
      "dataScope": "1",
      "menuCheckStrictly": false,
      "deptCheckStrictly": false,
      "status": "0",
      "delFlag": null,
      "flag": false,
      "menuIds": null,
      "deptIds": null,
      "admin": true
    }],
    "roleIds": null,
    "postIds": null,
    "admin": true
  }
};
const userRouters = {
  "msg": "操作成功", "code": 200, "data": [{
    "name": "System",
    "path": "/system",
    "hidden": false,
    "redirect": "noRedirect",
    "component": "Layout",
    "alwaysShow": true,
    "meta": {"title": "系统管理", "icon": "system", "noCache": false},
    "children": [{
      "name": "User",
      "path": "user",
      "hidden": false,
      "component": "system/user/index",
      "meta": {"title": "用户管理", "icon": "user", "noCache": false}
    }]
  }]
};
export default {
  loginByUsername: config => {
    const {username} = JSON.parse(config.body);
    return userMap[username]
  },
  getInfo: config => {
    return userInfo
  },
  getRouters: config => {
    return userRouters
  },
  logout: () => {
    return {
      code: 0,
      Message: 'success'
    }
  }
}
