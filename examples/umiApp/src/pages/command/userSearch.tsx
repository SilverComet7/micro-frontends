import React, { useRef } from 'react';
import { PlusOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { ProFormDigitRange, ProFormSelect } from '@ant-design/pro-form';
import { request } from '@/api/base';

export const RenderSeverList =  (props:any) => {

return (<ProFormSelect
  request={
    async () => {
     const result  =   await  request.get(`/proxy/${props.cid}/server`)
     return result.map((item: any)=>({label:item.serverName,value:item.serverId}))
    }
  }
/>)
}
RenderSeverList.defaultProps = {
  cid:18
}



type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '选择区服',
    dataIndex: 'serverId',
    hideInTable:true,
    renderFormItem: (_, { type, defaultRender,   ...rest }, form) => {
      return (<RenderSeverList   />)
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '用户查询',
    // dataIndex: 'title',
    hideInTable:true,
  },
  {
    title: '用户Id',
    dataIndex: 'userId',
    search:false,
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '用户等级',
    dataIndex: 'level',
    search: {
      transform: (value) => {
        return {
          startLevel: value[0],
          endLevel: value[1],
        };
      },
    },
    renderFormItem:()=><ProFormDigitRange
    separator="-"
    separatorWidth={60}
    />
  },
  {
    title: 'vip等级',
    dataIndex: 'vipLevel',
    search: {
      transform: (value) => {
        return {
          startVipLevel: value[0],
          endVipLevel: value[1],
        };
      },
    },
    renderFormItem:()=><ProFormDigitRange
    separator="-"
    separatorWidth={60}
    />
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];


export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      columns={columns}
      actionRef={actionRef}

      request={async (params = {}, sort, filter) => {
        return request<{
          data: GithubIssueItem[];
        }>('/gm/command/common/18', {
          params,
          action: "queryMany",
          model: "accountManager",
          serverIds:[1],
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
        defaultCollapsed:false
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              levelRange: [values.startLevel, values.endLevel],
            };
          }
          return values;
        },
        ignoreRules: false,
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,

      ]}
    />
  );
};
