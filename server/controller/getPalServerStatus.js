import { exec } from 'child_process'

export default function (req, res, next) {
  try{
    setTimeout(() => {
      const serviceName = 'palserver.service'; // 替换为你想要检查的服务名称
      exec(`/bin/systemctl is-active ${serviceName}`, (err, stdout, stderr) => {
        if (err) {
          // 无法执行命令
          console.error(`exec error: ${err}`);
          return res.status(500).json({ msg: `${err}` })
        }
    
        // 标准输出处理
        const status = stdout.trim();
        if (status === 'active') {
          res.status(200).json({ msg: `success` });
        } else {
          res.status(500).json({ msg: `${err}` })
        }
      });
    }, 1000);
  } catch (e) {
    next(e)
  }
} 