function loadEventListerner(e) {
  console.log('loadEventListerner', e);
  const proxy = new Proxy({}, {
    get: function (target, key, receiver) {
      console.log(`getting ${key}!`);
      return Reflect.get(target, key, receiver);
    }
  });
  console.log('proxy', proxy);
}

window.addEventListener('load', (event) => {
  loadEventListerner(event)
});
