# Performance Test Report – Reqres API

## Test Setup

A performance test was executed using **k6** against the endpoint:

`GET https://reqres.in/api/users?page=1`

The scenario simulated **~100 concurrent users**, generating approximately **100 requests per second** for **6 minutes** using the `constant-arrival-rate` executor.

Total requests executed: **36,001**

---

## Key Metrics

| Metric          | Value      |
| --------------- | ---------- |
| P50             | ~39 ms     |
| P95             | ~48.8 ms   |
| Average latency | ~40.7 ms   |
| Throughput      | ~100 req/s |
| Error rate      | 100%       |

---

## Observations

All requests returned **HTTP 403 responses** with an HTML page containing the message **“Just a moment…”**, indicating that traffic was blocked by **Cloudflare bot protection**.

Because of this protection layer, validation checks expecting **HTTP 200 JSON responses** failed for all requests.

Latency metrics therefore represent the response time of the **WAF layer**, not the actual API backend performance.

---

## Conclusion

The load generator maintained the target rate of **~100 requests/sec** with stable response times (~40 ms). However, the public API blocked automated traffic under sustained load, preventing measurement of the underlying service performance.

---

## Potential Improvements

* Return **HTTP 429 (Too Many Requests)** instead of generic 403 responses when rate limits are exceeded.
* Allow controlled environments, like staging, to bypass WAF protections for performance testing.

