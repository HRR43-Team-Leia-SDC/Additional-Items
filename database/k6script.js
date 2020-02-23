import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 300,
  duration: '120s',
};

export default function () {
  http.get('http://localhost:3004/?36256214');
  http.get('http://localhost:3004/additional/36256214');
  // sleep(1);
}
