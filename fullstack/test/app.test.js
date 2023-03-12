const request = require('supertest')
const server = require('../dist/app').default;

describe('POST /api/short/url/save', function() {
  it('短域名存储接口测试', function(done) {
    request(server)
      .post('/api/short/url/save')
      .set('Accept', 'application/json')
      .send({
        "longUrl": "https://www.baidu.com"
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /api/short/url/save', function() {
  it('短域名读取接口测试', function(done) {
    const newRequest = request(server)
    newRequest.post('/api/short/url/save')
      .set('Accept', 'application/json')
      .send({
        "longUrl": "https://www.baidu.com"
      })
      .expect('Content-Type', /json/)
      .end((err, response) => {
        if (err) {
          return done(err);
        }
        const shortUrl = response.body.data.shortUrl
        newRequest.get(`/api/short/url/get?shortUrl=${shortUrl}`)
          .expect(200, done);
      })
  });    
});

