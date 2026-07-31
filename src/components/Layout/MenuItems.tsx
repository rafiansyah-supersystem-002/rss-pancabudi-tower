import {
    AppstoreOutlined,
    UserOutlined,
    SettingOutlined,
    InfoCircleOutlined,
    TeamOutlined,
    LockOutlined,
    ExperimentOutlined,
    DollarCircleOutlined,
    ThunderboltOutlined,
    ScanOutlined,
    DeploymentUnitOutlined,
    BulbOutlined,
    CoffeeOutlined,
    IdcardOutlined
} from "@ant-design/icons";

export interface MenuItemType {
    key: string;
    icon?: React.ReactNode;
    label: string;
    path?: string;
    children?: MenuItemType[];
}

export const MenuItems: MenuItemType[] = [
    {
        key: "/",
        icon: <AppstoreOutlined />,
        label: "Dashboard",
        path: "/",
    },
    {
        key: "/profile",
        icon: <UserOutlined />,
        label: "Profile",
        path: "/profile",
    },
    {
        key: "attend",
        label: "Attendance",
        icon: <IdcardOutlined />,
        children: [
            {
                key: "attend1",
                label: "Timestamps",
                icon: <IdcardOutlined />,
                path: "/attendance/timestamps",
            },
            {
                key: "attend2",
                label: "Members",
                icon: <IdcardOutlined />,
                path: "/attendance/members",
            },
        ],
    },
   

    {
        key: "/about",
        icon: <InfoCircleOutlined />,
        label: "About",
        path: "/about",
    },
];
