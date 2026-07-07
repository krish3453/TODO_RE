import { useState,useEffect } from 'react'

function App() {
  const [allTodos, setAllTodos] = useState([])
  const[SingleTodo,setSingleTodo] = useState({title:'',description:''})


  // const[title, setTitle] = useState('')
  // const[description, setDescription] = useState('')

function handleAdd(){
  // console.log(SingleTodo);
  setAllTodos([...allTodos, SingleTodo]);
  // console.log(allTodos);
  saveTodoLocalStorage([...allTodos, SingleTodo])
}

function DelTodo(i){
  let newar=[...allTodos]
  newar.splice(i,1);
  saveTodoLocalStorage(newar);
  getTodofromLocalStorage()
  console.log(allTodos)
}

function saveTodoLocalStorage(todos){
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodofromLocalStorage(){
  let data = JSON.parse(localStorage.getItem('todos'))
  if(data){setAllTodos(data)}
} 

useEffect(()=>{
  getTodofromLocalStorage()
}, [])

  return (
    <>
    <div>
      <input type='text'
      placeholder='Enter the todo'
      onChange={(e)=>setSingleTodo(
        prevValue=>({...prevValue,title:e.target.value}))}
      />
      <br/>
      <br/>
      <input type='text' 
      placeholder='Description'
      onChange={(e)=>setSingleTodo(
        prevValue=>({...prevValue,description:e.target.value}))}
      />
      <br/>
      <br/>
      <button onClick={handleAdd}>Add Todo</button>
    </div>

    <div>
      {allTodos.map((data,i)=>
        <div key={i}>
          <h1>{i+1}</h1>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <button onClick={()=>DelTodo(i)}>Delete</button>
        </div>
      )}
    </div>
    </>
  )
}

export default App
