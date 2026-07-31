"use client";

import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you’re looking for doesn’t exist."
        extra={[
          <Button
            key="home"
            type="primary"
            onClick={() => router.push("/")}
          >
            Back Home
          </Button>,
          <Button
            key="back"
            onClick={() => router.back()}
          >
            Go Back
          </Button>,
        ]}
      />
    </div>
  );
}
