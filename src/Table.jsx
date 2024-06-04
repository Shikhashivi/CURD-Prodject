import React, { useEffect, useState } from 'react'
import "./App.css"
import axios from "axios"
const Table = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [uName, setUName] = useState("")
    const [uEmail, setUEmail] = useState("")
    const [editId, setEditId] = useState(-1)

    useEffect(() => {
        axios.get("http://localhost:3000/users")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = data.length + 1;
        axios.post("http://localhost:3000/users", { id: id, name: name, email: email })
            .then(res => {
                location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleEdit = (id) => {
        axios.get("http://localhost:3000/users/" + id)
            .then(res => {
                setUName(res.data.name)
                setUEmail(res.data.email)

            })
            .catch(err => console.log(err))
       
        setEditId(id)
    }



    const handleUpdate = () => {
        axios.put("http://localhost:3000/users/" + editId, { id: editId, name: uName, email: uEmail })
            .then(res => {
                console.log(res);
              
                location.reload();
                setEditId(-1)
            })
            .catch(err => console.log(err))

    }
    const handleDelete = (id) => {
        axios.delete("http://localhost:3000/users/" + id)
            .then(res => {
                location.reload()
            })

            .catch(err => console.log(err))

    }

    return (
        <div className='container'>
            <h2>Splitsvilla X5 Contestent</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text " placeholder='Enter Name' onChange={e => setName(e.target.value)} />
                    <input type="text " placeholder='Enter Email' onChange={e => setEmail(e.target.value)} />
                    <button>Add</button>

                </form>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((users, index) => (
                            users.id === editId ?
                                <tr>
                                    <td>{users.id}</td>
                                    <td><input type='text' value={uName} onChange={e => setUName(e.target.value)} /></td>
                                    <td><input type='text' value={uEmail} onChange={e => setUEmail(e.target.value)} /></td>
                                    <td> <button onClick={handleUpdate}>Update</button></td>

                                </tr>
                                :
                                <tr key={index}>
                                    <td>{users.id}</td>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>
                                        <button onClick={() => handleEdit(users.id)}>edit</button>
                                        <button onClick={() => handleDelete(users.id)}>delete</button>
                                    </td>

                                </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    )
}

export default Table
