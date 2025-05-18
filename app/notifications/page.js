"use client";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (data.success) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  return (
    <div className="container mx-auto p-6 py-20">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((task) => (
            <li key={task._id} className="p-4 border rounded-lg shadow space-y-2">
              <p><b>Task:</b> {task.work}</p>
              <p><b>Deadline:</b> {new Date(task.deadline).toLocaleDateString()}</p>
              <p><b>Pages:</b> {task.pages}</p>
              <p><b>Address:</b> {task.address}</p>
              <p><b>Matched Writer for</b> {task.matchedWriter?.work || "No writer matched"}</p>
              <button
                onClick={() => handleDelete(task._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;

