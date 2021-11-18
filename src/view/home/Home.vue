<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img src="@/assets/images/logo_1.webp" alt="" />
        <span>狗狗后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleClick">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#369BFF"
          unique-opened
          router
          :default-active="activePath"
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id.toString()"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      // 侧边菜单是否收起
      isCollapse: false,
      // 被激活的链接地址
      activePath: "",
    };
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
  },
  name: "Home",
  methods: {
    // 退出按钮
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 左侧边栏折叠
    toggleClick() {
      this.isCollapse = !this.isCollapse;
    },
    // 保存当前点击的二级菜单
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
      this.activePath = activePath
    },
    // 请求菜单栏数据
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return console.log(res.meta.msg);
      this.menuList = res.data;
      // console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373c41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #eaedf1;
  font-size: 20px;
  > div {
    height: 60px;
    display: flex;
    align-items: center;
    img {
      height: 80%;
      border-radius: 50%;
      border: 2px solid #ccc;
      box-sizing: border-box;
    }
    span {
      margin-left: 15px;
      width: 170px;
    }
  }
}
.el-aside {
  background-color: #323744;
  .el-menu {
    border-right: none;
  }
  .el-submenu {
    overflow: hidden;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  text-align: center;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>