<template>
  <div class="app-container scroll-y">
    <div class="addBanner">
      <el-button type="primary" @click="addBanner">添加新banner</el-button>
    </div>
    <el-table v-loading="listLoading" :data="bannerList" element-loading-text="Loading" border highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template #default="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="banner标题" width="220">
        <template #default="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="图片地址" width="200" align="center">
        <template #default="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column label="图片预览" align="center">
        <template #default="scope">
          <img class="table-previewPicture" :src="scope.row.url" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <el-button @click="getBannerInfo(scope)">详情</el-button>
          <el-button type="danger" @click="reomveBanner(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogVisible" title="图片详情" width="50%">
    <div>
      <div class="bannerInfo">
        <div class="bannerInfo-title">banner标题:</div>
        <!-- <span>{{ avtiveBannerInfo.title }}</span> -->
        <div class="bannerInfo-content">
          <el-input v-model="avtiveBannerInfo.title" :disabled="settitle" placeholder="请输入标题" />
        </div>
        <div class="bannerInfo-btnbox">
          <el-button @click="settitle = !settitle">修改标题</el-button>
        </div>
      </div>

      <div class="bannerInfo">
        <div class="bannerInfo-title">图片地址:</div>
        <!-- <span>{{ avtiveBannerInfo.title }}</span> -->
        <div class="bannerInfo-content">
          <el-input v-model="avtiveBannerInfo.url" :disabled="setUrl" placeholder="请输入图片地址或者上传图片" />
        </div>
        <div class="bannerInfo-btnbox">
          <ImgUpload @setImg="setImg"></ImgUpload>
          <el-button @click="setUrl = !setUrl">网络地址</el-button>
        </div>
      </div>
      <div class="bannerInfo">
        <span>图片预览:</span>
        <img class="previewPicture" :src="avtiveBannerInfo.url" alt="" />
        <div></div>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="sevaBanner">保存</el-button>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  ADD_BANNER_API,
  bannerItem,
  GET_BANNER_LIST_RUL_API,
  SEVA_BANNER_INFOL_API,
  REMOVE_BANNER_API
} from '@/api/banner'
import { ElMessageBox } from 'element-plus'
import ImgUpload from '@/components/ImgUpload.vue'

const state = reactive<{
  listLoading: boolean
  bannerList: Array<bannerItem>
  dialogVisible: boolean
  avtiveBannerInfo: bannerItem
  setUrl: boolean
  settitle: boolean
}>({
  listLoading: true,
  bannerList: [],
  dialogVisible: false,
  avtiveBannerInfo: { id: 0, url: '', title: '' },
  setUrl: false,
  settitle: false
})

onBeforeMount(() => {
  fetchData()
})

const fetchData = async () => {
  state.listLoading = true
  try {
    const res = await GET_BANNER_LIST_RUL_API({
      pageNum: 1,
      pageSize: 20
    })
    state.bannerList = res.data.results
    // state.bannerList = res.data
  } catch (e) {
    console.log(e)
  }
  state.listLoading = false
}

const getBannerInfo = (info) => {
  // state.setUrl = true
  // state.settitle = true
  state.avtiveBannerInfo = JSON.parse(JSON.stringify(info.row))
  state.dialogVisible = true
}
const reomveBanner = (id) => {
  ElMessageBox.confirm('确定要删除当前banner吗', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await REMOVE_BANNER_API(id)
      fetchData()
    } catch (e) {
      console.log(e)
    }
  })
}
const sevaBanner = async () => {
  const { id, url, title } = avtiveBannerInfo.value
  if (id === 0) {
    try {
      await ADD_BANNER_API({
        url,
        title
      })
      state.dialogVisible = false
      fetchData()
    } catch (e) {
      console.log(e)
    }
  } else {
    try {
      await SEVA_BANNER_INFOL_API(id, {
        url,
        title
      })
      state.dialogVisible = false
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }
}
const addBanner = () => {
  state.avtiveBannerInfo = {
    url: '',
    title: '',
    id: 0
  }
  state.dialogVisible = true
}
const setImg = (url: string) => {
  console.log(url)
  state.avtiveBannerInfo.url = url
}
//导出属性到页面中使用
const { bannerList, listLoading, dialogVisible, avtiveBannerInfo, setUrl, settitle } = toRefs(state)
</script>
<style lang="scss" scoped>
.bannerInfo {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  .bannerInfo-title {
    width: 100px;
  }
  .bannerInfo-content {
    width: 500px;
  }
  .bannerInfo-btnbox {
    width: 160px;
    margin-left: 20px;
    display: flex;
    justify-content: space-between;
  }
  .previewPicture {
    width: 80%;
  }
}
.table-previewPicture {
  width: 50%;
}
.addBanner {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
