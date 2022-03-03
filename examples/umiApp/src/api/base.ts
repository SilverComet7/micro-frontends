import { extend } from 'umi-request';

export const request = extend({

  prefix: '/v1',
  timeout: 1000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
