import TodoList from "@/components/Todolist"

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <TodoList />
    </main>
  )
}