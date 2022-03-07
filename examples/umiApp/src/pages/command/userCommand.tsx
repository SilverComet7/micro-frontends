import React, { useRef,useState } from 'react';
import { message, TreeSelect } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormCascader } from '@ant-design/pro-form';
import ProForm, {
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-form';

import {RenderSeverList} from './userSearch'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const gmCmdSelection: any[] = [
  {
    value: 'Set',
    label: '设置指令',
    children: [
      { value: 'SetRelicTreasure', label: '设置遗迹寻宝次数', model: 'shenji', action: 'setDurability',sendData:{
        name:''
      },  render(){
        const that = this
        function setThisData(e:any){
          that.sendData.name  =   e.target.value
        }
        return <ProFormText width="sm"  fieldProps={{onChange:setThisData}}  label="次数设置" />} },
      { value: 'SetEquipTreasure', label: '设置装备宝库已挑战次数', model: 'equipTH', action: 'setChallengeCount' },
      {
        value: 'SetGuildTechnology',
        label: '设置公会科技',
        model: 'guildTech',
        action: 'setTechLevel',
      },
      {
        value: 'SetCustomLevel',
        label: '设置关卡',
        action: 'setCheckpoint',
      },
    ],
  },
  {
    value: 'Add',
    label: '添加指令',
    children: [
      {
        value: 'AddItem',
        label: '添加资源',
        model: 'resources',
        action: 'appendResource',
      },
      { value: 'AddHero', label: '添加英雄', model: 'resources', action: 'addHero' },
      { value: 'AddEquip', label: '添加装备', model: 'resources', action: 'addEquip' },
    ],
  },
  {
    value: 'Delete',
    label: '删除指令',
    children: [
      {
        value: 'SubItem',
        label: '删除资源',
        model: 'resources',
        action: 'consumeResource',
      },
      { value: 'SubHero', label: '删除英雄', model: 'resources', action: 'delHero' },
      { value: 'SubEquip', label: '删除装备', model: 'resources', action: 'delEquip' },
    ],
  },
  {
    value: 'Control',
    label: '控制指令',
    children: [
      { value: 'KickOutUser', label: '指定下线', model: 'accountManager', action: 'kickOutOne' },
      { value: 'KickOutAllUser', label: '全部下线', model: 'accountManager', action: 'kickOutAll ', notNeedUser: true },
      { value: 'SkipGuide', label: '跳过新手引导', model: 'guide', action: 'skipGuide' },
      { value: 'RecoverGuide', label: '恢复新手引导', model: 'guide', action: 'resetGuide' },
    ],
  },
  {
    value: 'ReSet',
    label: '重置指令',
    children: [
      { value: 'Resetshenji', label: '重置遗迹寻宝', model: 'shenji', action: 'reset' },
      { value: 'Resetequipth', label: '重置装备宝库', model: 'equipTH', action: 'reset' },
      { value: 'Resetshendian', label: '重置神殿', model: 'shendian', action: 'reset' },
    ],
  },
  {
    value: 'Develop',
    label: '开发指令',
    // todo 使用账户名作为临时权限 后续转role
    role: ['developer', 'ChrisWang', 'jjm'],
    children: [
      {
        value: 'CustomCommand',
        label: '自定义指令',
      },
    ],
  },
];

export default () => {
  const formRef = useRef<
    ProFormInstance<{
      name: string;
      company?: string;
      useMode?: string;
    }>
  >();

  const [cmpName, setCmpName] = useState<JSX.Element>();
  const getCmp = (e,se:any) =>{
   setCmpName(se[se.length-1]?.render?.())
  }
  const GenCmp = () => {
    if(!cmpName) return <></>
    return  cmpName
  }

  return (
    <ProForm<{
      name: string;
      company?: string;
      useMode?: string;

    }>
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values);
        const val1 = await formRef.current?.validateFields();
        console.log('validateFields:', val1);
        const val2 = await formRef.current?.validateFieldsReturnFormatValue?.();
        console.log('validateFieldsReturnFormatValue:', val2);
        message.success('提交成功');
      }}
      layout='horizontal'
      formRef={formRef}
      params={{ id: '100' }}
      formKey="base-form-use-demo"
      dateFormatter={(value, valueType) => {
        console.log('---->', value, valueType);
        return value.format('YYYY/MM/DD HH:mm:ss');
      }}
      autoFocusFirstInput
    >
      <ProFormText width="sm" name="userName" label="用户名称" />
      <ProFormText width="sm" name="userId" label="用户Id" />
      <RenderSeverList/>
      <ProFormCascader
        width="sm"
        fieldProps={{options:gmCmdSelection,onChange:getCmp}}
        name="area"
        label="操作"
      />
      <GenCmp></GenCmp>
    </ProForm>
  );
};
