#INFO: redux saga como forma de desarrollo

## ¿Por qué?

Me gustó
* las DevTools de Redux para enseñar los cambios de estado
* el unit test de las sagas

## ¿Cómo entrarle?

Siguiendo el tutorial de https://redux-saga.js.org/docs/introduction/BeginnerTutorial

Voy a manejar el estado con Redux, los componentes CONSUMEN el estado con

~~~
useSelector( state => state.una.parte ) //A: usa === y es reactiva
~~~

y para indicar acciones de la usuaria usan dispatch y action como se ve en App.js

El estado (pero NO como cambiarlo) está definido con https://redux-toolkit.js.org/api/createSlice

como en reducers.js

Para CAMBIAR el estado se usan las sagas, que monitorean un mensaje enviado a redux, ej

~~~
function* watchIncrementAsync() { //U: la que conecta la accion con como ejecutarla
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
~~~


Para desarrollar, las sagas se pueden testear (unit test) como generadores, como se ve en sagas.spec.js
