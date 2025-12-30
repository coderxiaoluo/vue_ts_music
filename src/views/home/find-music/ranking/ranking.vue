<template>
  <div class="ranking">
    <!-- 官方榜 -->
    <div class="offical area">
      <h3>官方榜</h3>
      <template v-for="item in mapItem" :key="item.id">
        <div class="officalItem">
          <div class="listCover" @click="onMusicDetailClick(item)">
            <img :src="getOptimizedImageUrl(item.coverImgUrl)" alt="" loading="lazy" />
          </div>
          <div class="listContainer">
            <el-table :data="item?.tracks" stripe :show-header="false" style="width: 100%"
              :row-key="(row, index) => index" size="small" :default-expand-all="false">
              <el-table-column type="index" width="50" />
              <el-table-column prop="first" label="" width="600" />
              <el-table-column prop="second" label="" width="300" />
            </el-table>
            <div class="checkAll">查看全部</div>
          </div>
        </div>
      </template>
    </div>
    <!-- 全球榜 -->
    <div class="global area">
      <h3>全球榜</h3>
      <SongLists :songList="mapEndItem" :isRender="true" :isTitle="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
// 路由
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

// songlist
import SongLists from '@/components/song-list/song-lists.vue'

// 仓库状态管理
import { useRankingStore } from '@/stores/ranking'

// 优化图片URL，添加尺寸参数，减少图片大小
const getOptimizedImageUrl = (url: string | undefined): string => {
  if (!url) return ''
  // 检查是否已经有尺寸参数
  if (url.includes('?param=')) return url
  // 添加合适的尺寸参数，根据组件大小调整
  return `${url}?param=200y200`
}
const rankingStore = useRankingStore()
// 发送排行榜请求
rankingStore.topRankingListAction()

// 拿到数据
const { mapItem, mapEndItem } = storeToRefs(rankingStore)

// 点击跳转
const router = useRouter()
const onMusicDetailClick = (v: any) => {
  router.push({
    path: `/musicdetail/${v.id}`
  })
}
</script>

<style lang="less" scoped>
.ranking {
  width: 100%;
}

// 官方榜
.offical {
  h3 {
    font-size: 20px;
    font-weight: 900;
    margin: 20px 0;
  }

  //
  .officalItem {
    display: flex;
    width: 100%;
    margin-top: 20px;
    // background-color: skyblue;

    .listCover {
      width: 200px;
      height: 100%;
      // background-color: pink;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .listContainer {
      flex: 1;
      margin-left: 20px;

      .checkAll {
        font-size: 12px;
        margin-top: 10px;
        padding-left: 10px;
      }
    }
  }
}

// 全球榜
.global {
  h3 {
    font-size: 20px;
    font-weight: 900;
    margin: 20px 0;
  }
}
</style>
