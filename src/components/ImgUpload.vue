<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://api.valarhashjp.com/common/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button>本地上传</el-button>
    </el-upload>
  </div>
</template>
<script setup lang="ts">

import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
const emit = defineEmits(["setImg"]);


const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  const imgUrl = `https://image.valarhashjp.com/${response.data.path}`
  emit('setImg',imgUrl)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const canBeUsedImgTypes = ['image/jpeg', 'image/png']
  if (!canBeUsedImgTypes.includes(rawFile.type)) {
    ElMessage.error('请上传正确格式的图片')
    return false
  }
  return true
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
