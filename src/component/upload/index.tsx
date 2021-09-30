import React, { PureComponent } from 'react'

import { Upload, UploadProps, message, Modal, Avatar } from 'antd'

import { RcFile } from 'antd/lib/upload'

import { UploadChangeParam } from 'antd/lib/upload/interface'

import ImgCrop from 'antd-img-crop'

interface Props {}

interface State {
  imgurl: string
}

export default class AvatarUpload extends PureComponent<Props, State> {
  state: State = {
    imgurl: 'src/component/upload/add.png',
  }

  // 限制图片的格式，size，分辨率
  handleBeforeUpload = (file: RcFile) => {
    const isJPG = file.type === 'image/jpeg'
    const isJPEG = file.type === 'image/jpeg'
    const isGIF = file.type === 'image/gif'
    const isPNG = file.type === 'image/png'
    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      Modal.error({
        title: '只能上传JPG 、JPEG 、GIF、 PNG格式的图片~',
      })
      return false
    }
    const isLt2M = file.size / 1024 / 1024 < 5 //小于5M
    if (!isLt2M) {
      Modal.error({
        title: '图片超过5M限制，不允许上传~',
      })
      return false
    }
    return (isJPG || isJPEG || isGIF || isPNG) && isLt2M // && checkImageWH(file);
  }

  handleChange = (info: UploadChangeParam) => {
    let { file } = info
    switch (file.status) {
      case 'uploading':
        break
      case 'done':
        if (file.response && file.response.code) {
          message.success('上传成功！')
          this.setState({
            imgurl: file.response.fileUrl,
          })
        } else {
          message.error(file.response ? file.response.msg : '上传失败！')
        }
        break
    }
  }

  render() {
    const { handleBeforeUpload, handleChange } = this
    const { imgurl } = this.state

    const uploadParam: UploadProps = {
      accept: '.jpeg,.gif,.png,.jpg',
      action: '/api/upload',
      headers: {
        authorization: 'authorization-text',
      },
      showUploadList: false,
      beforeUpload: handleBeforeUpload,
      onChange: handleChange,
    }

    const imgCropParam = {
      width: 500, //裁剪宽度  5 / 3
      height: 300, //裁剪高度
      resize: false, //裁剪是否可以调整大小
      resizeAndDrag: true, //裁剪是否可以调整大小、可拖动
      modalTitle: '上传头像', //弹窗标题
      modalWidth: 600, //弹窗宽度
      modalOk: '确定',
      modalCancel: '取消',
    }

    const mask = <div className="mask"></div>

    return (
      <ImgCrop shape="round" fillColor="red" {...imgCropParam}>
        <Upload {...uploadParam}>
          <Avatar src={imgurl} size={80} />
        </Upload>
      </ImgCrop>
    )
  }
}
