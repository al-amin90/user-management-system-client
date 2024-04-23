import { useState } from 'react'
import './App.css'
import { Link, useLoaderData } from 'react-router-dom'

function App() {
  const loadedUsers = useLoaderData()
  const [users, setUsers] = useState(loadedUsers)

  const handleDelete = id => {
    console.log(id);
    fetch(`http://localhost:5000/user/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.deletedCount > 0) {
          const remaining = users.filter(user => user._id !== id)
          setUsers(remaining)
          alert("Delete from database")
        }
      })
  }

  // const handleUpdate = id => {

  // }

  return (
    <>
      <Link to="/addUser">
        <button className='btn'>Add user</button>
      </Link>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              users.map(user => <tr key={user._id}>
                <th>1</th>
                <th>{user.name}</th>
                <th>{user.password}</th>
                <th>{user.gender}</th>
                <th>{user.status}</th>
                <th>
                  <Link to={`/updateUser/${user._id}`}>
                    <button
                      className='btn btn-primary'>Edit
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className='btn btn-secondary'>X
                  </button>
                </th>
              </tr>)
            }


          </tbody>
        </table>
      </div>

    </>
  )
}

export default App
