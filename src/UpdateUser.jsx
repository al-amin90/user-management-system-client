import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateUser = () => {
    const navigate = useNavigate()
    const loadedUser = useLoaderData()
    const { _id, name, gender, password, status } = loadedUser;


    const handleUpdate = e => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value
        const password = form.password.value
        const gender = form.gender.value
        const status = form.status.value

        const userInfo = { name, password, gender, status }

        fetch(`http://localhost:5000/user/${_id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert("update to database")
                }
            })

    }

    return (
        <div>
            <button onClick={() => navigate(-1)} className='btn'>Back</button>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                        <form onSubmit={handleUpdate} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" defaultValue={name} name="name" placeholder="name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="email" defaultValue={password} name="password" placeholder="password" className="input input-bordered" required />
                            </div>

                            <div className='space-x-4'>
                                <input type="radio" name="gender" id="male" value="male" />
                                <label htmlFor="male">Male</label>
                                <input type="radio" name="gender" id="Female" value="Female" />
                                <label htmlFor="Female">Female</label>
                            </div>
                            <div className='space-x-4'>
                                <input type="radio" name="status" id="active" value="active" />
                                <label htmlFor="active">Active</label>
                                <input type="radio" name="status" id="inactive" value="inactive" />
                                <label htmlFor="inactive">Inactive</label>
                            </div>

                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;