import { useState, useEffect } from 'react'
import './index.css'
function App() {
  const [allTodos, setAllTodos] = useState([])
  const [SingleTodo, setSingleTodo] = useState({ title: '', description: '' })


  // const[title, setTitle] = useState('')
  // const[description, setDescription] = useState('')

  function handleAdd() {
    if (!SingleTodo.title || !SingleTodo.description) {
      alert('Please fill all the fields')
      return;
    }
    // console.log(SingleTodo);
    setAllTodos([...allTodos, SingleTodo]);
    // console.log(allTodos);
    saveTodoLocalStorage([...allTodos, SingleTodo])
  }

  function DelTodo(i) {
    let newar = [...allTodos]
    newar.splice(i, 1);
    saveTodoLocalStorage(newar);
    getTodofromLocalStorage()
    console.log(allTodos)
  }

  function saveTodoLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  function getTodofromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('todos'))
    if (data) { setAllTodos(data) }
  }

  function removeAllTodos() {
    setAllTodos([]);
    localStorage.removeItem("todos");
  }

  useEffect(() => {
    getTodofromLocalStorage()
  }, [])

  return (
    <div className='bg-blue-400 max-w-screen overflow-hidden min-h-screen text-center' >
      <h1 className='text-5xl pt-10'>TODO APP</h1>
      <br />
      <div className='mt-5'>
        <input className='bg-white text-2xl px-1.5 py-1 focus:outline-none capitalize rounded-r-xl rounded-l-xl'
          type='text'
          placeholder='Enter the todo'
          onChange={(e) => setSingleTodo(
            prevValue => ({ ...prevValue, title: e.target.value }))}
        />
        <br />
        <br />
        <input className='bg-white text-2xl px-1.5 py-1 focus:outline-none capitalize rounded-r-xl rounded-l-xl'
          type='text'
          placeholder='Description'
          onChange={(e) => setSingleTodo(
            prevValue => ({ ...prevValue, description: e.target.value }))}
        />
        <br />
        <br />
        <button className='bg-green-600 rounded-r-2xl rounded-l-2xl text-xl py-2 px-10' onClick={handleAdd}>Add Todo</button>
      </div>

      <div className='w-[90%] sm:w-[70%] md:w-[60%] py-10 mx-auto'>
        {allTodos.map((data, i) =>
          <div className=' bg-gray-300/50 m-4 p-2 flex justify-around rounded-2xl ' key={i}>
            <div className='flex gap-5 items-center w-[70%] overflow-hidden'>
              <h1 className=' text-2xl'>{i + 1}.</h1>
              <div className='flex flex-col items-start gap-1'>

                <h1 className='capitalize text-3xl font-bold'>{data.title}</h1>
                <p className='text-xl text-black/50'>{data.description}</p>
              </div>
            </div>


            <button className='bg-red-500/90  rounded-r-2xl shadow-2xl rounded-l-2xl text-xl m-2 py-1 px-5' onClick={() => DelTodo(i)}>Delete
              <i className="fi fi-tr-trash"></i></button>
          </div>
        )}
      </div>
      <button className="bg-red-600 text-white px-5 py-2 rounded-lg mt-4"
        onClick={removeAllTodos}>Remove All Todos</button>
    </div>
  )
}

export default App
