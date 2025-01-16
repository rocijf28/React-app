import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 1000 },   // Ramp up to 1000 users
        { duration: '1m', target: 2000 },    // Ramp up to 2000 users
        { duration: '2m', target: 2000 },    // Stay at 2000 for 2 minutes
        { duration: '30s', target: 0 },      // Ramp down
    ],
    noConnectionReuse: true,
    insecureSkipTLSVerify: true
};

export default function () {
    // Make multiple HTTP requests in parallel
    const requests = [
        { method: 'GET', url: 'http://40.74.46.109/' },
        { method: 'GET', url: 'http://40.74.46.109/' },
        { method: 'GET', url: 'http://40.74.46.109/' }
    ];
    
    const responses = http.batch(requests);
    
    for (let res of responses) {
        check(res, {
            'status is 200': (r) => r.status === 200,
            'response time < 2000ms': (r) => r.timings.duration < 2000
        });
    }
    
    // Small sleep to prevent overwhelming the network
    sleep(0.1);
}