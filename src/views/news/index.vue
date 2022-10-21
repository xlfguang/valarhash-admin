<template>
  <div class="app-container scroll-y">
    <div class="addBanner">
      <el-button type="primary" @click="addBanner">添加新闻</el-button>
    </div>
    <el-table v-loading="listLoading" :data="newsList" element-loading-text="Loading" border highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template #default="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template #default="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="预览图" width="200" align="center">
        <template #default="scope">
          <img class="table-previewPicture" :src="scope.row.figure" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="概览" align="center">
        <template #default="scope">
          {{ scope.row.overview }}
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template #default="scope">
          {{ scope.row.content }}
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

  <el-dialog v-model="dialogVisible" title="新闻详情" width="50%">
    <div>
      <div class="bannerInfo">
        <div class="bannerInfo-title">标题:</div>
        <div class="bannerInfo-content">
          <el-input v-model="avtivenewsInfo.title" :disabled="settitle" placeholder="请输入标题" />
        </div>
        <div class="bannerInfo-btnbox">
          <el-button @click="settitle = !settitle">修改标题</el-button>
        </div>
      </div>

      <div class="bannerInfo">
        <div class="bannerInfo-title">概念图地址:</div>
        <!-- <span>{{ avtivenewsInfo.title }}</span> -->
        <div class="bannerInfo-content">
          <el-input v-model="avtivenewsInfo.figure" :disabled="setUrl" placeholder="请输入图片地址或者上传图片" />
        </div>
        <div class="bannerInfo-btnbox">
          <ImgUpload @setImg="setImg"></ImgUpload>
          <el-button @click="setUrl = !setUrl">网络地址</el-button>
        </div>
      </div>
      <div class="bannerInfo">
        <span>概念图预览:</span>
        <img class="previewPicture" :src="avtivenewsInfo.figure" alt="" />
        <div></div>
      </div>

      <div class="bannerInfo">
        <div class="bannerInfo-title">概览:</div>
        <div class="bannerInfo-content">
          <el-input
            v-model="avtivenewsInfo.overview"
            type="textarea"
            :disabled="setOverview"
            placeholder="请输入概览"
          />
        </div>
        <div class="bannerInfo-btnbox">
          <el-button @click="setOverview = !setOverview">修改概览</el-button>
        </div>
      </div>

      <div class="bannerInfo">
        <div class="bannerInfo-title">内容:</div>
        <div class="bannerInfo-content">
          <Editor v-model:html="avtivenewsInfo.content" />
        </div>
        <div class="bannerInfo-btnbox">
          <el-button @click="settitle = !settitle">修改标题</el-button>
        </div>
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
import { ADD_NEWS_API, newsItem, GET_NEWS_LIST_API, SEVA_NEWS_INFOL_API, REMOVE_NEWS_API } from '@/api/news'
import { ElMessageBox } from 'element-plus'

import ImgUpload from '@/components/ImgUpload.vue'
import Editor from '@/components/Editor.vue'

const state = reactive<{
  listLoading: boolean
  newsList: Array<newsItem>
  dialogVisible: boolean
  avtivenewsInfo: newsItem
  setUrl: boolean
  settitle: boolean
  setOverview: boolean
}>({
  listLoading: true,
  newsList: [],
  dialogVisible: false,
  avtivenewsInfo: {
    id: 0,
    content: '',
    title: '',
    overview: '',
    figure: ''
  },
  setUrl: true,
  settitle: true,
  setOverview: true
})

onBeforeMount(() => {
  fetchData()
})

const fetchData = async () => {
  state.listLoading = true
  try {
    const res = await GET_NEWS_LIST_API({
      pageNum: 1,
      pageSize: 10
    })
    state.newsList = res.data.results
    // state.bannerList = res.data
  } catch (e) {
    console.log(e)
  }
  state.listLoading = false
}

const getBannerInfo = (info) => {
  state.setUrl = true
  state.settitle = true
  state.avtivenewsInfo = JSON.parse(JSON.stringify(info.row))
  state.dialogVisible = true
}
const reomveBanner = (id) => {
  ElMessageBox.confirm('确定要删除当前新闻吗', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await REMOVE_NEWS_API(id)
      fetchData()
    } catch (e) {
      console.log(e)
    }
  })
}
const sevaBanner = async () => {
  const { id, content, title, overview, figure } = avtivenewsInfo.value
  if (id === 0) {
    try {
      await ADD_NEWS_API({
        content,
        title,
        overview,
        figure
      })
      state.dialogVisible = false
      fetchData()
    } catch (e) {
      console.log(e)
    }
  } else {
    try {
      await SEVA_NEWS_INFOL_API(id, {
        content,
        title,
        overview,
        figure
      })
      state.dialogVisible = false
      fetchData()
    } catch (e) {
      console.log(e)
    }
  }
}
const addBanner = () => {
  state.avtivenewsInfo = {
    id: 0,
    content: '',
    title: '',
    overview: '',
    figure: ''
  }
  state.dialogVisible = true
}
const setImg = (url: string) => {
  state.avtivenewsInfo.figure = url
}
//导出属性到页面中使用
const { newsList, listLoading, dialogVisible, avtivenewsInfo, setUrl, settitle, setOverview } = toRefs(state)
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
