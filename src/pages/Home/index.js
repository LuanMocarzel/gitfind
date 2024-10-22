import { useState } from 'react'
import background from '../../assets/gato.svg'
import { Header } from '../../components/Header'
import Itemlist from '../../components/ItemList'
import './style.css'

function App() {
  const [user, userSet] = useState('')
  const [currentUser, currentUserSet] = useState(null)
  const [repos, repoSet] = useState(null)

  const handleGetData = async () =>{
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser
      currentUserSet({avatar_url, name, bio, login})

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await reposData.json()

      if(newRepos.length){
        repoSet(newRepos)
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='conteudo'>
        <img src={background} className='background' alt='background app'/>
        <div className='info'>
          <div>
            <input className='usuario' value={user} onChange={event=>userSet(event.target.value)} placeholder='@username'/>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
          <>
            <div className='perfil'>
              <img src={currentUser.avatar_url} className='profile' alt='imagem de perfil'/>
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            <hr/>
          </>
          ): null}

          {repos?.length ? (
          <div>
            <h4 className='repositorio'>Repositórios</h4>
            {repos.map(repo => (
             <Itemlist title={repo.name} description={repo.description} />              
            ))}
          </div>
          ): null}

        </div>
      </div>
    </div>
  );
};

export default App;
