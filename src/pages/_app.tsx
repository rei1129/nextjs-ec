import type { AppProps } from 'next/app'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers'
import Header from './Header';

const store = createStore(reducer)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header/>
      <Component {...pageProps} />
    </Provider>
  )
}
export default MyApp