import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    vus: 15000,
    duration: '1s',
};

export default function () {
    let res = http.get('http://40.74.46.109/');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}