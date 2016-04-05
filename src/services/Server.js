import request from 'superagent';
import Settings from '../config/Settings';
import Timer from 'react-timer-mixin';
import Config from 'react-native-config';

const env = require('../../config.json');
const API_URL = env[Config.ENVIRONMENT].API_URL;

class Server {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || Settings.getBaseUrlFor('test');
  }

  post(endPoint, data) {
    let promise = new Promise((resolve, reject) => {
      Timer.setTimeout(() => { reject('Timed out'); }, 7000);
      request
        .post(this.baseUrl + endPoint)
        .send(data)
        .set('Accept', 'application/json')
        .end((err, res) => {
          if(res && (res.statusCode === 200 || res.statusCode === 201 || res.statusCode === 304)) {
            let response = JSON.parse(res.text);
            resolve(response);
          } else {
            reject(err);
          }
        });
    });
    return promise;
  }

  get(endPoint, query) {

    let url = this.baseUrl + endPoint;
    let promise = new Promise((resolve, reject) => {
      Timer.setTimeout(() => { reject('Timed out'); }, 7000);
      request
      .get(url)
      .query(query)
      .end((err, res) => {
        if(res && res.statusCode === 200) {
          resolve(JSON.parse(res.text));
        } else if(err) {
          reject(err);
        }
      });
    });
    return promise;
  }
}

export default new Server(API_URL);
