import { Tarea } from "../types"
import { TareaItem } from "./TareaItem"

type TareaBodyProps = {
    tareas: Tarea[];
    setTareaObj: React.Dispatch<React.SetStateAction<Tarea>>,
    setTarea: React.Dispatch<React.SetStateAction<Tarea[]>>
}

export const TareaBody = ({tareas, setTareaObj, setTarea}: TareaBodyProps) => {

    const onUpdateTermino = (id: Tarea['id'], bTermino: boolean) => {
        const newTarea = tareas.map( task => {
            if (task.id === id) {
                task.bTermino = bTermino;
            }
            return task;
        })

        setTarea(newTarea);
    }

    return (
        <div className='bg-slate-300 p-6 rounded-xl'>
            <div className="h-[500px] overflow-y-auto grid gap-3">
            {
                tareas.map( task => (
                    <TareaItem 
                        key={task.id}
                        tarea={task}
                        setTareaObj={setTareaObj}
                        setTarea={setTarea}
                        onUpdateTermino={onUpdateTermino}
                    />
                ))
            }
            </div>
        </div>
    )
}
