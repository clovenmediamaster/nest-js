import { Counter, Histogram, register } from 'prom-client';

export const metricsProvider = {
  requestCount: new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
  }),
  requestDuration: new Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in milliseconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.1, 5, 15, 50, 100, 500],
  }),
};

export const metricsMiddleware = (req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);
    metricsProvider.requestDuration
      .labels(req.method, req.originalUrl, res.statusCode.toString())
      .observe(parseFloat(duration));
    metricsProvider.requestCount
      .labels(req.method, req.originalUrl, res.statusCode.toString())
      .inc();
  });
  next();
};

export const getMetrics = () => {
  return register.metrics();
};
