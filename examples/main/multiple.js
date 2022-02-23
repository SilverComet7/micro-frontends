import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
let app;
import React from 'react';
import ReactDOM from 'react-dom';
// function mount() {
//   app = loadMicroApp(
//     { name: 'react16', entry: '//localhost:7100', container: '#react16' },
//     { sandbox: { experimentalStyleIsolation: true } },
//   );
// }

// function unmount() {
//   app.unmount();
// }



// document.querySelector('#mount').addEventListener('click', mount);
// document.querySelector('#unmount').addEventListener('click', unmount);

// loadMicroApp({ name: 'vue3', entry: '//localhost:7105', container: '#vue3' });

function Render(props) {
  const { loading } = props;

  return (
    <>
      {loading && <h4 className="subapp-loading">Loading...</h4>}
      <div id="subapp-viewport" />
    </>
  );
}

export default function render({ loading }) {
  const container = document.getElementById('subapp-container');
  ReactDOM.render(<Render loading={loading} />, container);
}




render({ loading: true });

const loader = loading => render({ loading });

registerMicroApps(
  [
    {
      name: 'react16',
      entry: '//localhost:7100',
      container: '#subapp-viewport',
      loader,
      activeRule: '/react16',
    }, {
      name: 'vue3',
      entry: '//localhost:7105',
      container: '#subapp-viewport',
      loader,
      activeRule: '/vue3',
    },
  ],

  )

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
});


/**
 * Step3 设置默认进入的子应用
 */
 setDefaultMountApp('/react16');

 /**
  * Step4 启动应用
  */
 start();

 runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
