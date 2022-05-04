import FeedList from "../components/FeedList/FeedList";
import { fetcher } from "../service/queryClient";
import { GET_FEEDS } from '../graphql/feeds'
import styles from './index.module.css'
import Victory from '../static/images/victory.png'
import Image from 'next/image'

const Home = ({ feeds }) => (
  <div className={styles.container}>
    <header className="header-container">
      <div className={styles.logo}><Image src={Victory} /></div>
    </header>
    <main>
      <FeedList sfeeds={feeds}/>
    </main>
  </div>
);

export const getServerSideProps = async () => {
  const { feeds } = await fetcher(GET_FEEDS)
  return {
    props: { feeds },
  }
}

export default Home;
