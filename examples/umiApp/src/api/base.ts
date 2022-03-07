import { extend } from 'umi-request';
export const request = extend({
  prefix: 'http://localhost:3000/v1',
  timeout: 1000,
  headers: {
      'Content-Type': 'application/json',
  },
});



export const commandRequest = (url, postData) => {
  const { action, model, serverIds, current: page, serverId, ...rest } = postData
  return request.post(url, { data: { action, model, serverIds, data: {...rest,page} } })
}
