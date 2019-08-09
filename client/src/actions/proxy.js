export default function() {
  const env = process.env.API_PROXY_ENV || 'development';
  const proxy = env === 'production' ? 'server' : 'localhost';
  return `http://${proxy}:5000`;
}
