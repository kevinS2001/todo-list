import { FormEvent, useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { Tarea } from "../types"

type InputTareaProps = {
    tarea: Tarea[],
    setTarea: React.Dispatch<React.SetStateAction<Tarea[]>>,
    tareaObj: Tarea,
    setTareaObj: React.Dispatch<React.SetStateAction<Tarea>>
}

export const InputTarea = ({tarea, setTarea, tareaObj, setTareaObj}: InputTareaProps) => {

    const [inputTarea, setInputTarea] = useState("")

    useEffect(() => {
      if (tareaObj.id.length > 0) {
        setInputTarea(tareaObj.descripcion)
      }
    }, [tareaObj])
    

    const onSubmitAddTarea = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Actualizar
        if (tareaObj.id.length > 0) {

            const newTarea = tarea.map( task => {
                if (task.id === tareaObj.id) {
                    return {
                        ...task,
                        descripcion: inputTarea
                    }
                } else {
                    return task;
                }
            })

            setTarea(newTarea)

            setTareaObj({
                id: "",
                descripcion: "",
                fecha: new Date(),
                bTermino: false
            })
            
        } else {

            // Crear objeto
            const tarea: Tarea = {
                id: uuidv4(),
                descripcion: inputTarea.trim(),
                fecha: new Date(),
                bTermino: false
            }
    
            // Agregar a la lista
            setTarea(task => [tarea, ...task]);
    
        }

        // Limpiar
        setInputTarea("");
    }

    return (
        <form className='grid grid-cols-12 mb-5 h-[3rem] rounded-md overflow-hidden shadow-xl' onSubmit={onSubmitAddTarea}>
            <div className='col-span-11'>
                <input type="text" className='w-full h-full px-4 outline-none' placeholder='Ingrese una tarea...' value={inputTarea} onChange={(e) => setInputTarea(e.target.value)}/>
            </div>
            <button type='submit' className='w-full bg-indigo-500 text-white hover:bg-indigo-700 transition-colors'>
                <i className="fas fa-plus"></i>
            </button>
        </form>
    )
}
