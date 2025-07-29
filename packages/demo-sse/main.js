const http = require('http');

http
  .createServer((req, res) => {
    if (req.url === '/sse-endpoint') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      const sendEvent = data => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      // 定时发送数据
      const interval = setInterval(() => {
        sendEvent({ timestamp: Date.now(), message: 'Hello, SSE!' });
      }, 1000);

      // 清理资源
      req.on('close', () => {
        clearInterval(interval);
      });
    }
  })
  .listen(3000, () => console.log('Server running on http://localhost:3000'));
