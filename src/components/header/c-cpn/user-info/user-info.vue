<template>
  <!-- 用户信息 -->
  <div class="user-info">
    <!-- 用户信息 -->
    <SuccessUser :profile="profile" v-if="isStatus" @emitExitUserClick="emitHandleClick" />
    <!-- 登录 -->
    <template v-else>
      <!-- <el-button plain class="loginBtn" @click="onLoginClick">登录</el-button> -->
      <a href="#" class="loginBtn" @click="onLoginClick">
        登录
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>
    </template>
    <!-- 登录 -->
    <div class="login">
      <el-dialog
        @click="onCloseClick"
        v-model="dialogTableVisible"
        title="请登录"
        draggable
        class="dialog"
      >
        <el-tabs v-model="activeName" class="tab-login" stretch>
          <el-tab-pane label="扫码登录" name="1">
            <img :src="qrimg" alt="登录" />
            <div class="text">
              <el-text class="mx-1" type="info"> 请使用网易云音乐app扫码登录 </el-text>
            </div>
            <!-- 扫码的状态显示 -->
            <div class="mask" v-if="inspect">待确认</div>
            <div class="mask" v-if="expireQr" @click="expireQrClick">重新发送</div>
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
import SuccessUser from './success-user.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
// 获取store
const loginStore = useLoginStore()

const { qrimg, stopTimer, inspect, expireQr, account, profile, isStatus, isDialogTableVisible } =
  storeToRefs(loginStore)

const formRef = ref<FormInstance>()
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
const rules = reactive<FormRules>({
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
const loginBtnCodeClick = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate((valid: boolean) => {
    if (valid) {
      // console.log('已发送')
      // 拿到手机号发送请求
      loginStore.getCaptchaSentAction(Number(rulePhone.phone))
    } else {
      // console.log('错误')
    }
  })
}

// 登录
const loginBtnClick = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate((valid: boolean) => {
    if (valid) {
      // 拿到手机号发送请求
      loginStore.getCaptchaVerifyAction(Number(rulePhone.phone), Number(rulePhone.verify))
    } else {
      // console.log('错误')
    }
  })
}
// 从新发送请求
const expireQrClick = () => {
  // 获取二维码
  loginStore.getLoginQrKeyAction()
}

// 退出登录
const emitHandleClick = () => {
  ElMessageBox.confirm('是否确认退出?', 'Warning', {
    confirmButtonText: '否',
    cancelButtonText: '退出',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '取消退出'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '退出成功'
      })
      loginStore.getExitLogoutAction()
    })
}
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  align-items: center;

  .loginBtn {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    color: #f7f7f7;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    letter-spacing: 4px;

    &:hover {
      background: var(--music-bgc-primary);
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px #0b8cdc, 0 0 25px #055ac2, 0 0 50px #073dd2, 0 0 100px #031bf4;
    }
    span {
      position: absolute;
      display: block;
    }
    span:nth-child(1) {
      top: 0;
      left: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, transparent, #03e9f4);
      animation: btn-anim1 1s linear infinite;
    }
    span:nth-child(2) {
      top: -100%;
      right: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(180deg, transparent, #03e9f4);
      animation: btn-anim2 1s linear infinite;
      animation-delay: 0.25s;
    }
    span:nth-child(3) {
      bottom: 0;
      right: -100%;
      width: 100%;
      height: 2px;
      background: linear-gradient(270deg, transparent, #03e9f4);
      animation: btn-anim3 1s linear infinite;
      animation-delay: 0.25s;
    }
    span:nth-child(4) {
      bottom: -100%;
      left: 0;
      width: 2px;
      height: 100%;
      background: linear-gradient(270deg, transparent, #03e9f4);
      animation: btn-anim4 1s linear infinite;
      animation-delay: 0.75s;
    }

    @keyframes btn-anim2 {
      0% {
        top: -100%;
      }

      50%,
      100% {
        top: 100%;
      }
    }
    @keyframes btn-anim1 {
      0% {
        left: -100%;
      }

      50%,
      100% {
        left: 100%;
      }
    }
    @keyframes btn-anim3 {
      0% {
        right: -100%;
      }

      50%,
      100% {
        right: 100%;
      }
    }
    @keyframes btn-anim4 {
      0% {
        bottom: -100%;
      }

      50%,
      100% {
        bottom: 100%;
      }
    }
  }
}

.login {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 9999;

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
