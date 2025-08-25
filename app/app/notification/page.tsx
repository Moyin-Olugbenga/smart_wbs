"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, CheckCircle, AlertCircle, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Notification as Notifications} from "@prisma/client";
import { Notification } from "@/classes/Notification";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";


const allNotifications = await Notification.getNotifications();
export default function NotificationList() {
  const searchParams = useSearchParams();
  const binId = searchParams.get("binId");

  const [notifications, setNotifications] = useState<Notifications[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (binId) {
      setNotifications(allNotifications.filter((n: { binId: string; }) => n.binId === binId));
    } else {
      setNotifications(allNotifications);
    }
  }, [binId]);


    const markAsRead = async (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.uuid === id ? { ...n, status: "VIEWED" } : n))
        );
        try {
            await Notification.viewedNotification(id);
        } catch (err) {
        console.error("Failed to mark as read", err);
        }
    };

    const toggleExpand = (id: string, status: string) => {
        setExpanded((prev) => (prev === id ? null : id));
        if (status === "UNVIEWED") {
        markAsRead(id);
        }
    };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, status: "VIEWED" }))
    );
  };

  return (
    
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                
                 <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                        <Bell className="w-5 h-5 text-blue-500" /> Notifications
                        </h2>
                        <Button variant="outline" onClick={markAllAsRead}>
                        Mark all as read
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {notifications.length === 0 ? (
                        <p className="text-gray-500 italic">No notifications available</p>
                        ) : (
                        notifications.map((n) => (
                            <Card
                            key={n.id}
                            className={`transition cursor-pointer ${
                                n.status === "UNVIEWED"
                                ? "border-l-4 border-blue-500 bg-blue-50"
                                : "bg-white"
                            }`}
                            onClick={() => toggleExpand(n.uuid, n.status)}
                            >
                            <div className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                {n.status === "UNVIEWED" ? (
                                    <AlertCircle className="w-5 h-5 text-blue-500" />
                                ) : (
                                    <CheckCircle className="w-5 h-5 text-gray-400" />
                                )}
                                <p
                                    className={`${
                                    n.status === "UNVIEWED" ? "font-semibold" : "text-gray-500"
                                    }`}
                                >
                                    Notification for Bin #{n.binId}
                                </p>
                                </div>
                                <ChevronDown
                                className={`w-5 h-5 transition-transform ${
                                    expanded === n.uuid ? "rotate-180" : ""
                                }`}
                                />
                            </div>

                            {expanded === n.uuid && (
                                <div className="px-12 pb-4 text-sm text-gray-700">
                                {n.note}
                                </div>
                            )}
                            </Card>
                        ))
                        )}
                    </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
  );
}
