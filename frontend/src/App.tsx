import React, { useState } from 'react';
import { 
  CheckSquare, Plus, CheckCircle2, Clock, AlertTriangle, 
  Trash2, Filter, Search, Calendar, User, Tag, 
  BarChart2, Flame, Layers, Sparkles, X, ArrowRight
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'BACKLOG' | 'IN_PROGRESS' | 'CODE_REVIEW' | 'COMPLETED';
  due_date: string;
  assignee: string;
  tag: string;
  progress_pct: number;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-101",
      title: "Architect Neural Loss Simulation Kernel",
      description: "Implement multi-variate loss surface tensor calculations for gradient descent simulator.",
      priority: "CRITICAL",
      status: "IN_PROGRESS",
      due_date: "2026-09-02",
      assignee: "Alex Rivera",
      tag: "AI/ML",
      progress_pct: 75
    },
    {
      id: "task-102",
      title: "Design Cyber Glassmorphic Dashboard UI",
      description: "Create responsive React 18 Tailwind CSS layout with dark cyber theme and real-time graphs.",
      priority: "HIGH",
      status: "COMPLETED",
      due_date: "2026-08-30",
      assignee: "Elena Rostova",
      tag: "Frontend",
      progress_pct: 100
    },
    {
      id: "task-103",
      title: "Configure Stripe Webhook & Payment Gateway",
      description: "Set up signature verification, idempotency headers, and multi-currency exchange rates.",
      priority: "HIGH",
      status: "IN_PROGRESS",
      due_date: "2026-09-05",
      assignee: "David Chen",
      tag: "Payments",
      progress_pct: 40
    },
    {
      id: "task-104",
      title: "Benchmark Database Query Latency",
      description: "Optimize PostgreSQL B-Tree indexing and Redis cache hit ratios under 10k RPS load.",
      priority: "MEDIUM",
      status: "BACKLOG",
      due_date: "2026-09-12",
      assignee: "Marcus Vance",
      tag: "Database",
      progress_pct: 0
    },
    {
      id: "task-105",
      title: "Draft Enterprise API Documentation & Specs",
      description: "Generate OpenAPI 3.1 specifications with comprehensive request/response payloads.",
      priority: "LOW",
      status: "BACKLOG",
      due_date: "2026-09-18",
      assignee: "Sarah Jenkins",
      tag: "Documentation",
      progress_pct: 0
    }
  ]);

  const [filterPriority, setFilterPriority] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDesc, setNewDesc] = useState<string>("");
  const [newPriority, setNewPriority] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'>("HIGH");
  const [newAssignee, setNewAssignee] = useState<string>("Alex Rivera");
  const [newTag, setNewTag] = useState<string>("Feature");
  const [newDueDate, setNewDueDate] = useState<string>("2026-09-10");

  const filteredTasks = tasks.filter(t => {
    const matchesPriority = filterPriority === "ALL" || t.priority === filterPriority;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now().toString().slice(-4)}`,
      title: newTitle,
      description: newDesc || "No description provided.",
      priority: newPriority,
      status: "BACKLOG",
      due_date: newDueDate,
      assignee: newAssignee,
      tag: newTag,
      progress_pct: 0
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle("");
    setNewDesc("");
    setIsModalOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const progress = newStatus === 'COMPLETED' ? 100 : newStatus === 'IN_PROGRESS' ? 50 : newStatus === 'CODE_REVIEW' ? 85 : 0;
        return { ...t, status: newStatus, progress_pct: progress };
      }
      return t;
    }));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const columns: { label: string; status: Task['status']; color: string }[] = [
    { label: "Backlog", status: "BACKLOG", color: "border-slate-700 bg-slate-900/40" },
    { label: "In Progress", status: "IN_PROGRESS", color: "border-cyan-500/30 bg-cyan-950/20" },
    { label: "Code Review", status: "CODE_REVIEW", color: "border-indigo-500/30 bg-indigo-950/20" },
    { label: "Completed", status: "COMPLETED", color: "border-emerald-500/30 bg-emerald-950/20" }
  ];

  const getPriorityBadge = (p: Task['priority']) => {
    switch (p) {
      case 'CRITICAL':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
      case 'HIGH':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'MEDIUM':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
      case 'LOW':
        return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.status === 'COMPLETED').length;
  const velocity = Math.round((completedCount / (totalTasks || 1)) * 100);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-[#070d1e]/80 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-2xl shadow-cyan-950/40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#070d1e] rounded-[10px] flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black tracking-wider text-base bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400">
                TASKMATRIX 360
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                ENTERPRISE SPRINT
              </span>
            </div>
            <p className="text-xs text-slate-400">Intelligent Task Orchestration, Kanban Workflow & Agile Velocity Engine</p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            <input
              type="text"
              placeholder="Search tasks, assignees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 text-xs text-slate-100 rounded-xl pl-9 pr-4 py-2 outline-none"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-extrabold text-xs flex items-center space-x-1.5 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col space-y-6">
        {/* Sprint KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-2xl bg-[#091124]/90 border border-cyan-500/20 p-4 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Sprint 42 Velocity</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-cyan-300 font-mono">{velocity}%</span>
              <span className="text-xs text-emerald-400 font-mono">94 / 128 SP</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${velocity}%` }}></div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#091124]/90 border border-indigo-500/20 p-4 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Active Task Count</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-indigo-300 font-mono">{totalTasks} Tasks</span>
              <span className="text-xs text-cyan-400 font-mono">{completedCount} Closed</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Across 4 workflow phases</p>
          </div>

          <div className="rounded-2xl bg-[#091124]/90 border border-fuchsia-500/20 p-4 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">SLA Compliance</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-fuchsia-300 font-mono">98.2%</span>
              <span className="text-xs text-emerald-400 font-mono">0 Breaches</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Target threshold $\ge$ 95%</p>
          </div>

          <div className="rounded-2xl bg-[#091124]/90 border border-emerald-500/20 p-4 shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Team Members Active</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-300 font-mono">8 Engineers</span>
              <span className="text-xs text-emerald-400 font-mono">100% Load</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Sprint ends in 4 days</p>
          </div>
        </div>

        {/* Priority Filter Bar */}
        <div className="flex items-center space-x-2">
          {["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all ${
                filterPriority === p
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Kanban Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter(t => t.status === col.status);
            return (
              <div
                key={col.status}
                className={`rounded-2xl border ${col.color} p-4 flex flex-col justify-between min-h-[500px] shadow-xl`}
              >
                <div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800/80 mb-3">
                    <span className="font-bold text-xs text-white uppercase tracking-wider">{col.label}</span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {colTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colTasks.map((t) => (
                      <div
                        key={t.id}
                        className="rounded-xl bg-[#0b1329]/90 border border-slate-800 hover:border-cyan-500/40 transition-all p-3.5 shadow-lg group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border font-bold ${getPriorityBadge(t.priority)}`}>
                            {t.priority}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800/40">
                            {t.tag}
                          </span>
                        </div>

                        <h4 className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors mb-1.5">
                          {t.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                          {t.description}
                        </p>

                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <span className="flex items-center space-x-1">
                            <User className="w-3 h-3 text-slate-500" />
                            <span>{t.assignee}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            <span>{t.due_date}</span>
                          </span>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="mt-3 pt-2 border-t border-slate-800/40 flex items-center justify-between">
                          <select
                            value={t.status}
                            onChange={(e) => handleStatusChange(t.id, e.target.value as Task['status'])}
                            className="bg-slate-900 border border-slate-700 text-[10px] text-slate-200 rounded px-2 py-1 outline-none"
                          >
                            <option value="BACKLOG">Backlog</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="CODE_REVIEW">Review</option>
                            <option value="COMPLETED">Completed</option>
                          </select>
                          <button
                            onClick={() => handleDeleteTask(t.id)}
                            className="text-rose-400/60 hover:text-rose-400 p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#070d1e] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-base text-white flex items-center space-x-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>Create New Task</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement WebSockets Telemetry"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 text-slate-100 rounded-xl px-3 py-2 outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed functional requirements..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 focus:border-cyan-400 text-slate-100 rounded-xl px-3 py-2 outline-none font-sans"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 outline-none"
                  >
                    <option value="CRITICAL">CRITICAL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Assignee</label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 outline-none"
                  >
                    <option>Alex Rivera</option>
                    <option>Elena Rostova</option>
                    <option>David Chen</option>
                    <option>Marcus Vance</option>
                    <option>Sarah Jenkins</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Tag / Category</label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 outline-none font-sans"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
