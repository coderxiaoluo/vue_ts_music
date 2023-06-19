<template>
  <div class="song-left">
    <div v-if="currentMusic.al" class="left">
      <div class="img">
        <img :src="currentMusic.al?.picUrl" alt="" />
      </div>
      <div class="music-info">
        <div class="music-name">
          <el-text truncated>{{ currentMusic.al?.name }}</el-text>
        </div>
        <div class="singer">
          <template v-for="item in currentMusic?.ar" :key="item.id">
            <span>{{ item.name }} /</span>
          </template>
        </div>
      </div>
    </div>
    <!-- 没有展示 -->
    <div v-else class="noLeft">人之所以孤独,是因为不敢迈出第一步</div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentMusic: any
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.noLeft {
  width: 250px;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.left {
  width: 250px;
  height: 100%;
  display: flex;
  // background-color: red;

  .img {
    width: 50px;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .music-info {
    width: 180px;
    padding-top: 10px;
    margin-left: 10px;
    .music-name {
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
