const LoginForm = (
    {handleLogin,
        username,
        password}
) => {

    return (
        <form onSubmit={handleLogin}>
        <div>
        username 
        <input 
        type="text"
        value={username}
        onChange={({target}) => setUserName(target.value)}
        />
        </div>
        
          <div>
          password 
          <input
          type="password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
          />
          </div>
          <button type="submit">login</button>
        
        </form>
    )

}

export default LoginForm