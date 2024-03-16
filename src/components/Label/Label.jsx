import React from "react";
import s from './Label_style.module.css'

//import Ant
import { Popover, Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


export default function Label(props){

    const content = (<div><p>{props.popMsg}</p></div>);

    return(
        <p className={s.label}>
            {props.inputTitle} <Space wrap><Popover content={content} title={props.popTitle} trigger="hover"><QuestionCircleOutlined style={{ fontSize: '12px', color: '#A2A9B0' }} />
            </Popover>
            </Space>
        </p>
    )
}