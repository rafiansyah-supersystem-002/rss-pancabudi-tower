"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Form,
    Input,
    Modal,
    Popconfirm,
    Space,
    Table,
    Grid,
    Typography,
    message,
} from "antd";
import axios from "axios";

const { Title } = Typography;
const { useBreakpoint } = Grid;

interface Security {
    id: string;
    name: string;
    shift: string;
    position: string;
}

export default function Home() {
    const [security, setSecurity] = useState<Security[]>([]);
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Security | null>(null);

    const [form] = Form.useForm();
    const screens = useBreakpoint();

    const loadSecurity = async () => {
        setLoading(true);

        try {
            const res = await axios.get("/api/attendance/members");
            setSecurity(res.data);
        } catch {
            message.error("Failed to load security");
        }

        setLoading(false);
    };

    useEffect(() => {
        loadSecurity();
    }, []);

    const onAdd = () => {
        setEditing(null);
        form.resetFields();
        setOpen(true);
    };

    const onEdit = (security: Security) => {
        setEditing(security);
        form.setFieldsValue(security);
        setOpen(true);
    };

    const onDelete = async (id: string) => {
        try {
            await axios.delete(`/api/attendance/members?id=${id}`);

            message.success("Security deleted");
            loadSecurity();
        } catch {
            message.error("Delete failed");
        }
    };

    const onFinish = async (values: Security) => {
        try {
            if (editing) {
                await axios.put("/api/attendance/members", {
                    ...values,
                    id: editing.id,
                });

                message.success("Security updated");
            } else {
                await axios.post("/api/attendance/members", values);

                message.success("Security added");
            }

            setOpen(false);
            form.resetFields();
            loadSecurity();
        } catch {
            message.error("Save failed");
        }
    };

    const columns = [
        {
            title: "No",
            key: "no",
            align: "center" as const,
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Shift",
            dataIndex: "shift",
        },
        {
            title: "Position",
            dataIndex: "position",
        },
        {
            title: "Action",
            render: (_: unknown, record: Security) => (
                <Space>
                    <Button type="primary" onClick={() => onEdit(record)}>
                        Edit
                    </Button>

                    <Popconfirm
                        title="Delete security?"
                        onConfirm={() => onDelete(record.id)}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Space
                style={{
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom: 20,
                    marginTop: 10,
                }}
            >
                <Button type="primary" onClick={onAdd}>
                    Add Security
                </Button>
            </Space>
            <Table
                size="small"
                loading={loading}
                columns={columns}
                dataSource={security}
                pagination={{ pageSize: 10 }}
                scroll={{ x: 600 }}
                bordered
                components={
                    screens.xs
                        ? {
                              header: {
                                  cell: (props: any) => (
                                      <th
                                          {...props}
                                          style={{
                                              padding: "4px 6px",
                                              fontSize: "10px",
                                              fontWeight: 600,
                                              borderColor: "#e8e8e8",
                                          }}
                                      />
                                  ),
                              },
                              body: {
                                  cell: (props: any) => (
                                      <td
                                          {...props}
                                          style={{
                                              padding: "2px 6px",
                                              fontSize: "10px",
                                              borderColor: "#e8e8e8",
                                          }}
                                      />
                                  ),
                              },
                          }
                        : undefined
                }
            />

            <Modal
                open={open}
                title={editing ? "Edit Security" : "Add Security"}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={onFinish}>
                    {!editing && (
                        <Form.Item
                            label="Security ID"
                            name="id"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input placeholder="EMP001" />
                        </Form.Item>
                    )}

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Shift"
                        name="shift"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Position"
                        name="position"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        {editing ? "Update Security" : "Add Security"}
                    </Button>
                </Form>
            </Modal>
        </div>
    );
}
