import {ApiStore} from './ApiStore';
import { HTTPMethod } from './types';

var myClass = new ApiStore('https://api.github.com/{orgs}/ktsstudio/repos');

console.log(myClass.request({method: HTTPMethod.GET, endpoint: 'ktsstudio', headers: {}}));

