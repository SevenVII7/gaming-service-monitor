import { exec } from 'child_process'

export default function (req, res, next) {
  try{
    setTimeout(() => {
      const serviceName = 'palserver.service'; // 替换为你想要检查的服务名称
      exec(`sudo /bin/systemctl stop ${serviceName}`, (err, stdout, stderr) => {
        if (err) {
          // 无法执行命令
          console.error(`exec error: ${err}`);
          return res.status(500).json({ msg: `${err}` })
        }
  
        console.log('stop success')
        res.status(200).json({ msg: 'stop success' });
      });
    }, 1000);
  } catch (e) {
    next(e)
  }
} 