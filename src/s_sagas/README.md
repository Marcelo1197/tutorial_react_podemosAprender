#INFO: redux saga como forma de desarrollo

## ¿Por qué?

Me gustó
* las DevTools de Redux para enseñar los cambios de estado
   * se puede cargar el estado (botoncito abajo)
   * se puede enviar una accion a mano (botoncito abajo)
* el unit test de las sagas

## ¿Cómo lo usaría para PA?

* ¿Tengo token valido o necesito login?
* ¿Tengo el texto con ID ... o lo tengo que ir a buscar?
* ¿Tengo los textos (el próximo texto) para
   * la charla X
   * entre las fechas fh0 y fh1
   * de participantes p1, p2, p3 ?
* Responder a un texto
* Agregar un texto a otra charla mía

NOTAR que puede estar viendo varios textos Y charlas/filtros a la vez. Para eso tendría ej. 
* state.haciendo.X.charlaY.filtros1 -> cursor

NOTAR que ese estado (salvo el cursor) se puede persistir incluso en si.podemosaprender.org

¿Dónde va la forma de representar ej la ToDo List?

Las "capas" quedan
1. UI: cómoda para la usuaria
2. Redux: las acciones como las piensa la usuaria
3. Sagas: la implementación de esas acciones
4. (PAApi): opcional, como base para las Sagas (se pueden ejecutar sin las capas superiores)

## ¿Cómo aprendí?

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
