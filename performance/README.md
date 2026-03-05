# Reqres API Performance Testing (k6)

## Overview

This directory contains a performance test implemented with **k6** to evaluate the behavior of the endpoint:

`GET https://reqres.in/api/users?page=1`

The goal of the test is to simulate concurrent users sending requests to the API and capture key performance metrics such as response time percentiles, error rate, and throughput.

---

# Test Scenario

The test simulates **100 concurrent users**, where each user sends approximately **1 request per second**.
This results in an overall load of roughly **100 requests per second (RPS)**.

To maintain a stable request rate, the test uses the **k6 `constant-arrival-rate` executor**, which schedules iterations at a fixed rate regardless of response time.

### Configuration

* Target endpoint: `https://reqres.in/api/users?page=1`
* Concurrent users: ~100
* Target throughput: ~100 requests/second
* Test duration: **6 minutes**

### Why 6 minutes?

The duration was chosen to capture stable latency metrics while remaining reasonable for a public API.

* The first ~30–60 seconds typically act as a warm-up period (connection reuse, DNS resolution, etc.).
* Running the test for several minutes ensures enough samples to calculate reliable percentiles such as **P95 and P99**.
* At 100 RPS for 6 minutes, the test generates approximately **36,000 requests**, which is sufficient to observe stable behavior.

---

# Metrics Captured

The test captures the following metrics from k6:

### Response Time

Measured using `http_req_duration`:

* **P50** – median response time
* **P95** – 95th percentile latency
* **P99** – 99th percentile latency

These metrics help identify latency spikes that average values might hide.

### Error Rate

Measured using `http_req_failed`.

This indicates the percentage of failed HTTP requests (non-2xx responses or failed checks).

### Throughput

Measured using `http_reqs`.

This represents the number of requests processed per second during the test.

---

# Setup

## 1. Install k6

### macOS (Homebrew)

```bash
brew install k6
```

### Alternative installation

Follow the official instructions:

https://k6.io/docs/get-started/installation/

---

## 2. Verify installation

```bash
k6 version
```

---

# Running the Test

Run the performance test from the repository root:

```bash
k6 run performance/reqres_performance_users.js
```

Optionally save the output to a file:

```bash
k6 run performance/reqres_performance_users.js > performance/run-output.txt
```

---

# Files in this directory

```
performance/
  reqres_performance_users.js   # k6 performance test script
  performance-report.md         # short report with test results and analysis
  run-output.txt                # optional raw console output from k6
  README.md                     # setup and explanation of the test
```

---

# Notes

ReqRes is a public demo API used for testing purposes. Because it is a shared environment, the results may be influenced by external factors such as network conditions or potential rate limiting.

Any unusual errors or latency spikes observed during the test should therefore be interpreted with this limitation in mind.
