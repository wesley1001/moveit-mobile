let settings = {
  test:{
    apiUrl: 'http://staging-move1t.herokuapp.com/',
  },
  production:{
    apiUrl: 'http://move1t.herokuapp.com/',
  },
};

export function getBaseUrlFor(setting) {
  const storedSettings = JSON.parse(localStorage.getItem('settings')) || {};
  const instance = storedSettings.instance || 'production';
  return settings[instance][setting];
}
