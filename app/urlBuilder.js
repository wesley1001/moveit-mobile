import AppConfig from '../appConfig.json';

const Paths = {
  leaderboard: '/leaderboard',
  monthlySummary: '/monthly_summary',
  timeline: '/timeline_feed',
  entries: '/entries',
  login: '/users/register',
  interaction: '/interaction'
};

let buildURL = function(path, data) {
  let querystring = Object.keys(data)
  .map(key => key + '=' + encodeURIComponent(data[key]))
  .join('&');
  return `${AppConfig.appServerRootURL}${path}.json?${querystring}`;
};

export default (function() {
  let builder = {};
  Object.keys(Paths).forEach(function(path) {
    builder[`${path}URL`] = function(data = {}) {
      return buildURL(Paths[path], data);
    }
  });
  return builder;
})();
