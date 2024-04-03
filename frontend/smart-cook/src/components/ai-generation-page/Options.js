import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const Options = () => {
    // What dish do you want to cook?: Breakfast, Lunch, Dinner, Snack, Dessert, Salad
    const dropdown1 = [
        {
            key: "1",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.antgroup.com"
                >
                    Breakfast
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com"
                >
                    Lunch
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com"
                >
                    Dinner
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com"
                >
                    Snack
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com"
                >
                    Dessert
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.aliyun.com"
                >
                    Salad
                </a>
            ),
        },
        
       
    ];

    return (
        <div className="w-full h-[328px] rounded-3xl bg-white mt-20">
            <div>Options</div>
            <div>You can use these options and filter the result</div>
            <div>
                <div>
                    <div>What dish you want to cook?</div>
                    {/* <Dropdown
                        menu={{
                            dropdown1,
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Breakfast
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown> */}
                </div>
            </div>
        </div>
    );
};

export default Options;
