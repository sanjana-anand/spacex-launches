import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Layout from './Layout';
import Header from '../Header/Header';
import Content from '../Content/Content';

configure({adapter: new Adapter()});

describe('<Layout />', () => {
  it('should render <Header />', () => {
    expect(shallow(<Layout/>).contains(<Header/>)).toEqual(true);
  })
  it('should render <Content />', () => {
    expect(shallow(<Layout/>).contains(<Content/>)).toEqual(true);
  })
})