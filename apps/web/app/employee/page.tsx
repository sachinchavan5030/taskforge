"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  useAddCommunicationMutation,
  useGetEmployeeTaskQuery,
} from "@/redux/apis/employee.api"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import z from "zod"
import { CREATE_COMMUNICATION_REQUEST, Task } from "@repo/types"



const TaskSheet = ({ open, onOpenChange, task, }: {
  open: boolean, onOpenChange: any, task: any
}) => {
  const [addCommunication] = useAddCommunicationMutation()

  const schema = z.object({
    msg: z.string(),
    taskId: z.number(),
  }) satisfies z.ZodType<CREATE_COMMUNICATION_REQUEST>

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const handleFormSubmit = async (data: any) => {
    console.log("clicked")
    try {
      const payload = {
        msg: data.msg,
        taskId: task.id,
      }

      console.log("payload", payload)

      await addCommunication(payload).unwrap()


      toast.success("Message sent")
      reset()
      onOpenChange(false)
    } catch (err) {
      console.log(err)
    }
  }

  if (!task) return null

  return (

    // <Sheet open={open} onOpenChange={onOpenChange}>
    //   <SheetContent>
    //     <SheetHeader>
    //       <SheetTitle>{task.title}</SheetTitle>

    //       <Avatar>
    //         <AvatarImage src={task.hero} />
    //       </Avatar>

    //       <p className="text-muted-foreground">{task.desc}</p>
    //     </SheetHeader>
    //     <form
    //       onSubmit={(e) => {
    //         console.log("FORM EVENT TRIGGERED")
    //         e.preventDefault()
    //       }}
    //     >
    //       {/* <form onSubmit={handleSubmit(handleFormSubmit)}> */}
    //       <div className="grid gap-4 py-4">
    //         <Label>Message</Label>

    //         <input {...register("msg")} className="border p-2 rounded" />

    //         {errors.msg && (
    //           <p className="text-red-500 text-sm">
    //             {errors.msg.message as string}
    //           </p>
    //         )}

    //       </div>
    //       <Button
    //         type="submit"
    //         onClick={() => console.log("BUTTON CLICK")}
    //       >
    //         Send
    //       </Button>
    //       {/* <Button type="submit">Send</Button> */}
    //     </form>
    //     <SheetFooter>

    //       <SheetClose asChild>
    //         <Button type="button" variant="outline">
    //           Close
    //         </Button>
    //       </SheetClose>
    //     </SheetFooter>
    //   </SheetContent>
    // </Sheet>
    // <Sheet open={open} onOpenChange={onOpenChange}>
    //   <SheetContent className="flex flex-col h-full">
    //     <SheetHeader>
    //       <SheetTitle>{task.title}</SheetTitle>

    //       <Avatar>
    //         <AvatarImage src={task.hero} />
    //       </Avatar>

    //       <p className="text-muted-foreground">{task.desc}</p>
    //     </SheetHeader>

    //     <form
    //       onSubmit={handleSubmit(handleFormSubmit)}
    //       className="flex flex-col flex-1 justify-between"
    //     >
    //       <div className="grid gap-4 py-4">
    //         <Label>Message</Label>

    //         <input {...register("msg")} className="border p-2 rounded" />

    //         {errors.msg && (
    //           <p className="text-red-500 text-sm">
    //             {errors.msg.message as string}
    //           </p>
    //         )}
    //       </div>

    //       {/* ✅ Footer inside form */}
    //       <div className="flex gap-2">
    //         <button type="submit">Send</button>
    //         {/* <Button type="submit">Send</Button> */}

    //         <Button
    //           type="button"
    //           variant="outline"
    //           onClick={() => onOpenChange(false)}
    //         >
    //           Close
    //         </Button>
    //       </div>
    //     </form>
    //   </SheetContent>
    // </Sheet>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col h-full">

        <SheetHeader>
          <SheetTitle>{task.title}</SheetTitle>

          <Avatar>
            <AvatarImage src={task.hero} />
          </Avatar>

          <p className="text-muted-foreground">{task.desc}</p>
        </SheetHeader>

        {/* ✅ FORM FULL HEIGHT */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col flex-1 justify-between"
        >
          <div className="grid gap-4 py-4">
            <Label>Message</Label>

            <input
              {...register("msg")}
              className="border p-2 rounded"
            />

            {errors.msg && (
              <p className="text-red-500 text-sm">
                {errors.msg.message as string}
              </p>
            )}
          </div>

          {/* ✅ IMPORTANT: Footer INSIDE form */}
          <div className="flex gap-2">
            <button
              onClick={() => setValue("taskId", task?.id)}
              type="submit"
              className="bg-black text-white px-4 py-2 rounded"
            >
              Send
            </button>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="border px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>

      </SheetContent>
    </Sheet>
  )
}



const Page = () => {
  const { data, isLoading } = useGetEmployeeTaskQuery()

  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  if (isLoading) return <p>Loading...</p>

  const tasks = data?.result || []

  const handleOpen = (task: any) => {
    setSelectedTask(task)
    setOpen(true)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Tasks</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tasks.map((task: any) => (
          <Card key={task.id} className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>

            {task.hero ? (
              <img
                src={task.hero}
                alt="task"
                className="w-full h-40 object-cover rounded-md"
              />
            ) : (
              <p>No Image</p>
            )}

            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">{task.desc}</p>

              <div>
                <span className="font-medium">Due:</span>{" "}
                {task.due
                  ? new Date(task.due).toLocaleDateString()
                  : "N/A"}
              </div>
              <div>
                <span className="font-medium">Complete Date:</span>{" "}
                {task.due
                  ? new Date(task.completeDate).toLocaleDateString()
                  : "N/A"}
              </div>

              <div>
                <span className="font-medium">Status:</span>{" "}
                {task.complete ? (
                  <Button variant="secondary" >Done</Button>
                ) : (
                  <Button variant="destructive">Pending</Button>
                )}
              </div>

              <div>
                <span className="font-medium">Completed Date:</span>{" "}
                {task.completeDate
                  ? new Date(task.completeDate).toLocaleDateString()
                  : "N/A"}
              </div>
              <Button
                className="mt-2"
                onClick={() => handleOpen(task)}
              >
                Open
              </Button>

            </CardContent>
          </Card>

        ))}
      </div>

      {/* 🔥 Sheet reuse */}
      <TaskSheet
        open={open}
        onOpenChange={setOpen}
        task={selectedTask}
      />
    </div>
  )
}

export default Page
