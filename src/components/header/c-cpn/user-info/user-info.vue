<template>
  <!-- 用户信息 -->
  <div class="user-info">
    <template v-if="isStatus">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <!-- 登录后展示 -->
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          小罗
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exitUserClick">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <!-- 登录 -->
    <template v-else>
      <el-button plain class="loginBtn" round @click="onLoginClick">登录</el-button>
    </template>
    <!-- 登录+++++++++++++++++++++++++++++++++++++=  -->
    <div class="login">
      <el-dialog
        @click="onCloseClick"
        v-model="dialogTableVisible"
        title="请登录"
        center="center"
        draggable
      >
        <el-tabs v-model="activeName" class="tab-login" stretch>
          <el-tab-pane label="扫码登录" name="1">
            <img :src="qrimg" alt="登录" />
            <div class="text">
              <el-text class="mx-1" type="info"> 请使用网易云音乐app扫码登录 </el-text>
            </div>
            <!-- 扫码的状态显示 -->
            <div class="mask" v-if="inspect">待确认</div>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="2">
            <el-form
              :model="rulePhone"
              ref="formRef"
              :rules="rules"
              label-width="120px"
              class="form"
              status-icon
            >
              <el-form-item label="手机号" prop="phone">
                <el-input v-model.number="rulePhone.phone" />
              </el-form-item>
              <el-form-item label="验证码" prop="verify">
                <el-input class="code" v-model.number="rulePhone.verify" />
                <el-button type="primary" @click="loginBtnCodeClick(formRef)">获取验证码</el-button>
              </el-form-item>
              <el-button type="primary" class="login-button" @click="loginBtnClick(formRef)"
                >登录</el-button
              >
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="其它登录" name="3">Config</el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia'

// import Login from '@/components/login/login.vue'
// 获取store
const loginStore = useLoginStore()

const { qrimg, stopTimer, inspect, isStatus, isDialogTableVisible } = storeToRefs(loginStore)

const formRef = ref<any>()

// 登录页面展示
const dialogTableVisible = ref(false)

// tab默认展示
const activeName = ref('1')
// 登录按钮
const onLoginClick = () => {
  dialogTableVisible.value = true
  // 获取二维码
  loginStore.getLoginQrKeyAction()
}
watch(dialogTableVisible, (newVal) => {
  // 关闭请求
  if (!newVal) clearInterval(stopTimer.value)
})

watch(isDialogTableVisible, (newVal) => {
  dialogTableVisible.value = newVal
  // 关闭请求
  clearInterval(stopTimer.value)
})

// 关闭登录
const onCloseClick = () => {
  dialogTableVisible.value = true
  // 停止检测二维码
  clearInterval(stopTimer.value)
}

// 校验规则
const rulePhone = reactive({
  phone: '',
  verify: ''
})

// 校验规则
const rules = reactive<any>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
      message: '手机号格式不正确!',
      trigger: 'blur'
    }
  ]
})

// 发送验证码
const loginBtnCodeClick = (formRef: any | undefined) => {
  if (!formRef) return
  formRef.validate((valid: any) => {
    if (valid) {
      console.log('已发送')
      // 拿到手机号发送请求
      loginStore.getCaptchaSentAction(Number(rulePhone.phone))
    } else {
      console.log('错误')
    }
  })
}

// 登录
const loginBtnClick = (formRef: any | undefined) => {
  if (!formRef) return
  formRef.validate((valid: any) => {
    if (valid) {
      // 拿到手机号发送请求
      loginStore.getCaptchaVerifyAction(Number(rulePhone.phone), Number(rulePhone.verify))
    } else {
      console.log('错误')
    }
  })
}

// 退出登录
const exitUserClick = () => {
  loginStore.getExitLogoutAction()
}
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  align-items: center;

  .el-avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;

    .dropdown {
      color: #ffffff;
    }
  }
  .loginBtn {
    width: 100px;
    color: #ffffff;
    background-color: var(--music-header-right);
  }
}

.login {
  position: fixed;
  left: 50%;
  top: 50%;
  .el-dialog {
    text-align: center;
  }
  .tab-login {
    height: 300px;
    flex-direction: column;
    .el-tabs__content {
      text-align: center;
      img {
        position: relative;
        left: 270px;
        width: 180px;
        height: 180px;
      }
    }
    .text {
      text-align: center;
      margin-top: 10px;
    }

    .mask {
      position: absolute;
      left: 270px;
      top: 0;
      width: 180px;
      color: #ffffff;
      line-height: 200px;
      text-align: center;
      height: 180px;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}

.form {
  text-align: center;
  width: 400px;
  margin-top: 30px;
  margin-left: 100px;

  .code {
    width: 100px;
  }
  .el-button {
    margin-left: 75px;
  }
  .login-button {
    width: 50%;
  }
}
</style>
