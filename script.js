import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  // vus: 10,
  // duration: '120s',
  // rps: 1000,
  // throw: true,
  stages: [
    { duration: '30s', rps: 1 },
    { duration: '30s', rps: 10 },
    { duration: '30s', rps: 100 },
    { duration: '30s', rps: 1000 },
  ],
};

export default function () {
  // static
  const res1 = http.get(`http://localhost:3003/?${Math.round(Math.random() * 10000000)}`);

  // const res2 = http.get(`http://localhost:3003/${Math.round(Math.random() * 120000000)}`);

  const res3 = http.get(`http://localhost:3003/api-reviews/${Math.round(Math.random() * 10000000)}`);
  check(res1, {
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 200,
  });
  // check(res2, {
  //   'status was 200': (r) => r.status == 200,
  //   'transaction time OK': (r) => r.timings.duration < 200,
  // });
  check(res3, {
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 200,
  });
}
