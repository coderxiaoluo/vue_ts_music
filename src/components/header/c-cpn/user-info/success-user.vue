<template>
  <div class="success-user">
    <el-avatar @click="onHeadelUserClick" :src="profile.avatarUrl" />
    <!-- 登录后展示 -->
    <el-dropdown class="dropdown">
      <span class="el-dropdown-link">
        {{ profile.nickname }}
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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

// props
const props = defineProps({
  profile: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// emit
const emits = defineEmits(['emitExitUserClick'])
const exitUserClick = () => {
  emits('emitExitUserClick')
}

const userStore = useUserStore()
// 用户切换变量
const { isShowUserInfo } = storeToRefs(userStore)
// 去到个人页
const router = useRouter()
const onHeadelUserClick = () => {
  // 跳转之前发送数据
  userStore.getUserInfoAction(props.profile.userId)
  router.push({
    path: `/user/${props.profile.userId}`
  })
}
</script>

<style lang="less" scoped>
.success-user {
  display: flex;
  align-items: center;
  .el-avatar {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
    .dropdown {
      color: #ffffff;
    }
  }
}
</style>
