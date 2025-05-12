"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Trash2, Edit, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Task {
  id: string
  text: string
  completed: boolean
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingTask, setEditingTask] = useState<{ id: string; text: string } | null>(null)

  
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskItem: Task = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
      }
      setTasks([...tasks, newTaskItem])
      setNewTask("")
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const startEditTask = (task: Task) => {
    setEditingTask({ id: task.id, text: task.text })
  }

  const updateTask = (id: string, newText: string) => {
    setTasks(tasks.map((task) => 
      task.id === id ? { ...task, text: newText } : task
    ))
    setEditingTask(null)
  }

  const cancelEdit = () => {
    setEditingTask(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addTask()
  }

  return (
    <div className="container mx-auto max-w-md p-4">
      <Card className="bg-gradient-to-br from-teal-50 to-indigo-100 border-teal-200/50 shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-teal-500 to-blue-600 rounded-t-xl">
          <CardTitle className="text-2xl font-bold text-center text-white drop-shadow-md">TODOLIST</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder="Ajouter une nouvelle tâche..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-1 border-teal-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
                          bg-white/80 shadow-sm"
            />
            <Button 
              type="submit" 
              size="sm" 
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 
                         text-white shadow-md transition-all duration-300 ease-in-out"
            >
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </form>
          <div className="space-y-2">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 italic">Aucune tâche pour le moment. Ajoutez-en une !</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg 
                    bg-white/70 border-teal-200 
                    hover:bg-teal-50 transition-all duration-200 ease-in-out 
                    shadow-sm hover:shadow-md"
                >
                  {editingTask?.id === task.id ? (
                    <div className="flex items-center gap-2 w-full">
                      <Input
                        type="text"
                        value={editingTask.text}
                        onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                        className="flex-1 border-teal-300 focus:ring-2 focus:ring-teal-500"
                      />
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => updateTask(editingTask.id, editingTask.text)}
                          className="text-green-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={cancelEdit}
                          className="text-red-500 hover:bg-red-50 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(task.id)}
                          className="border-teal-400 data-[state=checked]:bg-teal-600"
                        />
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`font-medium ${
                            task.completed 
                              ? "line-through text-gray-400" 
                              : "text-teal-800"
                          }`}
                        >
                          {task.text}
                        </label>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEditTask(task)}
                          aria-label="Modifier la tâche"
                          className="text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteTask(task.id)}
                          aria-label="Supprimer la tâche"
                          className="text-red-500 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}