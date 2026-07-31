"use client";

import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { motion, AnimatePresence } from "framer-motion";

export interface AnimatedTableProps<T> {
    columns: ColumnsType<T>;
    data: T[];
    rowKey?: string;
    pagination?: false | TablePaginationConfig;
    size?: "small" | "middle" | "large";
}

export default function AnimatedTable<T>({
    columns,
    data,
    rowKey = "id",
    pagination = false,
    size = "small",
}: AnimatedTableProps<T>) {
    
    const components = {
        body: {
            row: (props: any) => (
                <AnimatePresence mode="popLayout">
                    <motion.tr
                        {...props}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                    />
                </AnimatePresence>
            ),
        },
    };

    return (
        <Table
            components={components}
            columns={columns}
            dataSource={data}
            rowKey={rowKey}
            pagination={pagination}
            bordered
                scroll={{ x: "1000px" }}   // <-- ultimate fix
            size={size}
        />
    );
}
