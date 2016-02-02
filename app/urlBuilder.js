import AppConfig from '../appConfig.json';

const Paths = {
  leaderboard: '/leaderboard.json',
  monthlySummary: '/monthly_summary.json',
  timeline: '/timeline_feed.json',
  entries: '/entries.json',
  login: '/users/register.json',
  interaction: '/interaction.json'
};

let buildURL = function(path, data) {
  let querystring = Object.keys(data)
  .map(key => key + '=' + encodeURIComponent(data[key]))
  .join('&');
  return `${AppConfig.appServerRootURL}${path}?${querystring}`;
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
