import React from 'react'
import {Link} from 'react-router-dom'

function Register() {
    const submitHandler = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.login.value
        const password = e.target.password.value
        console.log(name, email, password)
    }
    return (
        <div style={{width: '100vw', height: '100vh'}} className={'d-flex align-items-center justify-content-center'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 mx-auto px-4">
                        <form className="Auth-form" onSubmit={submitHandler}>
                            <div className="Auth-form-content">
                                <h3 className="text-center h3">Sign Up</h3>
                                <div className="text-center">
                                    Not registered yet?{' '}
                                    <Link to={'/login'} className="link-primary">
                                        Sign In
                                    </Link>
                                </div>
                                <div className="form-group mt-3">
                                    <label>Full name</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="e.g. John Doe"
                                        name={'name'}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Email address</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="Login"
                                        name={'login'}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control mt-1"
                                        placeholder="Password"
                                        name={'password'}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register