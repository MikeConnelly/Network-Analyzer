export default function() {
  const env = process.env.API_PROXY_ENV || 'development';
  const proxy = env === 'production' ? 'backend' : 'localhost';
  return `http://${proxy}:5000`;
}
