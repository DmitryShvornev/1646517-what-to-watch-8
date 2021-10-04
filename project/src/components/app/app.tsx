import MainPage from '../main-page/main-page';

type AppProps = {
  title: string;
  genre: string;
  year: number;
}

function App({title, genre, year} : AppProps): JSX.Element {
  return <MainPage  title = {title}  genre = {genre} year = {year}/>;
}

export default App;
