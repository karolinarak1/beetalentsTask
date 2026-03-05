const http = require('k6/http');
const { check } = require('k6');
const { Trend, Rate } = require('k6/metrics');

const apiDuration = new Trend('api_duration_ms');
const apiErrorRate = new Rate('api_error_rate');
const blockedByWafRate = new Rate('blocked_by_waf_rate');

exports.options = {
  scenarios: {
    reqres_list_users: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s',
      duration: '6m',
      preAllocatedVUs: 100,
      maxVUs: 200
    }
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<1000']
  }
};

const BASE_URL = 'https://reqres.in';
const PATH = '/api/users?page=1';

exports.default = function () {
  const res = http.get(`${BASE_URL}${PATH}`, {
    headers: { Accept: 'application/json' }
  });

  apiDuration.add(res.timings.duration);

  const contentType = res.headers['Content-Type'] || '';
  const looksLikeWafBlock =
    res.status === 403 && contentType.includes('text/html') && String(res.body).includes('Just a moment');

  blockedByWafRate.add(looksLikeWafBlock);
  apiErrorRate.add(!(res.status === 200 && contentType.includes('application/json')));

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response is JSON': () => contentType.includes('application/json'),
    'not blocked by WAF': () => !looksLikeWafBlock
  });
};