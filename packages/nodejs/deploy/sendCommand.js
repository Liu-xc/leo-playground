'use strict';
// This file is auto-generated, don't edit it
// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
const Ecs20140526 = require('@alicloud/ecs20140526');
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');
const path = require('path');
const fs = require('fs');

class Client {

  /**
   * 使用AK&SK初始化账号Client
   * @return Client
   * @throws Exception
   */
  static createClient () {
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例仅供参考。
    // 建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html。
    let config = new OpenApi.Config({
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
      accessKeyId: process.env['ALIBABA_CLOUD_ACCESS_KEY_ID'],
      // 必填，请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
      accessKeySecret: process.env['ALIBABA_CLOUD_ACCESS_KEY_SECRET'],
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Ecs
    config.endpoint = `ecs.cn-beijing.aliyuncs.com`;
    return new Ecs20140526.default(config);
  }

  static async main (args) {
    let client = Client.createClient();
    const command = fs.readFileSync(path.resolve(__dirname, './deploy.sh'), 'utf-8');
    let runCommandRequest = new Ecs20140526.RunCommandRequest({
      regionId: 'cn-beijing',
      type: 'RunShellScript',
      commandContent: 'cd /root/leo-playground/packages/nodejs && git pull && bash ./deploy/deploy.sh',
      instanceId: [
        'i-2ze8tk997dfynbrx9smz'
      ],
    });
    let runtime = new Util.RuntimeOptions({});
    try {
      // 复制代码运行请自行打印 API 的返回值
      const res = await client.runCommandWithOptions(runCommandRequest, runtime);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

}

exports.Client = Client;
Client.main(process.argv.slice(2));