"use client";

import React from "react";

import { Button, Card, Input } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const LoginPage = () => {
  return (
    <AntdRegistry>
      <Card hoverable style={{ width: 440 }}>
        <div className="flex py-4 flex-col space-y-4">
          <div>
            <p className="font-semibold">Email</p>
            <Input placeholder="jhon@example.com" />
          </div>
          <div>
            <p className="font-semibold">Password</p>
            <Input.Password
              placeholder="input password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>

          <Button type="primary">Login</Button>
        </div>
      </Card>
    </AntdRegistry>
  );
};

export default LoginPage;
