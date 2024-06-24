import { DateFormatFunc } from "../helpers/DateFormat";
import { Tarea } from "../types";

type TareaItemProps = {
    tarea: Tarea;
    setTareaObj: React.Dispatch<React.SetStateAction<Tarea>>,
    setTarea: React.Dispatch<React.SetStateAction<Tarea[]>>,
    onUpdateTermino: (id: Tarea['id'], bTermino: boolean) => void
}

export const TareaItem = ({tarea,setTareaObj, setTarea, onUpdateTermino}: TareaItemProps) => {

    const onDeleteTarea = () => {
        setTarea( task => task.filter( t => t.id !== tarea.id ))
    }

    return (
        <div className='bg-white w-full p-3 rounded-md'>
            <div className='grid grid-cols-[3rem_minmax(0,_1fr)_8rem]'>
                <div className='flex items-center'>
                    <input type="checkbox" className='peer appearance-none w-8 h-8 border cursor-pointer bg-gray-300
                    rounded-sm checked:bg-indigo-500 hover:ring' checked={tarea.bTermino} 
                    onChange={() => onUpdateTermino(tarea.id,!tarea.bTermino)}
                    />
                </div>
                <div>
                    <p className={`font-medium text-gray-600 text-[1.1rem] ${tarea.bTermino && 'line-through'}`}>{tarea.descripcion}</p>
                    <p className='font-medium text-gray-400 text-[0.8rem]'>{DateFormatFunc(tarea.fecha)}</p>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <button className='bg-green-500 p-2 rounded-md text-white hover:bg-green-600 transition-colors' 
                        onClick={() => setTareaObj(tarea)}
                    >
                        <i className="fas fa-pen"></i>
                    </button>
                    <button className='bg-red-500 p-2 rounded-md text-white hover:bg-red-600 transition-colors'
                        onClick={() => onDeleteTarea()}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
     )
}
