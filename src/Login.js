import { useState } from "react";
import { useHistory } from "react-router-dom";
import http from "./http";
import { useDispatch } from "react-redux";

function Login() {
    const initialUser = {
        login: "",
        email: "",
        password: "",
        role: "user",
        check: true,
    }
    const [user, setUser] = useState({ ...initialUser });
    const [toggle, setToggle] = useState("Login");
    const setToken = token => sessionStorage.setItem('token', token)
    const setId = id => sessionStorage.setItem('id', id)
    const history = useHistory()
    const dispatch = useDispatch()
    const toggleForm = () => {
        toggle === "Login" ? setToggle("Registration") : setToggle("Login");
        setUser({ ...initialUser });
    };
    const body = () => {
        const userParse = {};
        Object.entries(user).reduce(
            (a, [k, v]) => (v.length ? (userParse[k] = v) : userParse),
            userParse
        );
        return userParse
    };
    const signIn = e => {
        e.preventDefault();
        http().post('/login', body())
            .then(a => a.json())
            .then(({ token, message, id }) => {
                if (!token) throw new Error(message)
                setId(id)
                setToken(token);
                token && history.push('/list-users')
            }).catch(e => dispatch({ type: 'error', payload: e.message }));
    };
    const register = e => {
        e.preventDefault();
        http().post('/register', body())
            .then(a => a.json())
            .then(({ success, message }) => {
                if (!success) throw new Error(message)
                success && toggleForm()
            })
            .catch(e => dispatch({ type: 'error', payload: e.message }));
    };

    return (
        <div id='login' className='col-12'>
            <div className='form-check login form-switch'>
                <input className='form-check-input' onChange={toggleForm} type='checkbox' id='switch'/>
                <label className='form-check-label' htmlFor='switch'>
                    {toggle}
                </label>
            </div>
            {toggle === "Login" && (
                <form className='col-3'>
                    <h2>Login</h2>
                    <div className='mb-3'>
                        <label htmlFor='InputEmail1' className='form-label'>
                            Email address
                        </label>
                        <input onInput={(e) => setUser({ ...user, email: e.target.value })} type='email'
                               className='form-control' id='InputEmail1' aria-describedby='emailHelp'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Password
                        </label>
                        <input onInput={(e) => setUser({ ...user, password: e.target.value })} type='password'
                               className='form-control' id='exampleInputPassword1'/>
                    </div>
                    <div className='mb-3 form-check'>
                        <input type='checkbox' className='form-check-input' id='Check1'/>
                        <label className='form-check-label' htmlFor='Check1'>
                            Agree something
                        </label>
                    </div>
                    <button className='btn btn-primary' onClick={signIn}>
                        Signin
                    </button>
                </form>
            )}
            {toggle === "Registration" && (
                <form className='col-3'>
                    <h2>Register</h2>
                    <div className='mb-3'>
                        <label htmlFor='login' className='form-label'>
                            Your name
                        </label>
                        <input onInput={(e) => setUser({ ...user, login: e.target.value })} type='text'
                               className='form-control' id='login'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='InputEmail2' className='form-label'>
                            Email address
                        </label>
                        <input onInput={(e) => setUser({ ...user, email: e.target.value })} type='email'
                               className='form-control' id='InputEmail2' aria-describedby='emailHelp'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='InputPassword1' className='form-label'>
                            Password
                        </label>
                        <input onInput={(e) => setUser({ ...user, password: e.target.value })} type='password'
                               className='form-control' id='InputPassword1'/>
                    </div>
                    <div>
                        <label htmlFor='exampleInputPassword1' className='form-label'>
                            Role
                        </label>
                        <select disabled className='form-select'>
                            <option defaultValue value='user'>
                                User
                            </option>
                            <option value='2'>Two</option>
                            <option value='3'>Three</option>
                        </select>
                    </div>
                    <div className='mb-3 mt-3 form-check'>
                        <input type='checkbox' className='form-check-input' id='Check2'/>
                        <label className='form-check-label' htmlFor='Check2'>
                            Agree something
                        </label>
                    </div>
                    <div>
                        <button className='btn btn-primary' onClick={register}>
                            Register
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Login;
