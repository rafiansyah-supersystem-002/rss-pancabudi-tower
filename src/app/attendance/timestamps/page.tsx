"use client";

import { useEffect, useState, useRef } from "react";
import {
    Button,
    Card,
    Select,
    Space,
    Table,
    Typography,
    message,
    Modal,
    Upload,
    Input,
    Spin,
    Tabs,
    Tag,
    Avatar,
    Divider,
    DatePicker,
    Empty,
} from "antd";
import {
    UploadOutlined,
    CameraOutlined,
    LogoutOutlined,
    LoginOutlined,
    UserOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { BrowserMultiFormatReader } from "@zxing/browser";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

const { Title, Text } = Typography;

interface Security {
    id: string;
    name: string;
    shift: string;
    position: string;
}

interface Attendance {
    id: string;
    securityId: string;
    date: string;
    checkIn: string;
    checkOut: string;
    status: string;
}

interface Checkpoint {
    id: string;
    name: string;
    location: string;
}

interface Visit {
    id: string;
    attendanceId: string;
    securityId: string;
    checkpointId: string;
    visitTime: string;
    evidence: string;
}

interface OfficeHours {
    startHours: string;
    maxStartHours: string;
    finishHours: string;
    maxFinishHours: string;
}

export default function AttendancePage() {
    const [security, setSecurity] = useState<Security[]>([]);
    const [securitySelect, setSecuritySelect] = useState<Security[]>([]);
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const [securityId, setEmployeeId] = useState<string>();
    const [officeHours, setOfficeHours] = useState<OfficeHours[]>([]);
    const [photo, setPhoto] = useState<File | null>(null);
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
    const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>();
    const fileRef = useRef<HTMLInputElement>(null);
    const [visits, setVisits] = useState<Visit[]>([]);
    const [checkpointPhotos, setCheckpointPhotos] = useState<
        Record<string, File>
    >({});
    const videoRef = useRef<HTMLVideoElement>(null);
    const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
    const scanSubscriptionRef = useRef<any>(null);

    const [scanning, setScanning] = useState(false);
    const [cameraOn, setCameraOn] = useState(false);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasScanned, setHasScanned] = useState(false);
    const [scannedCheckpoint, setScannedCheckpoint] =
        useState<Checkpoint | null>(null);
    const [checkpointPhoto, setCheckpointPhoto] = useState<File>();
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    async function loadSecurity() {
        const res = await axios.get("/api/attendance/members");

        setSecurity(res.data);

        setSecuritySelect(
            res.data.map((e: any) => ({
                label: `${e.id} - ${e.name} - ${e.shift}`,
                value: e.id,
            })),
        );
    }

    async function loadAttendance() {
        setLoading(true);

        try {
            const res = await axios.get("/api/attendance/timestamps");
            setAttendance(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const loadOfficeHours = async () => {
        try {
            const res = await axios.get("/api/attendance/officehours");
            setOfficeHours(res.data);
        } catch {
            message.error("Failed to load office hours");
        }
    };

    useEffect(() => {
        loadSecurity();
        loadAttendance();
        loadCheckpoints();
        loadVisits();
        loadOfficeHours();
    }, []);

    async function checkIn() {
        if (!securityId) {
            Modal.warning({
                title: "Security Required",
                content: "Please select an security.",
            });
            return;
        }

        if (!photo) {
            Modal.warning({
                title: "Photo Required",
                content: "Please select a photo first.",
            });
            return;
        }

        setLoading(true);

        try {
            // Step 1: Upload photo
            const formData = new FormData();
            formData.append("photo", photo);
            formData.append("securityId", securityId);

            const uploadRes = await axios.post(
                "/api/attendance/evidence",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            const photoId = uploadRes.data.fileId;
            const office = officeHours[0];

            if (!office) {
                message.error("Office hours not loaded");
                return;
            }

            const now = new Date();

            // Office start time
            const [startHour, startMinute] = office.startHours
                .split(":")
                .map(Number);
            const startLimit = new Date();
            startLimit.setHours(startHour, startMinute, 0, 0);

            // Maximum allowed check-in time
            const [maxHour, maxMinute] = office.maxStartHours
                .split(":")
                .map(Number);
            const maxLimit = new Date();
            maxLimit.setHours(maxHour, maxMinute, 0, 0);

            let status: "Present" | "Late" | "Absent";

            if (now <= startLimit) {
                status = "Present";
            } else if (now <= maxLimit) {
                status = "Late";
            } else {
                status = "Absent";
            }

            // Step 2: Save attendance
            await axios.post("/api/attendance/timestamps", {
                securityId,
                type: "checkin",
                photoId,
                status,
            });
            Modal.success({
                title: "Success",
                content: "Checked in successfully.",
            });

            setPhoto(null);
            loadAttendance();
        } catch (error: any) {
            Modal.error({
                title: "Check In Failed",
                content:
                    error.response?.data?.message ?? "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    }

    async function checkOut() {
        if (!securityId) {
            message.warning("Select security");
            return;
        }

        setLoading(true);

        try {
            await axios.post("/api/attendance/timestamps", {
                securityId,
                type: "checkout",
            });

            message.success("Checked Out");

            loadAttendance();
        } catch (e: any) {
            Modal.error({
                title: "Check Out Failed",
                content: e.response?.data?.message || "Something went wrong.",
                okText: "OK",
                centered: true,
            });
        } finally {
            setLoading(false);
        }
    }

    async function loadCheckpoints() {
        const res = await axios.get("/api/attendance/checkpoints");

        setCheckpoints(res.data);
    }

    function onVisit(checkpointId: string) {
        if (!securityId) {
            Modal.warning({
                title: "Security Required",
                content: "Please select an security first.",
            });

            return;
        }

        setSelectedCheckpoint(checkpointId);

        fileRef.current?.click();
    }

    async function uploadVisit(checkpointId: string, file?: File) {
        if (!securityId) {
            Modal.warning({
                title: "Security Required",
                content: "Please select an security.",
            });
            return;
        }

        if (!file) {
            Modal.warning({
                title: "Photo Required",
                content: "Please select a photo.",
            });
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("photo", file);
            formData.append("securityId", securityId);

            const upload = await axios.post(
                "/api/attendance/evidence",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            await axios.post("/api/attendance/visits", {
                securityId,
                checkpointId,
                evidence: upload.data.url,
            });

            Modal.success({
                title: "Success",
                content: "Checkpoint visited successfully.",
            });

            loadVisits();

            // Clear the selected photo for this checkpoint
            setCheckpointPhotos((prev) => {
                const updated = { ...prev };
                delete updated[checkpointId];
                return updated;
            });
        } catch (error: any) {
            Modal.error({
                title: "Visit Failed",
                content:
                    error.response?.data?.message ?? "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    }

    async function loadVisits() {
        const res = await axios.get("/api/attendance/visits");

        setVisits(res.data);
    }

    const startScan = async () => {
        if (!videoRef.current) return;

        setLoading(true);
        setScanning(true);
        setHasScanned(false);
        setResult("");

        const codeReader = new BrowserMultiFormatReader();
        codeReaderRef.current = codeReader;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment" },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }

            setCameraOn(true);

            // Save subscription so we can stop later
            scanSubscriptionRef.current = codeReader.decodeFromVideoDevice(
                undefined,
                videoRef.current,
                (result, err) => {
                    if (result && !hasScanned) {
                        setHasScanned(true);

                        const scannedId = result.getText().trim();

                        const checkpoint = checkpoints.find(
                            (c) => c.id === scannedId,
                        );

                        if (!checkpoint) {
                            Modal.error({
                                title: "Checkpoint not found",
                                content: scannedId,
                            });

                            stopScan();
                            return;
                        }

                        setResult(scannedId);
                        setScannedCheckpoint(checkpoint);

                        stopScan();
                    }
                },
            );
        } catch (err) {
            console.error("Camera error:", err);
            setCameraOn(false);
        } finally {
            setLoading(false);
        }
    };

    const stopScan = () => {
        setScanning(false);
        setCameraOn(false);

        const video = videoRef.current;
        if (video && video.srcObject) {
            const tracks = (video.srcObject as MediaStream).getTracks();
            tracks.forEach((track) => track.stop());
            video.srcObject = null;
        }

        // Stop ZXing decoding properly
        if (scanSubscriptionRef.current) {
            scanSubscriptionRef.current.stop?.(); // some versions have stop()
            scanSubscriptionRef.current = null;
        }

        codeReaderRef.current = null;
    };

    return (
        <div style={{ padding: 0 }}>
            <Tabs
                type="card"
                defaultActiveKey="1"
                items={[
                    {
                        key: "1",
                        label: (
                            <span style={{ fontSize: 12, fontWeight: 500 }}>
                                Security
                            </span>
                        ),
                        children: (
                            <>
                                <Text>
                                    {officeHours.length > 0
                                        ? `${officeHours[0].startHours} - ${officeHours[0].finishHours}`
                                        : "Loading..."}
                                </Text>
                                <Card
                                    title={
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Check In
                                        </span>
                                    }
                                    styles={{
                                        body: {
                                            padding: 10,
                                        },
                                    }}
                                    style={{ marginBottom: 20 }}
                                >
                                    <Space
                                        orientation="vertical"
                                        style={{ width: "100%" }}
                                    >
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder="Select Security"
                                            options={securitySelect}
                                            onChange={setEmployeeId}
                                        />

                                        <input
                                            id="photo-upload"
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            hidden
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (file) setPhoto(file);
                                            }}
                                        />

                                        <label
                                            htmlFor="photo-upload"
                                            style={{
                                                display: "inline-block",
                                                width: "100%",
                                                padding: "6px",
                                                border: "2px solid #1677ff",
                                                borderRadius: "8px",
                                                backgroundColor: "#ffffff",
                                                color: "#1677ff",
                                                textAlign: "center",
                                                cursor: "pointer",
                                                fontWeight: 500,
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            {photo
                                                ? photo.name
                                                : "Choose Photo"}
                                        </label>

                                        <div
                                            style={{
                                                display: "flex",
                                                gap: 8,
                                                width: "100%",
                                            }}
                                        >
                                            <Button
                                                type="primary"
                                                style={{ flex: 1 }}
                                                onClick={checkIn}
                                                loading={loading}
                                                disabled={loading}
                                            >
                                                Check In
                                            </Button>

                                            <Button
                                                style={{ flex: 1 }}
                                                onClick={checkOut}
                                                loading={loading}
                                                disabled={loading}
                                            >
                                                Check Out
                                            </Button>
                                        </div>
                                    </Space>

                                    <Space
                                        orientation="vertical"
                                        size={16}
                                        style={{ width: "100%", marginTop: 20 }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                                width: "100%",
                                            }}
                                        >
                                            <Divider
                                                style={{
                                                    flex: 1,
                                                    margin: 0,
                                                    minWidth: 0,
                                                    borderColor: "#d9d9d9",
                                                }}
                                            />

                                            <DatePicker
                                                size="small"
                                                value={selectedDate}
                                                onChange={setSelectedDate}
                                                allowClear
                                                style={{
                                                    width: 120,
                                                    minWidth: 0,
                                                    flexShrink: 1,
                                                }}
                                            />
                                        </div>

                                        {loading ? (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    padding: "32px 0",
                                                }}
                                            >
                                                <Spin size="large" />
                                            </div>
                                        ) : attendance
                                              .filter((item) => {
                                                  if (!selectedDate)
                                                      return true;

                                                  return (
                                                      dayjs(item.date).format(
                                                          "YYYY-MM-DD",
                                                      ) ===
                                                      selectedDate.format(
                                                          "YYYY-MM-DD",
                                                      )
                                                  );
                                              })
                                              .sort(
                                                  (a, b) =>
                                                      dayjs(b.date).valueOf() -
                                                      dayjs(a.date).valueOf(),
                                              ).length === 0 ? (
                                            <Empty
                                                description="No attendance found"
                                                image={
                                                    Empty.PRESENTED_IMAGE_SIMPLE
                                                }
                                                style={{ marginTop: 32 }}
                                            />
                                        ) : (
                                            attendance
                                                .filter((item) => {
                                                    if (!selectedDate)
                                                        return true;

                                                    return (
                                                        dayjs(item.date).format(
                                                            "YYYY-MM-DD",
                                                        ) ===
                                                        selectedDate.format(
                                                            "YYYY-MM-DD",
                                                        )
                                                    );
                                                })
                                                .sort(
                                                    (a, b) =>
                                                        dayjs(
                                                            b.date,
                                                        ).valueOf() -
                                                        dayjs(a.date).valueOf(),
                                                )
                                                .map((item) => {
                                                    const securityData =
                                                        security.find(
                                                            (e) =>
                                                                e.id ===
                                                                item.securityId,
                                                        );

                                                    // Match visit history by security + same date
                                                    const matchedVisits =
                                                        visits.filter(
                                                            (visit) => {
                                                                const attendanceDate =
                                                                    item.date.split(
                                                                        " ",
                                                                    )[0];
                                                                const visitDate =
                                                                    visit.visitTime.split(
                                                                        " ",
                                                                    )[0];

                                                                return (
                                                                    visit.securityId ===
                                                                        item.securityId &&
                                                                    attendanceDate ===
                                                                        visitDate
                                                                );
                                                            },
                                                        );

                                                    return (
                                                        <Card
                                                            key={item.id}
                                                            hoverable
                                                            style={{
                                                                borderRadius: 16,
                                                                boxShadow:
                                                                    "0 2px 8px rgba(0,0,0,0.08)",
                                                            }}
                                                            styles={{
                                                                body: {
                                                                    padding:
                                                                        "16px 12px",
                                                                },
                                                            }}
                                                        >
                                                            <Space
                                                                align="start"
                                                                style={{
                                                                    width: "100%",
                                                                }}
                                                            >
                                                                <Avatar
                                                                    size={32}
                                                                    icon={
                                                                        <UserOutlined />
                                                                    }
                                                                />

                                                                <div
                                                                    style={{
                                                                        flex: 1,
                                                                    }}
                                                                >
                                                                    <Typography.Title
                                                                        style={{
                                                                            fontSize: 14,
                                                                            margin: 0,
                                                                        }}
                                                                    >
                                                                        {securityData?.name ??
                                                                            "Unknown Security"}
                                                                    </Typography.Title>
                                                                    {/* Status */}
                                                                    <div
                                                                        style={{
                                                                            marginTop: 2,
                                                                        }}
                                                                    >
                                                                        <Tag
                                                                            color={
                                                                                item.status ===
                                                                                "Present"
                                                                                    ? "success"
                                                                                    : item.status ===
                                                                                        "Late"
                                                                                      ? "warning"
                                                                                      : "error"
                                                                            }
                                                                            style={{
                                                                                padding:
                                                                                    "6px 8px",
                                                                                borderRadius: 20,
                                                                                marginBottom: 0,
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.status
                                                                            }
                                                                        </Tag>

                                                                        {/* Check In / Out */}
                                                                        <Space
                                                                            wrap
                                                                            size={
                                                                                4
                                                                            }
                                                                        >
                                                                            <Tag
                                                                                icon={
                                                                                    <LoginOutlined />
                                                                                }
                                                                                color="success"
                                                                                style={{
                                                                                    padding:
                                                                                        "6px 8px",
                                                                                    borderRadius: 20,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item.checkIn
                                                                                }
                                                                            </Tag>

                                                                            <Tag
                                                                                icon={
                                                                                    <LogoutOutlined />
                                                                                }
                                                                                color="error"
                                                                                style={{
                                                                                    padding:
                                                                                        "6px 8px",
                                                                                    borderRadius: 20,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    item.checkOut
                                                                                }
                                                                            </Tag>
                                                                        </Space>
                                                                    </div>

                                                                    {/* Checkpoints */}
                                                                    <div
                                                                        style={{
                                                                            marginTop: 8,
                                                                        }}
                                                                    >
                                                                        <Typography.Text
                                                                            strong
                                                                            style={{
                                                                                fontSize: 12,
                                                                            }}
                                                                        >
                                                                            Checkpoints
                                                                        </Typography.Text>

                                                                        <Space
                                                                            direction="vertical"
                                                                            style={{
                                                                                width: "100%",
                                                                                marginTop: 0,
                                                                            }}
                                                                            size={
                                                                                6
                                                                            }
                                                                        >
                                                                            {matchedVisits.length >
                                                                            0 ? (
                                                                                matchedVisits.map(
                                                                                    (
                                                                                        visit,
                                                                                    ) => {
                                                                                        const checkpoint =
                                                                                            checkpoints.find(
                                                                                                (
                                                                                                    c: any,
                                                                                                ) =>
                                                                                                    c.id ===
                                                                                                    visit.checkpointId,
                                                                                            );

                                                                                        return (
                                                                                            <Card
                                                                                                key={
                                                                                                    visit.id
                                                                                                }
                                                                                                size="small"
                                                                                                style={{
                                                                                                    borderRadius: 10,
                                                                                                }}
                                                                                                styles={{
                                                                                                    body: {
                                                                                                        padding:
                                                                                                            "4px 12px",
                                                                                                    },
                                                                                                }}
                                                                                            >
                                                                                                <Space
                                                                                                    style={{
                                                                                                        width: "100%",
                                                                                                        justifyContent:
                                                                                                            "space-between",
                                                                                                    }}
                                                                                                >
                                                                                                    <div>
                                                                                                        <Typography.Text
                                                                                                            strong
                                                                                                            style={{
                                                                                                                display:
                                                                                                                    "block",
                                                                                                                fontSize: 12,
                                                                                                                lineHeight: 1.2,
                                                                                                                marginBottom: 2,
                                                                                                            }}
                                                                                                        >
                                                                                                            {checkpoint?.name ??
                                                                                                                "Unknown Checkpoint"}
                                                                                                        </Typography.Text>

                                                                                                        <Typography.Text
                                                                                                            type="secondary"
                                                                                                            style={{
                                                                                                                display:
                                                                                                                    "block",
                                                                                                                fontSize: 12,
                                                                                                                lineHeight: 1.2,
                                                                                                            }}
                                                                                                        >
                                                                                                            {new Date(
                                                                                                                visit.visitTime,
                                                                                                            ).toLocaleTimeString(
                                                                                                                "en-GB",
                                                                                                                {
                                                                                                                    hour: "2-digit",
                                                                                                                    minute: "2-digit",
                                                                                                                    second: "2-digit",
                                                                                                                    hour12: false,
                                                                                                                },
                                                                                                            )}
                                                                                                        </Typography.Text>
                                                                                                    </div>

                                                                                                    <Button
                                                                                                        type="default"
                                                                                                        size="small"
                                                                                                        icon={
                                                                                                            <SearchOutlined />
                                                                                                        }
                                                                                                        href={
                                                                                                            visit.evidence
                                                                                                        }
                                                                                                        target="_blank"
                                                                                                        style={{
                                                                                                            paddingInline: 6,
                                                                                                            height: 24,
                                                                                                            fontSize: 12,
                                                                                                        }}
                                                                                                    >
                                                                                                        View
                                                                                                    </Button>
                                                                                                </Space>
                                                                                            </Card>
                                                                                        );
                                                                                    },
                                                                                )
                                                                            ) : (
                                                                                <Typography.Text
                                                                                    type="secondary"
                                                                                    style={{
                                                                                        fontSize: 12,
                                                                                    }}
                                                                                >
                                                                                    No
                                                                                    checkpoints
                                                                                    visited.
                                                                                </Typography.Text>
                                                                            )}
                                                                        </Space>
                                                                    </div>
                                                                </div>
                                                            </Space>
                                                        </Card>
                                                    );
                                                })
                                        )}
                                    </Space>
                                </Card>
                            </>
                        ),
                    },
                    {
                        key: "2",
                        label: (
                            <span style={{ fontSize: 12, fontWeight: 500 }}>
                                Checkpoints
                            </span>
                        ),
                        children: (
                            <Card
                                title={
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        Checkpoints
                                    </span>
                                }
                                styles={{
                                    body: {
                                        padding: 10,
                                    },
                                }}
                            >
                                <div style={{ padding: 0 }}>
                                    <div
                                        style={{
                                            maxWidth: 600,
                                            textAlign: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                maxWidth: 480,
                                                margin: "0 auto",
                                            }}
                                        >
                                            <video
                                                ref={videoRef}
                                                style={{
                                                    width: "100%",
                                                    borderRadius: 8,
                                                    backgroundColor: cameraOn
                                                        ? "#000"
                                                        : "#555",
                                                    filter: cameraOn
                                                        ? "none"
                                                        : "brightness(0.5)",
                                                }}
                                                autoPlay
                                                muted
                                            />

                                            {/* Scan area overlay */}
                                            {cameraOn && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "35%",
                                                        left: "20%",
                                                        width: "60%",
                                                        height: "30%",
                                                        border: "2px dashed #00ff00",
                                                        borderRadius: 8,
                                                        pointerEvents: "none",
                                                    }}
                                                />
                                            )}

                                            {/* Camera off message */}
                                            {!cameraOn && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        color: "#fff",
                                                        fontSize: 14,
                                                        textAlign: "center",
                                                        pointerEvents: "none",
                                                        gap: 6,
                                                    }}
                                                >
                                                    <CameraOutlined
                                                        style={{
                                                            fontSize: 44,
                                                            color: "#fff",
                                                        }}
                                                    />
                                                    Please turn on your camera
                                                </div>
                                            )}
                                        </div>

                                        {/* {loading && <Spin size="large" />} */}

                                        <div
                                            style={{
                                                margin: "20px 0",
                                                display: "flex",
                                                justifyContent: "center",
                                                gap: 12,
                                            }}
                                        >
                                            {!scanning ? (
                                                <Button
                                                    type="primary"
                                                    onClick={startScan}
                                                >
                                                    Start Scanning
                                                </Button>
                                            ) : (
                                                <Button
                                                    danger
                                                    onClick={stopScan}
                                                >
                                                    Stop Scanning
                                                </Button>
                                            )}
                                        </div>

                                        {/* <div style={{ marginTop: 16 }}>
                            <Text strong>Result:</Text>
                            <Input.TextArea
                                value={result}
                                rows={6}
                                placeholder="Scanned code will appear here..."
                                style={{ marginTop: 8 }}
                                readOnly
                            />
                        </div> */}
                                    </div>
                                </div>
                                {scannedCheckpoint && (
                                    <Card
                                        title="Scanned Checkpoint"
                                        styles={{
                                            body: {
                                                padding: 10,
                                            },
                                        }}
                                        style={{ marginTop: 24 }}
                                    >
                                        <Input
                                            addonBefore="ID"
                                            value={scannedCheckpoint.id}
                                            disabled
                                        />

                                        <Input
                                            addonBefore="Name"
                                            value={scannedCheckpoint.name}
                                            disabled
                                            style={{ marginTop: 12 }}
                                        />

                                        <Input
                                            addonBefore="Location"
                                            value={scannedCheckpoint.location}
                                            disabled
                                            style={{ marginTop: 12 }}
                                        />

                                        <Select
                                            style={{
                                                width: "100%",
                                                marginTop: 12,
                                            }}
                                            placeholder="Select Security"
                                            value={securityId}
                                            options={securitySelect}
                                            onChange={setEmployeeId}
                                        />

                                        <input
                                            id="checkpoint-photo"
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            hidden
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0];

                                                if (file) {
                                                    setCheckpointPhoto(file);
                                                }
                                            }}
                                        />

                                        <label
                                            htmlFor="checkpoint-photo"
                                            style={{
                                                display: "inline-block",
                                                width: "100%",
                                                marginTop: "12px",
                                                padding: "10px",
                                                border: "2px solid #1677ff",
                                                borderRadius: "8px",
                                                backgroundColor: "#ffffff",
                                                color: "#1677ff",
                                                textAlign: "center",
                                                cursor: "pointer",
                                                fontWeight: 500,
                                                boxSizing: "border-box",
                                            }}
                                        >
                                            {checkpointPhoto
                                                ? checkpointPhoto.name
                                                : "Select Evidence Photo"}
                                        </label>

                                        <Button
                                            type="primary"
                                            loading={loading}
                                            disabled={loading}
                                            style={{
                                                marginTop: 12,
                                                width: "100%",
                                            }}
                                            onClick={() =>
                                                uploadVisit(
                                                    scannedCheckpoint.id,
                                                    checkpointPhoto,
                                                )
                                            }
                                        >
                                            Submit Visit
                                        </Button>
                                    </Card>
                                )}
                            </Card>
                        ),
                    },
                    {
                        key: "3",
                        label: (
                            <span style={{ fontSize: 12, fontWeight: 500 }}>
                                Summary
                            </span>
                        ),
                        children: (
                            <>
                                <Card
                                    title={
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            View Complete Data
                                        </span>
                                    }
                                    style={{ marginBottom: 20 }}
                                    styles={{
                                        body: {
                                            padding: 10,
                                        },
                                    }}
                                >
                                    <Space wrap style={{ width: "100%" }}>
                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                window.open(
                                                    process.env
                                                        .NEXT_PUBLIC_SILVERWOOD_ATTENDANCE_SHEET_URL,
                                                    "_blank",
                                                )
                                            }
                                        >
                                            Google Sheets
                                        </Button>

                                        <Button
                                            type="primary"
                                            onClick={() =>
                                                window.open(
                                                    process.env
                                                        .NEXT_PUBLIC_SILVERWOOD_ATTENDANCE_DRIVE_URL,
                                                    "_blank",
                                                )
                                            }
                                        >
                                            Google Drive
                                        </Button>
                                    </Space>
                                </Card>
                                <Card
                                    title={
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Attendance History
                                        </span>
                                    }
                                    styles={{
                                        body: {
                                            padding: 10,
                                        },
                                    }}
                                    style={{ marginTop: 24 }}
                                >
                                    <Table
                                        rowKey="id"
                                        scroll={{ x: "max-content" }}
                                        columns={[
                                            {
                                                title: "Security",
                                                render: (_, row) =>
                                                    security.find(
                                                        (e) =>
                                                            e.id ===
                                                            row.securityId,
                                                    )?.name,
                                            },
                                            {
                                                title: "Date",
                                                dataIndex: "date",
                                            },
                                            {
                                                title: "Check In",
                                                dataIndex: "checkIn",
                                            },
                                            {
                                                title: "Check Out",
                                                dataIndex: "checkOut",
                                            },
                                            {
                                                title: "Status",
                                                dataIndex: "status",
                                            },
                                        ]}
                                        dataSource={attendance}
                                    />
                                </Card>
                                <Card
                                    title={
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Visit History
                                        </span>
                                    }
                                    styles={{
                                        body: {
                                            padding: 10,
                                        },
                                    }}
                                    style={{ marginTop: 24 }}
                                >
                                    <Table
                                        rowKey="id"
                                        scroll={{ x: "max-content" }}
                                        dataSource={visits}
                                        pagination={{ pageSize: 10 }}
                                        columns={[
                                            {
                                                title: "Security",
                                                render: (_, row) =>
                                                    security.find(
                                                        (e) =>
                                                            e.id ===
                                                            row.securityId,
                                                    )?.name,
                                            },
                                            {
                                                title: "Checkpoint",
                                                render: (_, row) =>
                                                    checkpoints.find(
                                                        (c: any) =>
                                                            c.id ===
                                                            row.checkpointId,
                                                    )?.name,
                                            },
                                            {
                                                title: "Visit Time",
                                                dataIndex: "visitTime",
                                            },
                                            {
                                                title: "Evidence",
                                                render: (_, row) => (
                                                    <a
                                                        href={row.evidence}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        View Photo
                                                    </a>
                                                ),
                                            },
                                        ]}
                                    />
                                </Card>
                            </>
                        ),
                    },
                ]}
            />
        </div>
    );
}
