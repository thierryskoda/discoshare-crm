// import Navbar from './navbar/navbar'
module.exports = "app.common";

let commonModule = angular.module(module.exports, [
  require('./navbar/navbar'),
  require('./header/header')
]);

