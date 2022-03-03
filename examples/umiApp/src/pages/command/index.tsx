import { Tabs } from 'antd';
import UserSearch from './userSearch'
import UserCommand from './userCommand'
import { useHistory } from "react-router-dom";
const { TabPane } = Tabs;



const searchPages = () => {
  const history = useHistory()
  const gotoPag = (key: any) => {
    history.push({ pathname: `/user/${key}` })
  }

  return (<Tabs  type="card" >
  <TabPane tab="查询用户" key="Search" ><UserSearch/></TabPane>
  <TabPane tab="用户详情" key="Detail">
  </TabPane>
  <TabPane tab="用户指令" key="Command">
    <UserCommand></UserCommand>
  </TabPane>
</Tabs>)
}
export default searchPages
