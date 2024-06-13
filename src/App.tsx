import { Provider } from 'react-redux'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import './App.css'
import { AuthGuard } from './guards'
import { PrivateRoutes, PublicRoutes } from './models'
import { Principal, Private, Registro, ConfirmarCorreo, OlvidoContraseña, CambiarContraseña } from './pages/index'
import store from './redux/store'
import { RoutesWithNotFound } from './utilities'

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path='/' element={<Navigate to={PrivateRoutes.PRIVATE} />} />
            <Route path={PublicRoutes.LOGIN} element={<Principal />} />
            <Route path={PublicRoutes.REGISTRO} element={<Registro />} />
            <Route path={PublicRoutes.CONFIRMAR} element={<ConfirmarCorreo />} />
            <Route path={PublicRoutes.OLVIDO} element={<OlvidoContraseña />} />
            <Route path={PublicRoutes.CAMBIAR} element={<CambiarContraseña />} />
            <Route  element={<AuthGuard />}>
              <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App
