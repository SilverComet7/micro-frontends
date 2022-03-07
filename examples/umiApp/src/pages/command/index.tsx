import { Tabs } from 'antd';
import UserSearch from './userSearch'
import UserCommand from './userCommand'
import { useHistory } from "react-router-dom";
import { SetStateAction, useState } from 'react';
const { TabPane } = Tabs;



const searchPages = () => {
  // const history = useHistory()
  // const gotoPag = (key: any) => {
  //   history.push({ pathname: `/user/${key}` })
  // }
  const [actKey,setActKey] = useState('Search')

  const toTab = (i: { keyName: SetStateAction<string>; }) => {
    setActKey(i.keyName)
    console.log(i);
  }

  return (<Tabs  type="card" activeKey={actKey} onChange={(key)=>setActKey(key)} >
  <TabPane tab="查询用户" key="Search"  ><UserSearch  myEvent={toTab} /></TabPane>
  <TabPane tab="用户详情" key="Detail">
  </TabPane>
  <TabPane tab="用户指令" key="Command">
    <UserCommand></UserCommand>
  </TabPane>
</Tabs>)
}
export default searchPages
