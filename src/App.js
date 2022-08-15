import { useState , useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';

function App() {
 const [showForm , setShowForm] = useState(false)
  const [tasks, setTsks] = useState([
  ])

  useEffect(()=>{
    const getTasks = async () =>{
      const tasksFromServer = await fetchTasks()

      setTsks(tasksFromServer)
    }
    getTasks()
  },[])


  const fetchTasks = async () =>{

    const res= await  fetch('http://localhost:5000/tasks')
    const data = await res.json()

   return data;

  }


  const fetchTask = async (id) =>{

    const res= await  fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

   return data;

  }

  const DeleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTsks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }


  const ReminderToggle = async (id) =>{

    const taskToToggle = await fetchTask(id)

    const updTask = {...taskToToggle ,  reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type' :  'application/json'
      },

      body:JSON.stringify(updTask)
    })

    const data = await res.json()

    setTsks(tasks.map((task)=> task.id == id ? {...task, reminder: !task.reminder} : task))

  }

  const AddTasks = async (task) =>{

    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST', 
      headers:{
        'Content-type' :  'application/json'
      },

      body:JSON.stringify(task)

    })

    const data =  await res.json()


    setTsks([...tasks , data])
     
    //  const id = Math.floor(Math.random() * 10000) + 1
    //  const newTask = { id, ...task }
    //  setTsks([...tasks, newTask])
   
  }


  
  return (
    <div className="App">
      <Header name= "Khadyja Rami" onAdd={() => setShowForm   (!showForm)}  showAdd= {showForm} />
  { showForm &&  <AddTask onAdd={AddTasks }></AddTask>}
    {tasks ? <Tasks tasks={tasks}  onDelete={DeleteTask}   onToggle={ReminderToggle}/>: 'No Tasks availble'}
     <Footer />
    </div>
  );
}

export default App;
