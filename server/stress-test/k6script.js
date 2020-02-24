// import http from 'k6/http';

// export const options = {
//   vus: 300,
//   duration: '120s',
// };

// export default function () {
//   http.get('http://localhost:3004/?36256214');
//   http.get('http://localhost:3004/additional/36256214');
// }


import http from 'k6/http';
import { check } from 'k6';
import { Rate, Counter, Trend } from 'k6/metrics';


export const options = {
  // ramp up from 1 to X VUs in 60 seconds
  // stay at X VUs for 180s
  // ramp down to 0 VUs for 30s
  stages: [
    { target: 100, duration: '60s' },
    { target: 400, duration: '180s' },
    { target: 0, duration: '30s' },
  ],
};

const errorRate = new Rate('errors');
const waitingTime = new Trend('waiting_time');

export default function () {
  // random number
  const random = Math.floor(Math.random() * (36256214 - 1)) + 1;
  const req1 = {
    method: 'GET',
    url: `http://localhost:3004/${random}`,
  };
  const req2 = {
    method: 'GET',
    url: `http://localhost:3004/additional/${random}`,
  };
  const responses = http.batch([req1, req2]);

  // const res = http.get(`http://localhost:3004/${random}`);
  // const res2 = http.get(`http://localhost:3004/additional/${random}`);


  const result1 = check(responses[0], {
    'status was 200': (r) => r.status === 200,
  });

  const result2 = check(responses[1], {
    'status was 200': (r) => r.status === 200,
  });

  // record check failures
  // errorRate.add(!result1);

  // record waiting time
  // waitingTime.add(res.timings.waiting);


  // http.get('http://localhost:3004/additional/' + random);
}
