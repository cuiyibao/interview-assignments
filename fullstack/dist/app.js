"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const shortid_1 = __importDefault(require("shortid"));
const app = (0, express_1.default)();
// 解析 application/json
app.use(body_parser_1.default.json());
// 解析 application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
const urlDatabase = {};
/**
 * 短域名存储接口
 * 接受长域名信息，返回短域名信息
 */
app.post('/api/short/url/save', (req, res) => {
    const longUrl = req.body.longUrl;
    const shortUrl = shortid_1.default.generate();
    urlDatabase[shortUrl] = longUrl;
    res.json({
        code: 2000,
        data: {
            'result': true,
            'shortUrl': shortUrl,
            'longUrl': longUrl
        }
    });
});
/**
 * 短域名读取接口
 * 接受短域名信息，返回长域名信息
 */
app.get('/api/short/url/get', (req, res) => {
    const query = req.query;
    const shortUrl = query.shortUrl;
    const longUrl = urlDatabase[shortUrl];
    if (longUrl) {
        res.json({
            code: 2000,
            data: {
                'shortUrl': shortUrl,
                'longUrl': longUrl
            }
        });
    }
    else {
        res.status(404).send('URL not found');
    }
});
const server = app.listen(3001, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
exports.default = server;
