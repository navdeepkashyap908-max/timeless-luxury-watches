import React, { useState, useEffect } from "react";
import { useStore } from "../../context/useStore";

export default function TasksModal() {
  const {
    isTasksModalOpen,
    setIsTasksModalOpen,
    user,
    setIsAuthModalOpen,
    tasks,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New task form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("concierge");
  const [priority, setPriority] = useState("medium");
  const [watchName, setWatchName] = useState("");
  const [location, setLocation] = useState("Mumbai BKC Flagship Suite");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isTasksModalOpen && user) {
      fetchTasks();
    }
  }, [isTasksModalOpen, user]);

  if (!isTasksModalOpen) return null;

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast("Please provide both title and description.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createTask({
        title,
        description,
        category,
        priority,
        watchName,
        location,
        status: "pending",
      });
      setTitle("");
      setDescription("");
      setWatchName("");
      setShowCreateForm(false);
    } catch (err) {
      showToast(err.message || "Failed to create task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (task) => {
    const nextStatus =
      task.status === "completed"
        ? "pending"
        : task.status === "pending"
        ? "in_progress"
        : "completed";
    try {
      await updateTask(task._id, { status: nextStatus });
    } catch (err) {
      showToast(err.message || "Failed to update task.");
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Remove this horological task request?")) {
      try {
        await deleteTask(taskId);
      } catch (err) {
        showToast(err.message || "Failed to delete task.");
      }
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === "all") return true;
    return t.status === activeTab;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm"
        onClick={() => setIsTasksModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-surface rounded-2xl shadow-2xl z-10 border border-primary-container/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 bg-surface-container-high border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-primary text-[26px]">
              assignment_turned_in
            </span>
            <div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                Concierge &amp; Collector Tasks
              </h3>
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-outline">
                REST API Integration • MongoDB Persistent
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsTasksModalOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        {!user ? (
          <div className="p-8 flex flex-col items-center text-center gap-3">
            <span className="material-symbols-outlined text-primary text-[48px]">lock</span>
            <h4 className="font-headline-sm text-title-lg text-on-surface">
              Authentication Required
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Please sign in to access your personal concierge tasks, viewing appointments, and manufacture service requests.
            </p>
            <button
              onClick={() => {
                setIsTasksModalOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="mt-2 px-6 h-11 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-widest rounded-lg hover:bg-primary-container transition-colors cursor-pointer"
            >
              Sign In to Collector Salon
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/20 pb-3">
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {[
                  { key: "all", label: "All" },
                  { key: "pending", label: "Pending" },
                  { key: "in_progress", label: "In Progress" },
                  { key: "completed", label: "Completed" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-3 py-1 rounded-full text-label-sm uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === tab.key
                        ? "bg-on-surface text-on-primary font-bold shadow-sm"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Create Task Button */}
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="h-9 px-3.5 bg-primary text-on-primary font-label-sm text-[10px] uppercase tracking-wider rounded-lg flex items-center gap-1.5 hover:bg-primary-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {showCreateForm ? "close" : "add"}
                </span>
                <span>{showCreateForm ? "Cancel" : "New Concierge Request"}</span>
              </button>
            </div>

            {/* Create Task Form */}
            {showCreateForm && (
              <form
                onSubmit={handleCreateTask}
                className="p-4 rounded-xl bg-surface-container-low border border-primary/30 flex flex-col gap-3 shadow-inner"
              >
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold">
                  New Task Specification
                </span>

                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Schedule Private Viewing for Royal Chronometer"
                    className="h-10 px-3 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="font-label-md text-[10px] uppercase tracking-wider text-outline">
                    Description &amp; Collector Notes
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide specific horological references, timing preferences, or suite requirements..."
                    className="p-2.5 bg-surface-container-lowest border border-outline-variant/30 rounded-lg text-body-sm text-on-surface outline-none focus:border-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[9px] uppercase tracking-wider text-outline">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="h-9 px-2 bg-surface-container-lowest border border-outline-variant/30 rounded text-body-sm text-on-surface outline-none"
                    >
                      <option value="concierge">Concierge</option>
                      <option value="viewing_request">Viewing Suite</option>
                      <option value="watch_sourcing">Watch Sourcing</option>
                      <option value="maintenance">Service &amp; Calibre</option>
                      <option value="valuation">Valuation</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[9px] uppercase tracking-wider text-outline">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="h-9 px-2 bg-surface-container-lowest border border-outline-variant/30 rounded text-body-sm text-on-surface outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[9px] uppercase tracking-wider text-outline">
                      Timepiece Reference
                    </label>
                    <input
                      type="text"
                      value={watchName}
                      onChange={(e) => setWatchName(e.target.value)}
                      placeholder="Royal Chronometer"
                      className="h-9 px-2 bg-surface-container-lowest border border-outline-variant/30 rounded text-body-sm text-on-surface outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-label-md text-[9px] uppercase tracking-wider text-outline">
                      Salon Suite
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Mumbai BKC Suite"
                      className="h-9 px-2 bg-surface-container-lowest border border-outline-variant/30 rounded text-body-sm text-on-surface outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 h-10 bg-primary text-on-primary font-label-md text-[11px] uppercase tracking-widest rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 font-semibold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">done</span>
                  <span>{isSubmitting ? "Dispatching..." : "Record Task in MongoDB"}</span>
                </button>
              </form>
            )}

            {/* Task Cards List */}
            <div className="flex flex-col gap-3">
              {filteredTasks.length === 0 ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-2 bg-surface-container-low rounded-xl p-4">
                  <span className="material-symbols-outlined text-outline text-[36px]">
                    task_alt
                  </span>
                  <span className="font-title-md text-body-md text-on-surface">
                    No Tasks in this Filter
                  </span>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">
                    Create a new concierge request or viewing appointment above.
                  </p>
                </div>
              ) : (
                filteredTasks.map((t) => (
                  <div
                    key={t._id}
                    className="p-3.5 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex flex-col gap-2 shadow-sm hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => handleToggleStatus(t)}
                          className="mt-0.5 text-on-surface hover:text-primary transition-colors cursor-pointer"
                          title="Click to toggle status (pending -> in_progress -> completed)"
                        >
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              t.status === "completed"
                                ? "text-primary"
                                : t.status === "in_progress"
                                ? "text-primary-container"
                                : "text-outline-variant"
                            }`}
                          >
                            {t.status === "completed"
                              ? "check_circle"
                              : t.status === "in_progress"
                              ? "timelapse"
                              : "radio_button_unchecked"}
                          </span>
                        </button>

                        <div>
                          <h4
                            className={`font-title-md text-body-md font-semibold text-on-surface ${
                              t.status === "completed" ? "line-through text-outline" : ""
                            }`}
                          >
                            {t.title}
                          </h4>
                          <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                            {t.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Status badge */}
                        <span
                          className={`font-label-sm text-[9px] uppercase px-2 py-0.5 rounded font-bold ${
                            t.status === "completed"
                              ? "bg-primary/10 text-primary"
                              : t.status === "in_progress"
                              ? "bg-primary-fixed/40 text-on-primary-fixed"
                              : "bg-surface-container text-on-surface-variant"
                          }`}
                        >
                          {t.status.replace("_", " ")}
                        </span>

                        {/* Priority badge */}
                        <span
                          className={`font-label-sm text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                            t.priority === "urgent"
                              ? "bg-error-container text-on-error-container"
                              : t.priority === "high"
                              ? "bg-primary-container text-on-primary-container"
                              : "bg-surface-container text-secondary"
                          }`}
                        >
                          {t.priority}
                        </span>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="p-1 text-outline hover:text-error transition-colors cursor-pointer"
                          title="Delete task"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex flex-wrap items-center justify-between text-[11px] text-secondary border-t border-outline-variant/15 pt-2">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] text-primary">
                            category
                          </span>
                          {t.category.replace("_", " ")}
                        </span>
                        {t.watchName && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] text-primary">
                              watch
                            </span>
                            {t.watchName}
                          </span>
                        )}
                        {t.location && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[13px] text-primary">
                              location_on
                            </span>
                            {t.location}
                          </span>
                        )}
                      </div>
                      <span className="font-label-sm text-[9px] text-outline">
                        {new Date(t.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
