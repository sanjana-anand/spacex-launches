import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from './App';
import Layout from './components/Layout/Layout';


configure({adapter: new Adapter()});

describe('<App />', () => {
  it('should render <Layout />', () => {
    expect(shallow(<App/>).contains(<Layout/>)).toEqual(true);
  })
})