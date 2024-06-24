import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { InputTarea } from './components/InputTarea'
import { TareaBody } from './components/TareaBody'
import { Tarea } from './types'

function App() {

  const initialTarea = () => {
    return localStorage.getItem("tareaStorage") ? JSON.parse(localStorage.getItem("tareaStorage") ?? "") : []
  }

  const [tarea, setTarea] = useState<Tarea[]>(initialTarea)
  const [tareaObj, setTareaObj] = useState<Tarea>({
    id: "",
    descripcion: "",
    fecha: new Date(),
    bTermino: false
  })

  const emptyTarea = useMemo(() => tarea.length === 0, [tarea])
  const terminadaTarea = useMemo(() => tarea.filter(task => task.bTermino).length, [tarea])
  const totalTarea = useMemo(() => tarea.length, [tarea])

  useEffect(() => {
    localStorage.setItem("tareaStorage", JSON.stringify(tarea ?? []))
  }, [tarea])
  

  return (
    <>
      <h1 className='font-bold text-[4rem] text-gray-700 text-center'>TODO LIST</h1>
      <div className='max-w-[800px] mt-8 mx-auto'>

        <div className='flex font-bold text-2xl mb-3 justify-between'>
          <span>Total Tareas: {totalTarea}</span>
          <span>Tareas Terminadas: {terminadaTarea}</span>
        </div>

        <InputTarea 
          tarea={tarea}
          setTarea={setTarea}
          tareaObj={tareaObj}
          setTareaObj={setTareaObj}
        />

        {
          emptyTarea ? (
            <div className='bg-white p-4 rounded-md'>
              <p className='font-bold'>No hay tareas registradas.</p>
            </div>
          ) : (
            <TareaBody 
              tareas={tarea}
              setTareaObj={setTareaObj}
              setTarea={setTarea}
            />
          )
        }

      </div>
    </>
  )
}

export default App
