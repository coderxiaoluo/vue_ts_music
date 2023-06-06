<template>
  <div></div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
// 扫码登录 标题
#login-code-container .title {
  margin-top: 30px;
  font-size: 28px;
  text-align: center;
  color: #3c3c3c;
}
// 选择其他登录模式 样式
#login-code-container .other-way {
  display: inline-block;
  margin: 30px 0 25px 0;
  width: 100%;
  text-align: center;
  padding-right: 0;
  font-size: 12px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.8);
  text-decoration: none;
}
// 选择其他登录模式 hover 样式
#login-code-container .other-way:hover {
  text-decoration-line: underline;
}
// 中间主体扫码样式
#login-code-container .main-outer {
  height: 250px;
  margin-top: 40px;
  // background-color: rgb(209, 169, 169);
}
// 左边图片外框 右边二维码外框
.left-img-outer,
.right-code-outer {
  display: inline-block;
  width: 45%;
}
.left-img-outer {
  // background-color: rgb(174, 218, 138);
}
.right-code-outer {
  float: right;
  padding: 20px 0;
  // background-color: rgb(218, 210, 147);
}
.right-code-outer > p {
  text-align: center;
  line-height: 20px;
}
.right-code-outer a {
  text-decoration: none;
  color: #0c73c2;
}
#left-img {
  width: 100%;
}
#right-code {
  width: 100%;
  height: 135px;
  // background-color: rgb(238, 234, 175);
  margin: 10px 0;
  position: relative;
}
#right-code img {
  width: 100%;
}
#right-code .code-invalid {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(5, 5, 5, 0.7);
}

.code-invalid p {
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin: 30% 0 10%;
}
.code-invalid h5 {
  text-align: center;
}
#right-code .code-loading {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgba(253, 253, 253, 0.9);
}
.code-loading i {
  margin-top: 35%;
  font-size: 20px;
}
.code-loading p {
  line-height: 20px;
  text-align: center;
  color: #3c3c3c;
}
</style>
