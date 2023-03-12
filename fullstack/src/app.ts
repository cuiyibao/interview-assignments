import express, { Application, Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import shortid from 'shortid';

const app: Application = express();

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

interface UrlDatabase {
  [key: string]: string;
}

interface UserQuery {
  shortUrl: string;
}

const urlDatabase: UrlDatabase = {};

/**
 * 短域名存储接口
 * 接受长域名信息，返回短域名信息
 */
app.post('/api/short/url/save', (req: Request, res: Response) => {
  const longUrl: string = req.body.longUrl;
  const shortUrl: string = shortid.generate();
  urlDatabase[shortUrl] = longUrl
  res.json({
    code: 2000,
    data: {
      'result': true,
      'shortUrl': shortUrl,
      'longUrl': longUrl
    }
  })
});

/**
 * 短域名读取接口
 * 接受短域名信息，返回长域名信息
 */
app.get('/api/short/url/get', (req: Request, res: Response) => {
  const query = req.query as unknown as UserQuery;
  const shortUrl: string = query.shortUrl
  const longUrl: string | undefined = urlDatabase[shortUrl];
  if (longUrl) {
    res.json({
      code: 2000,
      data: {
        'shortUrl': shortUrl,
        'longUrl': longUrl
      }
    });
  } else {
    res.status(404).send('URL not found');
  }
});

const server: any = app.listen(3001, () => {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

export default server

