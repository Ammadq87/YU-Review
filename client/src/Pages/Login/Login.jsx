import './Login.css'

export default function Login(props) {

    return (
        <div className="loginPage">
            <h1>Login</h1>
            <input className="textInput" placeholder='Email' type='mail'></input>
            <input className="textInput" placeholder='Password' type='password'></input>

            <div className="loginLinks">
                <div className="link">
                    <a className="pageLink" href='/' style={{color: '#3876F9'}}>Forgot Password?</a>
                </div>
                <div className="link" style={{textAlign: 'right'}}>
                    <a className="pageLink" href='/SignUp' style={{color: '#3876F9'}}>Sign Up</a>
                </div>
            </div>
            <button className='selectedBtn'>Login</button>
        </div>
    )
}