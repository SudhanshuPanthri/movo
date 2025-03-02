"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header";

const ConditionalHeader = () => {
    const pathname = usePathname();
    const showHeader = pathname !== "/auth/login" && pathname !== "/auth/register";

    return showHeader ? <Header /> : null;
};

export default ConditionalHeader;