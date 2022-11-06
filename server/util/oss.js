const oss = require('ali-oss')

const OssUtil = {
  upload (config) {
    return new Promise((resolve, reject) => {
      const store = oss({
        accessKeyId: config.keyId,
        accessKeySecret: config.keySecret,
        bucket: config.bucketName,
        region: config.region,
        endpoint: config.endpoint
      })

      store.put(config.catalogue, config.filePath).then((result) => {
        resolve(result.res.status === 200)
      })
    })
  }
}

module.exports = OssUtil
