import React from 'react'
import {useDispatch} from 'react-redux'
import {signIn} from './authSlice'
import {useNavigate} from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        const obj = {
            login: e.target.login.value,
            password: e.target.password.value
        }
        dispatch(signIn(obj)).then(({error}) => {g
            if (!error) {
                console.log('salom')
                navigate('/', {replace: true})
            }
        })
    }
    return (
        <div style={{width: '100vw', height: '100vh'}} className={'d-flex align-items-center justify-content-center'}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-3 col-12 mx-auto px-4">
                        <form className="Auth-form" onSubmit={submitHandler}>
                            <div className="Auth-form-content">
                                <h3 className="text-center h3">Кириш</h3>
                                <div className="form-group mt-3">
                                    <label>Логин</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="Login"
                                        name={'login'}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Парол</label>
                                    <input
                                        type="password"
                                        className="form-control mt-1"
                                        placeholder="Password"
                                        name={'password'}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" className="btn btn-primary">
                                        Кириш
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

export default Login