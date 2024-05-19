import { useEffect } from 'react'
import './App.css';
import Uehara from './assets/uehara.jpg';

function App() {
  useEffect(() => {
    new CozeWebSDK.WebChatClient({
        config: {
        bot_id: '7370367569473077249',
        },
    componentProps: {
        title: 'Coze',
      layout: 'mobile',
        icon: Uehara
        },
      });
  }, []);


  return (
    <>
      <h1 style={{ textAlign: 'center', color: 'pink' }}>杨璐铭是🐷</h1>
    </>
  )
}

export default App
