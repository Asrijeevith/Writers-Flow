"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const boxVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" },
  }),
};

const Notifications = () => {
  const [taskNotifications, setTaskNotifications] = useState([]);
  const [writerNotifications, setWriterNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (data.success) {
          setTaskNotifications(data.taskNotifications);
          setWriterNotifications(data.writerNotifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteTask = (id) => {
    setTaskNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const handleDeleteWriter = (writerId) => {
    setWriterNotifications((prev) => prev.filter((n) => n.writer._id !== writerId));
  };

  const taskChunks = chunkArray(taskNotifications, 5);
  const writerChunks = chunkArray(writerNotifications, 5);

  return (
    <div className="container mx-auto p-6 py-20 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Notifications</h1>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Tasks matched with Writers
        </h2>
        {taskNotifications.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">No task notifications available.</p>
        )}

        {taskChunks.map((chunk, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={boxVariants}
            className="mb-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6"
          >
            <h3 className="mb-4 font-semibold text-lg text-gray-900 dark:text-gray-100">
              Tasks Group #{idx + 1}
            </h3>
            <ul className="space-y-5">
              {chunk.map((task) => (
                <li
                  key={task._id}
                  className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 shadow-inner"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    <b>Task:</b> {task.work}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <b>Deadline:</b> {new Date(task.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <b>Pages:</b> {task.pages}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <b>Address:</b> {task.address}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <b>Phone Number:</b> {task.phonenumber}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <b>Matched Writer for:</b> {task.matchedWriter?.work || "No writer matched"}
                  </p>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="mt-3 px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Writers matched with Tasks
        </h2>
        {writerNotifications.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400">No writer notifications available.</p>
        )}

        {writerChunks.map((chunk, idx) => (
          <motion.div
            key={idx}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={boxVariants}
            className="mb-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-6"
          >
            <h3 className="mb-4 font-semibold text-lg text-gray-900 dark:text-gray-100">
              Writers Group #{idx + 1}
            </h3>
            <ul className="space-y-6">
              {chunk.map(({ writer, matchedTasks }) => (
                <li
                  key={writer._id}
                  className="p-4 rounded-md bg-gray-50 dark:bg-gray-800 shadow-inner"
                >
                  <p className="text-gray-800 dark:text-gray-200">
                    <b>Writer Work:</b> {writer.work}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <b>Address:</b> {writer.address}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <b>Phone Number:</b> {writer.phonenumber}
                  </p>
                  <p className="text-gray-700 dark:text-gray-400">
                    <b>Matched Tasks:</b>
                  </p>
                  {matchedTasks.length > 0 ? (
                    <ul className="list-disc ml-6 text-gray-700 dark:text-gray-400">
                      {matchedTasks.map((task) => (
                        <li key={task._id}>
                          {task.work} (Deadline: {new Date(task.deadline).toLocaleDateString()})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600 dark:text-gray-500">No tasks matched.</p>
                  )}
                  <button
                    onClick={() => handleDeleteWriter(writer._id)}
                    className="mt-3 px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Notifications;
